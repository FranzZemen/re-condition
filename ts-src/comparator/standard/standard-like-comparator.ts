import {LogExecutionContext, LoggerAdapter} from '@franzzemen/logger-adapter';
import {Comparator, StandardComparator} from '../comparator.js';

function escapeRegex(string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export class StandardLikeComparator extends Comparator {
  constructor(symbol = StandardComparator.StandardLike) {
    super(symbol, true, true, false, ['like']);
  }

  static compareTextToWildcardText(testString: string, wildCardString: string, ec?: LogExecutionContext): boolean {
    try {
      let likeString = escapeRegex(wildCardString.trim());
      likeString = likeString.replace(/\\\*/g, '.*');
      const regExp = new RegExp('^' + likeString + '$', 'i');
      return regExp.test(testString);
    } catch (err) {
      const log = new LoggerAdapter(ec, 'rules-engine', 'standard-like-comparator', 'likeCompare');
      log.warn(err);
    }
  }

  static compareTextToWildcardArray(text: string, wildcards: string [], ec?: LogExecutionContext): boolean {

    for (let i = 0; i < wildcards.length; i++) {
      const wildcard = wildcards[i];
      // Look for a match in any of the multivariate values
      const match = StandardLikeComparator.compareTextToWildcardText(text, wildcard);
      if (match) {
        return true;
      }
    }
    return false;
  }

  static compareTextArrayToWildcardText(textArray: string [], wildCardString: string, ec?: LogExecutionContext): boolean {
    for(let i = 0; i < textArray.length; i++) {
      const text = textArray[i];
      const match = StandardLikeComparator.compareTextToWildcardText(text, wildCardString, ec);
      if(match) {
        return true;
      }
    }
    return false;
  }

  compare(lhs: any, rhs: any, ec?: LogExecutionContext): boolean {
    if (lhs === undefined || rhs === undefined) {
      return false;
    }
    // Some basic checks...either both sides need to be strings (one side assumed to have wildcards
    // or one side is a string and the other is multi-variate (an array)
    // both sides cannot be arrays
    // If arrays, they must all be strings
    if (typeof lhs === 'string') {

    }

    const lhsString = typeof lhs === 'string';
    const rhsString = typeof rhs === 'string';
    const lhsArray = Array.isArray(lhs);
    const rhsArray = Array.isArray(rhs);

    if (lhsArray && rhsArray) {
      return false;
    }
    let match = false;
    if (lhsString) {
      if (rhsArray) {
        // Try lhs is the text, rhs has the wildcards
        match = StandardLikeComparator.compareTextToWildcardArray(lhs, rhs, ec);
        if(!match) {
          // Try lhs is the wildcard, rhs is the text array
          match = StandardLikeComparator.compareTextArrayToWildcardText(rhs, lhs, ec);
        }
      } else {
        // Try lhs is the text, rhs is the wildcard
        match = StandardLikeComparator.compareTextToWildcardText(lhs, rhs, ec);
        if(!match) {
          // Try rhs is the text, lhs is the wildcard
          match = StandardLikeComparator.compareTextToWildcardText(rhs, lhs, ec);
        }
      }
    } else {
      // rhs is a string automatically as both cannot be arrays
      // try lhs array of text to wildcard
      match = StandardLikeComparator.compareTextArrayToWildcardText(lhs, rhs, ec);
      if (!match) {
        //Try rhs text to lhs wildcard array
        match = StandardLikeComparator.compareTextToWildcardArray(rhs, lhs, ec);
      }
    }
    return match;
  }
}

