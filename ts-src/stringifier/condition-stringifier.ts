import {ExecutionContextI} from '@franzzemen/app-utility';
import {ExpressionStringifier} from '../../../../../re-expression/ts-src/stringifier/expression-stringifier';
import {ScopeKey} from '../../../../../re-common/ts-src/scope/scope-key';
import {StringifyOptions} from '../../stringify-options';
import {ConditionReference} from '../condition-reference';

export class ConditionStringifier {
  constructor() {
  }

  stringify(ref: ConditionReference, scope: Map<string, any>, options?: StringifyOptions, ec?: ExecutionContextI): string {
    const expressionStringifier : ExpressionStringifier = scope.get(ScopeKey.ExpressionStringifier);
    let stringified = `${expressionStringifier.stringify(ref.lhsRef, scope, options, false, ec)} ${ref.comparatorRef} ${expressionStringifier.stringify(ref.rhsRef, scope, options, true, ec)}`;
    return stringified;
  }
}
