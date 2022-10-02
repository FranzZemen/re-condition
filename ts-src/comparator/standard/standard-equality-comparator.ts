import {Comparator, StandardComparator} from '../comparator.js';

export class StandardEqualityComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardEquality) {
    super(symbol,false, false,false,['is']); // Synonym order is important!
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs === rhs;
  }
}
