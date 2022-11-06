import {LogExecutionContext} from '@franzzemen/logger-adapter';
import {ExpressionScope, ExpressionStringifier} from '@franzzemen/re-expression';
import {ConditionReference} from '../condition-reference.js';
import {StringifyConditionOptions} from './stringify-condition-options.js';


export class ConditionStringifier {
  constructor() {
  }

  stringify(ref: ConditionReference, scope: Map<string, any>, options?: StringifyConditionOptions, ec?: LogExecutionContext): string {
    const expressionStringifier : ExpressionStringifier = scope.get(ExpressionScope.ExpressionStringifier);
    let stringified = `${expressionStringifier.stringify(ref.lhsRef, scope, options, false, ec)} ${ref.comparatorRef} ${expressionStringifier.stringify(ref.rhsRef, scope, options, true, ec)}`;
    return stringified;
  }
}
