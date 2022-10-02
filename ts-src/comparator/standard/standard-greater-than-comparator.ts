import {Comparator, StandardComparator, StandardComparatorSynonyms} from '../comparator.js';


export class StandardGreaterThanComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardGreaterThan) {
    super(symbol);
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs > rhs;
  }
}
