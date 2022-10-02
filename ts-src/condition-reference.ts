import {ExpressionReference} from '@franzzemen/re-expression';
import {Condition} from './condition.js';

// export type ExpressionReferences = ExpressionReference | ValueExpressionReference | AttributeExpressionReference | FunctionExpressionReference;

export function isConditionReference (ref: Condition | ConditionReference): ref is ConditionReference {
  return 'lhsRef' in ref && 'rhsRef' in ref && 'comparatorRef' in ref;
}

export interface ConditionReference {
  lhsRef: ExpressionReference;
  rhsRef: ExpressionReference;
  comparatorRef: string;
}
