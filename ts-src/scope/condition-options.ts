import {_mergeExpressionOptions, ExpressionOptions} from '@franzzemen/re-expression';

export interface ConditionOptions extends ExpressionOptions {

}

export function _mergeConditionOptions(source: ConditionOptions, target: ConditionOptions, mergeInto = true): ConditionOptions {
  return _mergeExpressionOptions(source, target, mergeInto);
}
