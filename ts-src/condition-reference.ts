
import {
  AttributeExpressionReference,
  ExpressionReference,
  FunctionExpressionReference,
  ValueExpressionReference
} from '@franzzemen/re-expression';
import {Condition} from './condition';

export type ExpressionReferences = ExpressionReference | ValueExpressionReference | AttributeExpressionReference | FunctionExpressionReference;

export function isConditionReference (ref: Condition | ConditionReference): ref is ConditionReference {
  return 'lhsRef' in ref && 'rhsRef' in ref && 'comparatorRef' in ref;
}

export interface ConditionReference {
  lhsRef: ExpressionReferences;
  rhsRef: ExpressionReferences;
  comparatorRef: string;
}
