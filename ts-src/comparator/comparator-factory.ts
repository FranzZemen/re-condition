import {RuleElementFactory} from '@franzzemen/re-common';
import {ComparatorI, isComparator, StandardComparator} from './comparator';
import {
  MomentEarlierComparator,
  MomentEqualityComparator,
  MomentInequalityComparator,
  MomentLaterComparator,
  MomentNowOrEarlierComparator,
  MomentNowOrLaterComparator
} from './moment/external-index';
import {
  StandardEqualityComparator,
  StandardGreaterThanComparator,
  StandardGreaterThanOrEqualComparator,
  StandardInequalityComparator,
  StandardLessThanComparator,
  StandardLessThanOrEqualComparator,
  StandardLikeComparator
} from './standard/external-index';


export function setComparator(synonyms: string[], comparator: ComparatorI) : Map<string, ComparatorI> {
  const operatorMap = new Map<string, ComparatorI>();
  synonyms.forEach(synonym => {
    operatorMap.set(synonym, comparator);
  });
  return operatorMap;
}

export class ComparatorFactory extends RuleElementFactory<ComparatorI> {
  isC<OperatorI> (comparator: OperatorI | any): comparator is OperatorI {
    return isComparator(comparator);
  }

  constructor(populateStandard = true) {
    super();
    if(populateStandard) {
      // Inequality operator should be ahead of equality operator due to "is not" synonym needing to be parsed before "is"
      this.register({
        refName: StandardComparator.StandardInequality,
        instance: new StandardInequalityComparator()
      });
      this.register({
        refName: StandardComparator.StandardEquality,
        instance: new StandardEqualityComparator()
      });
      this.register({
        refName: StandardComparator.StandardLessThan,
        instance: new StandardLessThanComparator()
      });
      this.register({
        refName: StandardComparator.StandardLessThanOrEqual,
        instance: new StandardLessThanOrEqualComparator()
      });
      this.register({
        refName: StandardComparator.StandardGreaterThan,
        instance: new StandardGreaterThanComparator()
      });
      this.register({
        refName: StandardComparator.StandardGreaterThanOrEqual,
        instance: new StandardGreaterThanOrEqualComparator()
      });
      this.register({
        refName: StandardComparator.StandardLike,
        instance: new StandardLikeComparator()
      });
      this.register({
        refName: StandardComparator.MomentEquality,
        instance: new MomentEqualityComparator()
      });
      this.register({
        refName: StandardComparator.MomentInequality,
        instance: new MomentInequalityComparator()
      });
      this.register({
        refName: StandardComparator.MomentLater,
        instance: new MomentLaterComparator()
      });
      this.register({
        refName: StandardComparator.MomentNowOrLater,
        instance: new MomentNowOrLaterComparator()
      });
      this.register({
        refName: StandardComparator.MomentEarlier,
        instance: new MomentEarlierComparator()
      });
      this.register({
        refName: StandardComparator.MomentNowOrEarlier,
        instance: new MomentNowOrEarlierComparator()
      });
    }
  }
}

