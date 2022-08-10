import {isMoment} from 'moment';
import {Comparator, StandardComparator} from '../comparator';


export class MomentNowOrEarlierComparator extends Comparator {
  constructor(symbol = StandardComparator.MomentNowOrEarlier) {
    super(symbol, false, false, false, ['now or earlier than']);
  }

  compare(lhs:any , rhs:any): boolean {
    if(lhs === undefined || rhs === undefined) {
      return false;
    }
    if(lhs && rhs) {
      if (isMoment(lhs) && isMoment(rhs)) {
        return lhs.isBefore(rhs) || lhs.isSame(rhs);
      } else {
        return false; // Should never get here
      }
    } else {
      return false;  // Should never get here
    }
  }
}

