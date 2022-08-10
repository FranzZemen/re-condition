import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {ComparatorI} from '../comparator/comparator';
import {ComparatorFactory} from '../comparator/comparator-factory';
import {Expression} from '../../../../re-expression/ts-src/expression';
import {ExpressionFactory} from '../../../../re-expression/ts-src/expression-factory';
import {isPromise} from '../../../../re-common/ts-src/util/is-promise';
import {ScopeKey} from '../../../../re-common/ts-src/scope/scope-key';
import {ConditionReference} from './condition-reference';



// TODO ConditionI's shape will be much more generic, to take into account combinatorial conditiosn, for example
export interface ConditionI {
  comparator:  ComparatorI;
  lhs: Expression;
  rhs: Expression;
  to(ec?: ExecutionContextI): ConditionReference;
  awaitValidation(item: any, scope: Map<string, any>, ec?: ExecutionContextI): boolean | Promise<boolean>
}

export function isCondition(condition: ConditionReference | ConditionI): condition is ConditionI {
  return condition && 'comparator' in condition && 'lhs' in condition && 'rhs' in condition && 'isValid' in condition;
}

export class Condition implements ConditionI {
  lhs: Expression;
  comparator:  ComparatorI;
  rhs: Expression;

  constructor(fromCondition?: ConditionReference | Condition, scope?: Map<string, any>, ec?: ExecutionContextI) {
    if(fromCondition && scope) {
      Condition.fromToInstance(this, fromCondition, scope, ec);
    }
  }

  static from(fromCondition: ConditionReference | Condition, scope: Map<string, any>, ec?: ExecutionContextI): ConditionI {
     return new Condition(fromCondition, scope, ec);
  }

  private static fromToInstance(instance: Condition, fromCondition: ConditionReference | Condition, scope: Map<string, any>, ec?: ExecutionContextI) {
    if(isCondition(fromCondition)) {
      Condition.fromCopy(instance, fromCondition, scope, ec);
    } else {
      Condition.fromReference(instance, fromCondition, scope, ec);
    }
  }

  private static fromReference(instance: Condition, conditionRef: ConditionReference, scope: Map<string, any>, ec?: ExecutionContextI) {
    if (instance && conditionRef && conditionRef.lhsRef && conditionRef.rhsRef && conditionRef.comparatorRef) {
      // Validate data types
      if(conditionRef.lhsRef.dataTypeRef !== conditionRef.rhsRef.dataTypeRef) {
        throw new Error ('Inconsistent condition lhs, rhs data types');
      }
      const expressionFactory: ExpressionFactory = scope.get(ScopeKey.ExpressionFactory);
      instance.lhs = expressionFactory.createExpression(conditionRef.lhsRef, scope, ec);
      instance.rhs = expressionFactory.createExpression(conditionRef.rhsRef, scope, ec);

      const comparatorFactory: ComparatorFactory = scope.get(ScopeKey.ComparatorFactory);
      instance.comparator = comparatorFactory.getRegistered(conditionRef.comparatorRef);
      // TODO validate that comparator and expressions have consistent data types?
    } else {
      throw new Error('Undefined or inconsistent condition reference');
    }
  }


  private static fromCopy(instance: Condition, condition: ConditionI, scope: Map<string, any>, ec?: ExecutionContextI) {
    if (instance && condition && condition.lhs && condition.rhs && condition.comparator) {
      // Validate data types
      if(condition.lhs.dataType !== condition.rhs.dataType) {
        throw new Error ('Inconsistent condition lhs, rhs data types');
      }
      const expressionFactory: ExpressionFactory = scope.get(ScopeKey.ExpressionFactory);
      instance.lhs = expressionFactory.createExpression(condition.lhs, scope, ec);
      instance.rhs = expressionFactory.createExpression(condition.rhs, scope, ec);

      const comparatorFactory: ComparatorFactory = scope.get(ScopeKey.ComparatorFactory);
      instance.comparator = comparatorFactory.getRegistered(condition.comparator.refName);

      // TODO validate that comparator and expressions have consistent data types?
    } else {
      throw new Error('Undefined condition');
    }
  }

  to(ec?: ExecutionContextI): ConditionReference {
    return {lhsRef: this.lhs.to(ec), comparatorRef: this.comparator.refName, rhsRef: this.rhs.to(ec)};
  }

  awaitValidation(item: any, scope: Map<string, any>, ec?: ExecutionContextI): boolean | Promise<boolean> {
    const log = new LoggerAdapter(ec, 'rules-engine', 'condition', 'isValid');
    if (this.lhs.dataType.refName !== this.rhs.dataType.refName) {
      const err = new Error(`Condition does not have equivalent lhs and rhs data types`);
      log.error(err);
      throw err;
    }
    if(!this.comparator) {
      const err = new Error ('No comparator');
      log.error(err);
      throw err;
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
      })
    } else {
      return this.comparator.compare(lhsEvaluation, rhsEvaluation, ec);
    }
  }
}
