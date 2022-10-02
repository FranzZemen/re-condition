import chai from 'chai';
import 'mocha'
import {ComparatorFactory, ComparatorI, StandardComparator} from '../../publish/index.js';

const should = chai.should();
const expect = chai.expect;

describe('Rules Engine Tests', () => {
  describe('Comparator Factory Tests', () => {
    it('should register standard operators', () => {
      const comparatorFactory: ComparatorFactory = new ComparatorFactory(true);
      let comparator: ComparatorI = comparatorFactory.getRegistered(StandardComparator.StandardEquality);
      comparator.refName.should.equal(StandardComparator.StandardEquality);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardInequality);
      comparator.refName.should.equal(StandardComparator.StandardInequality);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardLessThan);
      comparator.refName.should.equal(StandardComparator.StandardLessThan);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardLessThanOrEqual);
      comparator.refName.should.equal(StandardComparator.StandardLessThanOrEqual);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardGreaterThan);
      comparator.refName.should.equal(StandardComparator.StandardGreaterThan);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardGreaterThanOrEqual);
      comparator.refName.should.equal(StandardComparator.StandardGreaterThanOrEqual);

      comparator = comparatorFactory.getRegistered(StandardComparator.StandardLike);
      comparator.refName.should.equal(StandardComparator.StandardLike);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentEquality);
      comparator.refName.should.equal(StandardComparator.MomentEquality);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentInequality);
      comparator.refName.should.equal(StandardComparator.MomentInequality);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentLater);
      comparator.refName.should.equal(StandardComparator.MomentLater);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentNowOrLater);
      comparator.refName.should.equal(StandardComparator.MomentNowOrLater);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentEarlier);
      comparator.refName.should.equal(StandardComparator.MomentEarlier);

      comparator = comparatorFactory.getRegistered(StandardComparator.MomentNowOrEarlier);
      comparator.refName.should.equal(StandardComparator.MomentNowOrEarlier);
    });
  })
});
