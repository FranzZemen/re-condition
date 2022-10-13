import {ExecutionContextI} from '@franzzemen/app-utility';
import {FragmentParser, ParserMessages, ParserMessageType} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  ExpressionReference,
  ExpressionScope,
  ExpressionStackParser,
  ExpressionStandardParserMessages
} from '@franzzemen/re-expression';
import {StandardComparator} from '../comparator/comparator.js';
import {ComparatorParser} from '../comparator/parser/comparator-parser.js';
import {ConditionReference} from '../condition-reference.js';
import {ConditionScope} from '../scope/condition-scope.js';


export class ConditionParser extends FragmentParser<ConditionReference>{
  constructor() {
    super();
  }

  parse(remaining: string, scope:ConditionScope, ec?: ExecutionContextI) : [string, ConditionReference, ParserMessages] {
    // const log = new LoggerAdapter(ec, 're-condition', 'condition-parser', `${ConditionParser.name}.parse`);
    let lhsRef: ExpressionReference, rhsRef: ExpressionReference, comparatorRef: StandardComparator | string;
    let messages: ParserMessages;
    [remaining, lhsRef, comparatorRef, rhsRef, messages] = ConditionParser.parseComparativeCondition(remaining, scope, ec);
    if(lhsRef === undefined || rhsRef === undefined || comparatorRef === undefined) {
      return [remaining, undefined, messages];
    } else {
      return [remaining, {lhsRef, comparatorRef, rhsRef}, messages];
    }
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
        return [near, undefined, undefined, undefined, [{message: `No comparator to parse near ${candidateRemaining}`, contextObject: {lhsRef, rhsRef}, type: ParserMessageType.Info}]];
      }
      lhsRef.dataTypeRef = rhsRef.dataTypeRef;
    } else if (rhsRef.dataTypeRef === StandardDataType.Indeterminate && lhsRef.dataTypeRef !== StandardDataType.Indeterminate) {
      rhsRef.dataTypeRef = lhsRef.dataTypeRef;
    } else if (rhsRef.dataTypeRef === StandardDataType.Indeterminate && lhsRef.dataTypeRef === StandardDataType.Indeterminate) { // Both indeterminate
      if(scope.get(ExpressionScope.AllowUnknownDataType) === true) {
        lhsRef.dataTypeRef = StandardDataType.Unknown;
        rhsRef.dataTypeRef = StandardDataType.Unknown;
      } else {
        return [near, undefined, undefined, undefined, [{message: `${ExpressionStandardParserMessages.ImproperUsageOfUnknown} and both lhs and rhs are indeterminate near ${near}`, contextObject: {lhsRef, rhsRef}, type: ParserMessageType.Error}]];
      }
    }
    return [remaining, lhsRef, comparatorRef, rhsRef, undefined];
  }
}
