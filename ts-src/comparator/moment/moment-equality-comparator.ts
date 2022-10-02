import moment from 'moment';
const isMoment = moment.isMoment;
import {Comparator, StandardComparator} from '../comparator.js';

export class MomentEqualityComparator extends Comparator {
  constructor(symbol = StandardComparator.MomentEquality) {
    super(symbol);
  }

  compare(lhs:any , rhs:any): boolean {
    if(lhs === undefined || rhs === undefined) {
      return false;
    }
    if(lhs && rhs) {
      if (isMoment(lhs) && isMoment(rhs)) {
        return lhs.isSame(rhs);
      } else {
        return false; // Should never get here
      }
    } else {
      return false;  // Should never get here
    }
  }
}
