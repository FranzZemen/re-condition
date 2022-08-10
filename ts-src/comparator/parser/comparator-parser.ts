import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';

import {ComparatorI} from '../comparator';
import {DataTypeComparatorFactory, DataTypeComparatorRef} from '../data-type-comparator/data-type-comparator-factory';

export class ComparatorParser {
  constructor() {
  }

  parse(remaining: string, dataTypeRef: string, scope?: Map<string, any>, allowUndefinedDataType = false, ec?: ExecutionContextI): [string, string] {
    const log = new LoggerAdapter(ec, 'rules-engine', 'comparator-parser', ComparatorParser.name + '.parse');
    const near = remaining;
    let comparatorRef: string;

    // Get list of allowed comparators
    const dataTypeComparatorsFactory: DataTypeComparatorFactory = scope.get(ScopeKey.DataTypeComparatorFactory);
    if(allowUndefinedDataType) {
      // Returns the first match, noting that there *could* be more than one match
      const dataTypeComparatorRefs: DataTypeComparatorRef[] =  dataTypeComparatorsFactory.getAllInstances();
      for(let j = 0; j < dataTypeComparatorRefs.length; j++) {
        const dataTypeComparatorRef = dataTypeComparatorRefs[j];
        for (let i = 0; i < dataTypeComparatorRef.comparators.length; i++) {
          let matched = false;
          const currComparatorRef = dataTypeComparatorRef.comparators[i];
          [remaining, matched] = ComparatorParser.match(remaining, currComparatorRef);
          if (matched) {
            return [remaining, currComparatorRef];
          } else {
            const currComparator: ComparatorI = scope.get(ScopeKey.ComparatorFactory).getRegistered(currComparatorRef, ec);
            for(let j = 0; j < currComparator.synonyms.length; j++) {
              const synonym = currComparator.synonyms[j];
              [remaining, matched] = ComparatorParser.match(remaining, synonym);
              if(matched) {
                return [remaining, currComparatorRef];
              }
            }
          }
        }
      }
    } else {
      const dataTypeComparatorRef: DataTypeComparatorRef = dataTypeComparatorsFactory.getRegistered(dataTypeRef);
      if (!dataTypeComparatorRef || !dataTypeComparatorRef.comparators || dataTypeComparatorRef.comparators.length === 0) {
        const err = new Error(`No comparators for data type ${dataTypeRef} near '${near}'`);
        log.error(err);
        throw err;
      }
      for (let i = 0; i < dataTypeComparatorRef.comparators.length; i++) {
        let matched = false;
        const currComparatorRef = dataTypeComparatorRef.comparators[i];
        [remaining, matched] = ComparatorParser.match(remaining, currComparatorRef);
        if (matched) {
          return [remaining, currComparatorRef];
        } else {
          const currComparator: ComparatorI = scope.get(ScopeKey.ComparatorFactory).getRegistered(currComparatorRef, ec);
          for(let j = 0; j < currComparator.synonyms.length; j++) {
            const synonym = currComparator.synonyms[j];
            [remaining, matched] = ComparatorParser.match(remaining, synonym);
            if(matched) {
              return [remaining, currComparatorRef];
            }
          }
        }
      }
    }
    return [remaining, undefined];
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
