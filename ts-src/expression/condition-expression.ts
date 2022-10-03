import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  createExpressionType,
  Expression,
  ExpressionFactory,
  ExpressionReference,
  ExpressionScope
} from '@franzzemen/re-expression';
import {ComparatorFactory} from '../comparator/comparator-factory.js';
import {ComparatorI, StandardComparator} from '../comparator/comparator.js';
import {ConditionScope} from '../scope/condition-scope.js';

export enum ConditionExpressionType {
  Condition = 'Condition'
}


export function isConditionExpressionReference(ref: any | ConditionExpressionReference): ref is ConditionExpressionReference {
  return 'lhsRef' in ref && 'rhsRef' in ref && 'comparatorRef' in ref && ref.type === ConditionExpressionType.Condition;
}

export interface ConditionExpressionReference extends ExpressionReference {
  lhsRef: ExpressionReference;
  comparatorRef:  StandardComparator | string;
  rhsRef: ExpressionReference;
}

export class ConditionExpression extends Expression {
  lhs: Expression;
  rhs: Expression;
  comparator: ComparatorI
  static {
    createExpressionType(ConditionExpressionType.Condition);
  }

  constructor(ref: ConditionExpressionReference, scope: ConditionScope, ec: ExecutionContextI) {
    super(ref, scope, ec);
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
        const log = new LoggerAdapter(ec, 're-condition', 'condition-expression', 'constructor');
        log.debug({scope}, 'Scope needs to be externally resolved');
    }
  }

  awaitEvaluation(dataDomain: any, scope: Map<string, any>, ec?: ExecutionContextI): any {
  }

  to(ec?: ExecutionContextI): ExpressionReference {
    return undefined;
  }
}
