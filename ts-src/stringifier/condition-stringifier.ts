import {ExecutionContextI} from '@franzzemen/app-utility';
import {ExpressionScope, ExpressionStringifier} from '@franzzemen/re-expression';
import {ConditionReference} from '../condition-reference.js';
import {ConditionOptions} from '../scope/condition-options.js';
import {StringifyConditionOptions} from './stringify-condition-options.js';


export class ConditionStringifier {
  constructor() {
  }

  stringify(ref: ConditionReference, scope: Map<string, any>, options?: StringifyConditionOptions, ec?: ExecutionContextI): string {
    const expressionStringifier : ExpressionStringifier = scope.get(ExpressionScope.ExpressionStringifier);
    let stringified = `${expressionStringifier.stringify(ref.lhsRef, scope, options, false, ec)} ${ref.comparatorRef} ${expressionStringifier.stringify(ref.rhsRef, scope, options, true, ec)}`;
    return stringified;
  }
}
