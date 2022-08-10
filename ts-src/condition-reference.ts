import {AttributeExpressionReference} from '../../../../re-expression/ts-src/attribute-expression';
import {ExpressionReference} from '../../../../re-expression/ts-src/expression';
import {FunctionExpressionReference} from '../../../../re-expression/ts-src/function-expression';
import {ValueExpressionReference} from '../../../../re-expression/ts-src/value-expression';
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
