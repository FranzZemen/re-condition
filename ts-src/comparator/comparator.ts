import {LogExecutionContext} from '@franzzemen/logger-adapter';
import {isEnumeratedType, reverseEnumerationToSet} from '@franzzemen/re-common';

export enum StandardComparator {
  StandardEquality = '=',
  StandardInequality = '!=',
  StandardGreaterThan = '>',
  StandardGreaterThanOrEqual = '>=',
  StandardLessThan = '<',
  StandardLessThanOrEqual = '<=',
  StandardLike = '~',
  MomentEquality = 'm=',
  MomentInequality = 'm!=',
  MomentEarlier = 'm<',
  MomentNowOrEarlier = 'm<=',
  MomentLater = 'm>',
  MomentNowOrLater = 'm>='
}

export enum StandardComparatorSynonyms {
  IsGreaterThan = 'is greater than'
}

const standardComparatorReverseMapping = reverseEnumerationToSet (StandardComparator);

export function isStandardComparator (standardDataType: StandardComparator | string | any): standardDataType is StandardComparator {
  return isEnumeratedType<StandardComparator>(standardDataType, standardComparatorReverseMapping);
}

export function isComparator(comparator: ComparatorI | any): comparator is ComparatorI {
  return comparator !== undefined && comparator.refName !== undefined && typeof comparator.refName === 'string' && comparator.refName.trim.length > 0 && 'operate' in comparator;
}


export interface ComparatorI {
  refName: string;
  synonyms?: string[];
  // A multi-variate comparator is one that can handle expressions with multiple final values, such as a Set Expression
  lhsMultiVariate?: boolean;
  rhsMultiVariate?: boolean;
  twoSidedMultiVariate?: boolean;
  compare(lhs:any , rhs:any, ec?: LogExecutionContext): boolean;
}

export abstract class Comparator implements ComparatorI {
  abstract compare(lhs:any , rhs:any, ec?: LogExecutionContext): boolean;
  constructor(public refName: string, public lhsMultiVariate = false, public rhsMultivariate = false, twoSidedMultivariate = false, public synonyms: string[] = []) {
  }
}


