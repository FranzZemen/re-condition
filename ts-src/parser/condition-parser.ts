import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {FragmentParser, ParserMessages, PsMsgType} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {ExpressionReference, ExpressionScope, ExpressionStackParser, ExPsStdMsg} from '@franzzemen/re-expression';
import {ComparatorParser} from '../comparator/parser/comparator-parser.js';
import {ConditionReference} from '../condition-reference.js';
import {ConditionScope} from '../scope/condition-scope.js';


export class ConditionParser extends FragmentParser<ConditionReference>{
  constructor() {
    super();
  }

  parse(remaining: string, scope:ConditionScope, ec?: ExecutionContextI) : [string, ConditionReference, ParserMessages] {
    const log = new LoggerAdapter(ec, 're-condition', 'condition-parser', `${ConditionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);
    let conditionRef: Partial<ConditionReference> = {};
    let messages: ParserMessages;
    [remaining, conditionRef.lhsRef, conditionRef.comparatorRef, conditionRef.rhsRef, messages] = ConditionParser.parseComparativeCondition(remaining, scope, ec);
    return [remaining, conditionRef as ConditionReference, messages];
  }

  static parseComparativeCondition(remaining: string, scope: ConditionScope, ec?: ExecutionContextI): [string, ExpressionReference, string, ExpressionReference, ParserMessages]{
    // const log = new LoggerAdapter(ec, 're-condition', 'condition-parser', `parseComparativeCondition`);
    const near = remaining;
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);
    const comparatorParser = new ComparatorParser();

    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    // Keep a copy of remaining in case this is not a condition expression
    //let candidateRemaining = remaining;
    [remaining, lhsRef] = expressionStackParser.parse(remaining, scope, {}, ec);
    if(!lhsRef) {
      return [near, undefined, undefined, undefined, undefined];
    }
    // We're going to try and consume a comparator, but it may not be the right one if we have indeterminate or unknown data types.  Remember candidateRemaining.
    let candidateRemaining = remaining;
    [remaining, comparatorRef] = comparatorParser.parse(remaining, lhsRef.dataTypeRef, scope, ec);
    if(!comparatorRef) {
      return [near, undefined, undefined, undefined, undefined];
    }
    if(lhsRef.dataTypeRef === StandardDataType.Unknown || lhsRef.dataTypeRef === StandardDataType.Indeterminate) {
      [remaining, rhsRef] = expressionStackParser.parse(remaining, scope, undefined, ec);
    } else {
      [remaining, rhsRef] = expressionStackParser.parse(remaining, scope, {inferredDataType: lhsRef.dataTypeRef}, ec);
    }
    // Reconcile indeterminate and possibly reprocess comparator
    // TODO:  When we address uknown...we need to add checks for uknownw where we're doing them for indetrminate
    if(lhsRef.dataTypeRef === StandardDataType.Indeterminate && rhsRef.dataTypeRef !== StandardDataType.Indeterminate) {
      // Reprocess comparator, discarding string result. It may or may not be the same comparatorRef
      [candidateRemaining,comparatorRef] = comparatorParser.parse(candidateRemaining, rhsRef.dataTypeRef, scope, ec);
      if(!comparatorRef) {
        return [near, undefined, undefined, undefined, [{message: `No comparator to parse near ${candidateRemaining}`, contextObject: {lhsRef, rhsRef}, type: PsMsgType.Info}]];
      }
      lhsRef.dataTypeRef = rhsRef.dataTypeRef;
    } else if (rhsRef.dataTypeRef === StandardDataType.Indeterminate && lhsRef.dataTypeRef !== StandardDataType.Indeterminate) {
      rhsRef.dataTypeRef = lhsRef.dataTypeRef;
    } else if (rhsRef.dataTypeRef === StandardDataType.Indeterminate && lhsRef.dataTypeRef === StandardDataType.Indeterminate) { // Both indeterminate
      if(scope.get(ExpressionScope.AllowUnknownDataType) === true) {
        lhsRef.dataTypeRef = StandardDataType.Unknown;
        rhsRef.dataTypeRef = StandardDataType.Unknown;
      } else {
        return [near, undefined, undefined, undefined, [{message: `${ExPsStdMsg.ImproperUsageOfUnknown} and both lhs and rhs are indeterminate near ${near}`, contextObject: {lhsRef, rhsRef}, type: PsMsgType.Error}]];
      }
    }
    return [remaining, lhsRef, comparatorRef, rhsRef, undefined];

    /*
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);

    // Attempt to parse RHS comparator LHS
    // The data type may be inferrable in RHS and not LHS, so allow the data type to be undefined.
    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    // Keep a copy of remaining in case this is not a condition expression
    let candidateRemaining = remaining;
    [candidateRemaining, lhsRef] = expressionStackParser.parse(candidateRemaining, scope, {}, ec);
    if(!lhsRef) {
      return [remaining, undefined, undefined, undefined, undefined];
    }
    // We're going to try and consume a comparator, but it may not be the right one.  Remember candidateRemaining.
    let candidateRemaining2 = candidateRemaining;
    [candidateRemaining2, comparatorRef] = comparatorParser.parse(candidateRemaining2, lhsRef.dataTypeRef, scope, true, ec);
    if(!comparatorRef) {
      const err = new Error(`Expected comparator near '${candidateRemaining2}'`);
      log.error(err);
      throw err;
    }
    [candidateRemaining2, rhsRef] = expressionStackParser.parse(candidateRemaining2, scope, {inferredDataType: lhsRef.dataTypeRef}, ec);
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
      return [candidateRemaining2, lhsRef, comparatorRef, rhsRef, undefined];
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
          return [remaining, undefined, undefined, undefined, undefined];
        }
        lhsRef.dataTypeRef = rhsRef.dataTypeRef;
        return [candidateRemaining2, lhsRef, comparatorRef, rhsRef, undefined];
      } else {
        const err = new Error(`No data types on lhs or rhs`);
        log.error(err);
        throw err;
      }
    }*/
  }
}
