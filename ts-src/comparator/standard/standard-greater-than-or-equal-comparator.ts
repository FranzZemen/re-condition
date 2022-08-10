import {Comparator, StandardComparator} from '../comparator';

export class StandardGreaterThanOrEqualComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardGreaterThanOrEqual) {
    super(symbol);
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs >= rhs;
  }
}
