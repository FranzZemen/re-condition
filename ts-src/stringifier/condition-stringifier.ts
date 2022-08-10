import {ExecutionContextI} from '@franzzemen/app-utility';
import {ExpressionScope, ExpressionStringifier} from '@franzzemen/re-expression';
import {ConditionReference} from '../condition-reference';
import {ConditionOptions} from '../scope/condition-options';


export class ConditionStringifier {
  constructor() {
  }

  stringify(ref: ConditionReference, scope: Map<string, any>, options?: ConditionOptions, ec?: ExecutionContextI): string {
    const expressionStringifier : ExpressionStringifier = scope.get(ExpressionScope.ExpressionStringifier);
    let stringified = `${expressionStringifier.stringify(ref.lhsRef, scope, options, false, ec)} ${ref.comparatorRef} ${expressionStringifier.stringify(ref.rhsRef, scope, options, true, ec)}`;
    return stringified;
  }
}
