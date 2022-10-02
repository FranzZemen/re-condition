import moment from 'moment';
const isMoment = moment.isMoment;
import {Comparator, StandardComparator} from '../comparator.js';

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

