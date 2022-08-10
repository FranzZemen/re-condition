import {isMoment} from 'moment';
import {Comparator, StandardComparator} from '../comparator';

export class MomentEarlierComparator extends Comparator {
  constructor(symbol = StandardComparator.MomentEarlier) {
    super(symbol, false, false, false, ['earlier than']);
  }

  compare(lhs:any , rhs:any): boolean {
    if(lhs === undefined || rhs === undefined) {
      return false;
    }
    if(lhs && rhs) {
      if (isMoment(lhs) && isMoment(rhs)) {
        return lhs.isBefore(rhs);
      } else {
        return false; // Should never get here
      }
    } else {
      return false;  // Should never get here
    }
  }
}

