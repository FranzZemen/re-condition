import {ExecutionContextI, Hints, LoggerAdapter} from '@franzzemen/app-utility';
import {ParserMessages, PsMsgType} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  ExpressionHintKey,
  ExpressionParser,
  ExpressionReference,
  ExpressionScope,
  ExpressionStackParser,
  ExpressionType, ExPsStdMsg
} from '@franzzemen/re-expression';
import {ComparatorParser} from '../comparator/parser/comparator-parser.js';
import {ConditionExpressionReference} from '../expression/condition-expression.js';
import {ConditionParser} from './condition-parser.js';


export class ConditionExpressionParser extends ExpressionParser {
  constructor() {
    super(ExpressionType.Condition);
  }
  parse(remaining: string, scope:ExpressionScope, hints: Hints, ec?: ExecutionContextI): [string, ConditionExpressionReference, ParserMessages] {
    // const log = new LoggerAdapter(ec, 'rules-engine', 'condition-expression-parser', `${ConditionExpressionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope
    const near = remaining;
    let type: string = hints.get(ExpressionHintKey.Type) as string;
    if(type && type !== ExpressionType.Condition) {
      return [remaining, undefined, undefined];
    }
    let dataTypeRef = hints.get(ExpressionHintKey.DataType) as string;
    if(dataTypeRef) {
      if (dataTypeRef !== StandardDataType.Boolean) {
        if (type) {
          return [remaining, undefined, [{
            message: 'Data type must be Boolean for a Condition Expression',
            type: PsMsgType.Error
          }]];
        } else {
          return [remaining, undefined, undefined];
        }
      }
    } else {
      // We assume it will be a condition expression and set the data type
      dataTypeRef = StandardDataType.Boolean;
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
        return [remaining, undefined, undefined];
      }
    }


    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    let messages: ParserMessages;
    [remaining, lhsRef, comparatorRef, rhsRef, messages] = ConditionParser.parseComparativeCondition(remaining, scope, ec);
    if(!lhsRef || !comparatorRef || !rhsRef) {
      return [near, undefined, messages];
    }

    /*
      // Keep a copy of remaining in case this is not a condition expression
      //let candidateRemaining = remaining;
    [remaining, lhsRef] = expressionStackParser.parse(remaining, scope, {}, ec);
    if(!lhsRef) {
      return [near, undefined, undefined];
    }
    // We're going to try and consume a comparator, but it may not be the right one if we have indeterminate or unknown data types.  Remember candidateRemaining.
    let candidateRemaining = remaining;
    [remaining, comparatorRef] = comparatorParser.parse(remaining, lhsRef.dataTypeRef, scope, ec);
    if(!comparatorRef) {
      return [near, undefined, undefined];
    }
    if(lhsRef.dataTypeRef === StandardDataType.Unknown || lhsRef.dataTypeRef === StandardDataType.Indeterminate) {
      [remaining, rhsRef] = expressionStackParser.parse(remaining, scope, undefined, ec);
    } else {
      [remaining, rhsRef] = expressionStackParser.parse(remaining, scope, {inferredDataType: lhsRef.dataTypeRef}, ec);
    }
    // Reconcile indeterminate and possibly reprocess comparator
    if(lhsRef.dataTypeRef === StandardDataType.Indeterminate && rhsRef.dataTypeRef !== StandardDataType.Indeterminate) {
      // Reprocess comparator, discarding string result. It may or may not be the same comparatorRef
      [candidateRemaining,comparatorRef] = comparatorParser.parse(candidateRemaining, rhsRef.dataTypeRef, scope, ec);
      if(!comparatorRef) {
        return [near, undefined, [{message: `No comparator to parse near ${candidateRemaining}`, contextObject: {lhsRef, rhsRef}, type: PsMsgType.Info}]];
      }
      lhsRef.dataTypeRef = rhsRef.dataTypeRef;
    } else if (rhsRef.dataTypeRef === StandardDataType.Indeterminate && lhsRef.dataTypeRef !== StandardDataType.Indeterminate) {
      rhsRef.dataTypeRef = lhsRef.dataTypeRef;
    } else { // Both indeterminate
      if(scope.get(ExpressionScope.AllowUnknownDataType) === true) {
        lhsRef.dataTypeRef = StandardDataType.Unknown;
        rhsRef.dataTypeRef = StandardDataType.Unknown;
      } else {
        return [near, undefined, [{message: `${ExPsStdMsg.ImproperUsageOfUnknown} and both lhs and rhs are indeterminate near ${near}`, contextObject: {lhsRef, rhsRef}, type: PsMsgType.Error}]];
      }
    }

     */
    // Check for closure
    if(standardFormat) {
      let result2 = /^]([^]*)$/.exec(remaining);
      if (result2) {
        remaining = result2[1].trim();
      } else {
        return [near, undefined, undefined];
      }
    }
    return [remaining,  {type, dataTypeRef, lhsRef, rhsRef, comparatorRef}, undefined];
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
