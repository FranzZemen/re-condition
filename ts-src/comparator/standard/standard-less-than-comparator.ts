import {Comparator, StandardComparator} from '../comparator.js';

export class StandardLessThanComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardLessThan) {
    super(symbol);
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs < rhs;
  }
}
