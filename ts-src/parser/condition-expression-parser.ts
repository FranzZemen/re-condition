import {ExecutionContextI, Hints, LoggerAdapter} from '@franzzemen/app-utility';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  ExpressionHintKey,
  ExpressionParser, ExpressionReference,
  ExpressionScope,
  ExpressionStackParser,
  ExpressionType
} from '@franzzemen/re-expression';
import {ComparatorParser} from '../comparator/parser/comparator-parser';
import {ConditionExpressionReference} from '../condition-expression';


export class ConditionExpressionParser extends ExpressionParser {
  constructor() {
    super(ExpressionType.Condition);
  }
  parse(remaining: string, scope:ExpressionScope, hints: Hints, allowUndefinedDataType: boolean, ec?: ExecutionContextI): [string, ConditionExpressionReference] {
    const log = new LoggerAdapter(ec, 'rules-engine', 'condition-expression-parser', `${ConditionExpressionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope
    let type: string = hints.get(ExpressionHintKey.ExpressionType) as string;
    if(type && type !== ExpressionType.Condition) {
      return [remaining, undefined];
    }
    let dataTypeRef = hints.get(ExpressionHintKey.DataType) as string;
    if(dataTypeRef && dataTypeRef !== StandardDataType.Boolean) {
      if(type) {
        // Based on the above check on type, type would be Condition at this point.
        const err = new Error(`Data type is ${dataTypeRef}.  It must be Boolean for a Condition Expression`);
      } else {
        return [remaining, undefined];
      }
    }
    // Check to see if the ?[]  standard format was used
    let standardFormat = false;
    let result = /^\?\[([^]*)$/.exec(remaining);
    if(result) {
      standardFormat = true;
      remaining = result[1];
      type = ExpressionType.Condition;
    } else {
      // If the standard format was not used, a type hint was necessary
      if(!type) {
        return [remaining, undefined];
      }
    }
    // Set the data type (might already be set, but ok)
    dataTypeRef = StandardDataType.Boolean;

    // START OF REFACTORABLE SECTION

    // Attempt to parse RHS comparator LHS
    // The data type may be inferrable in RHS and not LHS, so allow the data type to be undefined.
    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    // Keep a copy of remaining in case this is not a condition expression
    let candidateRemaining = remaining;
    [candidateRemaining, lhsRef] = expressionStackParser.parse(candidateRemaining, scope, {allowUndefinedDataType: true}, ec);
    if(!lhsRef) {
      // SHOULD THROW!
      return [remaining, undefined];
    }
    // We're going to try and consume a comparator, but it may not be the right one.  Remember candidateRemaining.
    let candidateRemaining2 = candidateRemaining;
    [candidateRemaining2, comparatorRef] = comparatorParser.parse(candidateRemaining2, lhsRef.dataTypeRef, scope, true, ec);
    if(!comparatorRef) {
      // SHOULD THROW!
      return [remaining, undefined];
    }
    [candidateRemaining2, rhsRef] = expressionStackParser.parse(candidateRemaining2, scope, {allowUndefinedDataType: true, inferredDataType: lhsRef.dataTypeRef}, ec);
    // Check for a data type
    // If the lhsRef data type exists, then it is the right comparator, because we provided it in the call.
    // If it does not exist, and rhsRef data type exists, then we have to reprocess the comparator to make sure we didn't parse something we should not have
    if(lhsRef.dataTypeRef) {
      // We have the right comparator
      // Check that RHS has the same data type
      if (rhsRef.dataTypeRef !== lhsRef.dataTypeRef) {
        log.warn(`Inconsistent data types near '${remaining}'`);
        const err = new Error(`Inconsistent data types lhs:${lhsRef.dataTypeRef} vs rhs:${rhsRef.dataTypeRef} near '${remaining}'`);
        log.error(err);
        throw err;
      }
      let result2 = /^]([^]*)$/.exec(candidateRemaining2);
      if(result2) {
        return [result2[1].trim(), {type, dataTypeRef, lhsRef, rhsRef, comparatorRef}];
      } else {
        throw new Error('No closure');
      }
    } else {
      if(rhsRef.dataTypeRef) {
        // Now we need to reprocess the comparator to make sure we have the right one.
        let [, reprocessed] = comparatorParser.parse(candidateRemaining, rhsRef.dataTypeRef, scope, false, ec);
        if(!reprocessed) {
          const err = new Error(`No comparator for rhs data type ${rhsRef.dataTypeRef}`);
          log.error(err);
          throw err;
        }
        if(reprocessed !== comparatorRef) {
          return [remaining, undefined];
        }
        lhsRef.dataTypeRef = rhsRef.dataTypeRef;
        let result2 = /^]([^]*)$/.exec(candidateRemaining2);
        if(result2) {
          return [result2[1].trim(), {type, dataTypeRef, lhsRef, rhsRef, comparatorRef}];
        } else {
          throw new Error('No closure');
        }
      } else {
        const err = new Error(`No data types on lhs or rhs`);
        log.error(err);
        throw err;
      }
    }
  }

/*
  parse(remaining: string, scope: Map<string, any>, ec?: ExecutionContextI) : [string, ConditionReference] {
    const log = new LoggerAdapter(ec, 'rules-engine', 'condition-parser', `${ConditionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ScopeKey.ExpressionStackParser);
    let conditionRef: Partial<ConditionReference> = {};
    let near = remaining;

    [remaining, conditionRef.lhsRef] = expressionStackParser.parse(remaining, scope, undefined, ec);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope

    [remaining, conditionRef.comparatorRef] = comparatorParser.parse(remaining, conditionRef.lhsRef.dataTypeRef, scope, ec);

    // Note that for the RHS, we don't pass in the hints since they would have been consumed by the LHS.  We also pass in the suggested data type
    // based on the LHS
    [remaining, conditionRef.rhsRef] = expressionStackParser.parse(remaining, scope, conditionRef.lhsRef.dataTypeRef, ec);


    if(conditionRef.rhsRef.dataTypeRef !== conditionRef.lhsRef.dataTypeRef) {
      log.warn(conditionRef, `Inconsistent data types near '${near}'`);
      const err = new Error(`Inconsistent data types lhs:${conditionRef.lhsRef.dataTypeRef} vs rhs:${conditionRef.rhsRef.dataTypeRef} near '${near}'`);
      log.error(err);
      throw err;
    }
    return [remaining, conditionRef as ConditionReference];
  }

 */

}
