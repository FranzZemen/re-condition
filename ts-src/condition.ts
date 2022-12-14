import {logErrorAndThrow} from '@franzzemen/enhanced-error';
import {LogExecutionContext, LoggerAdapter} from '@franzzemen/logger-adapter';
import {isPromise} from 'node:util/types';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  Expression,
  ExpressionFactory,
  ExpressionScope,
  ExpressionStandardParserMessages
} from '@franzzemen/re-expression';
import {ComparatorI} from './comparator/comparator.js';
import {ComparatorFactory} from './comparator/comparator-factory.js';

import {ConditionReference} from './condition-reference.js';
import {ConditionScope} from './scope/condition-scope.js';


// TODO ConditionI's shape will be much more generic, to take into account combinatorial conditiosn, for example
export interface ConditionI {
  comparator: ComparatorI;
  lhs: Expression;
  rhs: Expression;

  to(ec?: LogExecutionContext): ConditionReference;

  awaitEvaluation(item: any, scope: Map<string, any>, ec?: LogExecutionContext): boolean | Promise<boolean>;
}

export function isCondition(condition: ConditionReference | ConditionI): condition is ConditionI {
  return condition && 'comparator' in condition && 'lhs' in condition && 'rhs' in condition && 'isValid' in condition;
}

export class Condition implements ConditionI {
  lhs: Expression;
  comparator: ComparatorI;
  rhs: Expression;

  constructor(ref: ConditionReference, scope: ConditionScope, ec?: LogExecutionContext) {
    if(ref.lhsRef.dataTypeRef !== StandardDataType.Unknown && ref.rhsRef.dataTypeRef !== StandardDataType.Unknown) {
      if (ref.lhsRef.dataTypeRef !== ref.rhsRef.dataTypeRef) {
        throw new Error('Inconsistent condition lhs, rhs data types');
      }
    }
    const expressionFactory: ExpressionFactory = scope.get(ExpressionScope.ExpressionFactory);
    this.lhs = expressionFactory.createExpression(ref.lhsRef, scope, ec);
    this.rhs = expressionFactory.createExpression(ref.rhsRef, scope, ec);

    const comparatorFactory: ComparatorFactory = scope.get(ConditionScope.ComparatorFactory);
    this.comparator = comparatorFactory.getRegistered(ref.comparatorRef);

    if(!scope.isResolved()) {
      const log = new LoggerAdapter(ec, 're-condition', 'condition', 'constructor');
      log.debug({scope}, 'Scope needs to be externally resolved');
    }
  }

  to(ec?: LogExecutionContext): ConditionReference {
    return {lhsRef: this.lhs.to(ec), comparatorRef: this.comparator.refName, rhsRef: this.rhs.to(ec)};
  }

  awaitEvaluation(item: any, scope: ConditionScope, ec?: LogExecutionContext): boolean | Promise<boolean> {
    const log = new LoggerAdapter(ec, 're-condition', 'condition', 'awaitValidation');
    const lhsDataTypeRef = this.lhs.dataType.refName;
    const rhsDataTypeRef = this.rhs.dataType.refName;
    const lhsUnknown = lhsDataTypeRef === StandardDataType.Unknown;
    const rhsUnknown = rhsDataTypeRef === StandardDataType.Unknown;

    if(lhsUnknown && scope.get(ConditionScope.AllowUnknownDataType) === false) {
      logErrorAndThrow(`${ExpressionStandardParserMessages.ImproperUsageOfUnknown} for condition lhs`, log);
    }
    if(rhsUnknown && scope.get(ConditionScope.AllowUnknownDataType) === false) {
      logErrorAndThrow(`${ExpressionStandardParserMessages.ImproperUsageOfUnknown} for condition rhs`, log);
    }
    if(!lhsUnknown && !rhsUnknown && lhsDataTypeRef !== rhsDataTypeRef) {
      // TODO: Option to attempt implicit conversion
      log.warn({condition: this, item}, 'lhs and rhs data types are different, evaluating to false');
      return false;
    }
    if (!this.comparator) {
      logErrorAndThrow('No comparator', log);
    }
    const lhsEvaluation = this.lhs.awaitEvaluation(item, scope, ec);
    const rhsEvaluation = this.rhs.awaitEvaluation(item, scope, ec);
    if (isPromise(lhsEvaluation)) {
      return lhsEvaluation.then(lhsR => {
        if (isPromise(rhsEvaluation)) {
          return rhsEvaluation.then(rhsR => {
            return this.comparator.compare(lhsR, rhsR, ec);
          });
        } else {
          return this.comparator.compare(lhsR, rhsEvaluation, ec);
        }
      });
    } else if (isPromise(rhsEvaluation)) {
      return rhsEvaluation.then(rhsR => {
        return this.comparator.compare(lhsEvaluation, rhsR, ec);
      });
    } else {
      return this.comparator.compare(lhsEvaluation, rhsEvaluation, ec);
    }
  }
}
