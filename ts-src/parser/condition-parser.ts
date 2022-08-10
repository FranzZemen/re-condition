import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {ComparatorParser} from '../../comparator/parser/comparator-parser';
import {ExpressionStackParser} from '../../../../../re-expression/ts-src/parser/expression-stack-parser';
import {FragmentParser} from '../../recursive-grouping/parser/fragment-parser';
import {ScopeKey} from '../../../../../re-common/ts-src/scope/scope-key';
import {ConditionReference} from '../condition-reference';
import {ExpressionReference} from "../../../../../re-expression/ts-src/expression";

export class ConditionParser extends FragmentParser<ConditionReference>{
  constructor() {
    super();
  }

  parse(remaining: string, scope: Map<string, any>, ec?: ExecutionContextI) : [string, ConditionReference] {
    const log = new LoggerAdapter(ec, 'rules-engine', 'condition-parser', `${ConditionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ScopeKey.ExpressionStackParser);
    let conditionRef: Partial<ConditionReference> = {};
    [remaining, conditionRef.lhsRef, conditionRef.comparatorRef, conditionRef.rhsRef] = ConditionParser.parseComparativeCondition(remaining, scope, ec);

    /*
    let near = remaining;

    [remaining, conditionRef.lhsRef] = expressionStackParser.parse(remaining, scope, undefined, ec);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope

    [remaining, conditionRef.comparatorRef] = comparatorParser.parse(remaining, conditionRef.lhsRef.dataTypeRef, scope, false, ec);

    // Note that for the RHS, we don't pass in the hints since they would have been consumed by the LHS.  We also pass in the suggested data type
    // based on the LHS
    [remaining, conditionRef.rhsRef] = expressionStackParser.parse(remaining, scope, {inferredDataType:conditionRef.lhsRef.dataTypeRef}, ec);


    if(conditionRef.rhsRef.dataTypeRef !== conditionRef.lhsRef.dataTypeRef) {
      log.warn(conditionRef, `Inconsistent data types near '${near}'`);
      const err = new Error(`Inconsistent data types lhs:${conditionRef.lhsRef.dataTypeRef} vs rhs:${conditionRef.rhsRef.dataTypeRef} near '${near}'`);
      log.error(err);
      throw err;
    }

     */
    return [remaining, conditionRef as ConditionReference];
  }

  static parseComparativeCondition(remaining: string, scope: Map<string, any>, ec?: ExecutionContextI): [string, ExpressionReference, string, ExpressionReference]{
    const log = new LoggerAdapter(ec, 'rules-engine', 'condition-parser', `parseComparativeCondition`);

    const expressionStackParser: ExpressionStackParser = scope.get(ScopeKey.ExpressionStackParser);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope
    // Attempt to parse RHS comparator LHS
    // The data type may be inferrable in RHS and not LHS, so allow the data type to be undefined.
    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    // Keep a copy of remaining in case this is not a condition expression
    let candidateRemaining = remaining;
    [candidateRemaining, lhsRef] = expressionStackParser.parse(candidateRemaining, scope, {allowUndefinedDataType: true}, ec);
    if(!lhsRef) {
      return [remaining, undefined, undefined, undefined];
    }
    // We're going to try and consume a comparator, but it may not be the right one.  Remember candidateRemaining.
    let candidateRemaining2 = candidateRemaining;
    [candidateRemaining2, comparatorRef] = comparatorParser.parse(candidateRemaining2, lhsRef.dataTypeRef, scope, true, ec);
    if(!comparatorRef) {
      const err = new Error(`Expected comparator near '${candidateRemaining2}'`);
      log.error(err);
      throw err;
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
      return [candidateRemaining2, lhsRef, comparatorRef, rhsRef];
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
          return [remaining, undefined, undefined, undefined];
        }
        lhsRef.dataTypeRef = rhsRef.dataTypeRef;
        return [candidateRemaining2, lhsRef, comparatorRef, rhsRef];
      } else {
        const err = new Error(`No data types on lhs or rhs`);
        log.error(err);
        throw err;
      }
    }
  }
}
