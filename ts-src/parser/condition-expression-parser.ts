import {ExecutionContextI, Hints} from '@franzzemen/app-utility';
import {ParserMessages, PsMsgType} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  ExpressionHintKey,
  ExpressionParser,
  ExpressionReference,
  ExpressionScope,
  ExpressionStackParser,
  ExpressionType
} from '@franzzemen/re-expression';
import {ComparatorParser} from '../comparator/parser/comparator-parser.js';
import {ConditionExpressionReference} from '../expression/condition-expression.js';
import {ConditionParser} from './condition-parser.js';


export class ConditionExpressionParser extends ExpressionParser {
  constructor() {
    super(ExpressionType.Condition);
  }

  parse(remaining: string, scope: ExpressionScope, hints: Hints, ec?: ExecutionContextI): [string, ConditionExpressionReference, ParserMessages] {
    // const log = new LoggerAdapter(ec, 'rules-engine', 'condition-expression-parser', `${ConditionExpressionParser.name}.parse`);
    const expressionStackParser: ExpressionStackParser = scope.get(ExpressionScope.ExpressionStackParser);
    const comparatorParser = new ComparatorParser(); // TODO add to Scope
    const near = remaining;
    let type: string = hints.get(ExpressionHintKey.Type) as string;
    if (type && type !== ExpressionType.Condition) {
      return [remaining, undefined, undefined];
    }
    let dataTypeRef = hints.get(ExpressionHintKey.DataType) as string;
    if (dataTypeRef) {
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
    if (result) {
      standardFormat = true;
      remaining = result[1];
      type = ExpressionType.Condition;
    } else {
      // If the standard format was not used, a type hint was necessary
      if (!type) {
        return [remaining, undefined, undefined];
      }
    }


    let lhsRef: ExpressionReference;
    let comparatorRef: string;
    let rhsRef: ExpressionReference;
    let messages: ParserMessages;
    [remaining, lhsRef, comparatorRef, rhsRef, messages] = ConditionParser.parseComparativeCondition(remaining, scope, ec);
    if (!lhsRef || !comparatorRef || !rhsRef) {
      return [near, undefined, messages];
    }
    // Check for closure
    if (standardFormat) {
      let result2 = /^]([^]*)$/.exec(remaining);
      if (result2) {
        remaining = result2[1].trim();
      } else {
        return [near, undefined, undefined];
      }
    }
    return [remaining, {type, dataTypeRef, lhsRef, rhsRef, comparatorRef}, undefined];
  }
}
