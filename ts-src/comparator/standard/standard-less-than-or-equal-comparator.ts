import {Comparator, StandardComparator} from '../comparator';

export class StandardLessThanOrEqualComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardLessThanOrEqual) {
    super(symbol);
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs <= rhs;
  }
}
