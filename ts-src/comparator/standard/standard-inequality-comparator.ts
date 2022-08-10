import {Comparator, StandardComparator} from '../comparator';

export class StandardInequalityComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardInequality) {
    super(symbol, false, false, false, ['is not']);
  }

  compare(lhs:any , rhs:any): boolean {
    return lhs !== rhs;
  }
}
