import {ExecutionContextI} from '@franzzemen/app-utility';
import {Expression, ExpressionReference, ExpressionScope, ExpressionType} from '@franzzemen/re-expression';
import {ComparatorI, StandardComparator} from './comparator/comparator';

export function isConditionExpressionReference(ref: any | ConditionExpressionReference): ref is ConditionExpressionReference {
  return 'lhsRef' in ref && 'rhsRef' in ref && 'comparatorRef' in ref && ref.type === ExpressionType.Condition;
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

  constructor(ref: ConditionExpressionReference | ConditionExpression, scope: ExpressionScope, ec: ExecutionContextI) {
    super(ref, scope, ec);
  }

  awaitEvaluation(dataDomain: any, scope: Map<string, any>, ec?: ExecutionContextI): any {
  }

  to(ec?: ExecutionContextI): ExpressionReference {
    return undefined;
  }

}
