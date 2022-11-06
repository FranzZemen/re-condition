import {LogExecutionContext} from '@franzzemen/logger-adapter';
import {ParserMessages, ParserMessageType} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {ConditionScope} from '../../scope/condition-scope.js';
import {ComparatorI} from '../comparator.js';
import {
  DataTypeComparatorFactory,
  DataTypeComparatorRef
} from '../data-type-comparator/data-type-comparator-factory.js';

export class ComparatorParser {
  constructor() {
  }

  parse(remaining: string, dataTypeRef: string, scope: ConditionScope, ec?: LogExecutionContext): [string, string, ParserMessages] {
    // const log = new LoggerAdapter(ec, 're-condition', 'comparator-parser', ComparatorParser.name + '.parse');
    const near = remaining;
    let messages: ParserMessages;
    let comparatorRefName: string;

    // Get list of allowed comparators
    const dataTypeComparatorsFactory: DataTypeComparatorFactory = scope.get(ConditionScope.DataTypeComparatorFactory);
    if(dataTypeRef === StandardDataType.Unknown || dataTypeRef === StandardDataType.Indeterminate) {
      // Returns the first match, noting that there *could* be more than one match
      const dataTypeComparatorRefs: DataTypeComparatorRef[] =  dataTypeComparatorsFactory.getAllInstances();
      for(let j = 0; j < dataTypeComparatorRefs.length; j++) {
        const dataTypeComparatorRef = dataTypeComparatorRefs[j];
        [remaining, comparatorRefName, messages] = ComparatorParser._determineComparator(remaining, dataTypeComparatorRef, scope, ec);
        if(comparatorRefName) {
          return [remaining, comparatorRefName, messages];
        }
      }
    } else {
      const dataTypeComparatorRef: DataTypeComparatorRef = dataTypeComparatorsFactory.getRegistered(dataTypeRef);
      if (!dataTypeComparatorRef?.comparators?.length) {
        return [near, undefined, [{message: `No comparators for data type ${dataTypeRef} near '${near}'`, type: ParserMessageType.Error}]];
      }
      return ComparatorParser._determineComparator(remaining,dataTypeComparatorRef, scope, ec);
    }
    return [near, undefined, undefined];
  }

  private static _determineComparator(remaining: string, dataTypeComparatorRef: DataTypeComparatorRef, scope: ConditionScope, ec?: LogExecutionContext): [string, string, ParserMessages] {
    for (let i = 0; i < dataTypeComparatorRef.comparators.length; i++) {
      let matched = false;
      const currComparatorRef = dataTypeComparatorRef.comparators[i];
      [remaining, matched] = ComparatorParser.match(remaining, currComparatorRef);
      if (matched) {
        return [remaining, currComparatorRef, undefined];
      } else {
        const currComparator: ComparatorI = scope.get(ConditionScope.ComparatorFactory).getRegistered(currComparatorRef, ec);
        for(let j = 0; j < currComparator.synonyms.length; j++) {
          const synonym = currComparator.synonyms[j];
          [remaining, matched] = ComparatorParser.match(remaining, synonym);
          if(matched) {
            return [remaining, currComparatorRef, undefined];
          }
        }
      }
    }
    return [remaining, undefined, undefined];
  }

  private static match(remaining: string, comparatorSymbol: string): [string, boolean] {
    const regExpStr = `^${comparatorSymbol}([^]*)$`;
    const regExp = new RegExp(regExpStr,'i');
    const result = regExp.exec(remaining);
    let matched = false;
    if(result !== null) {
      remaining = result[1].trim();
      matched = true;
    }
    return [remaining, matched];
  }
}
