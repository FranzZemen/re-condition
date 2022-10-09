import {_mergeExpressionOptions, ExpressionOptions} from '@franzzemen/re-expression';

export interface ConditionOptions extends ExpressionOptions {

}

export function _mergeConditionOptions(target: ConditionOptions, source: ConditionOptions, mergeInto = true): ConditionOptions {
  return _mergeExpressionOptions(target, source, mergeInto);
}
