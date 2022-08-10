import 'mocha';
import chai from 'chai';
import {StandardLikeComparator} from '../../../publish';


const expect = chai.expect;
const should = chai.should();

const comparator = new StandardLikeComparator();

const unreachableCode = false;

describe('Rules Engine Tests', () => {
  describe('Standard Like Comparator Tests', () => {
    describe('core/comparator/standard/standard-like-comparator.test', () => {
      it('should compare identical strings to true "hello world" like "hello world"', done => {
        comparator.compare('hello world', 'hello world').should.be.true;
        done();
      })
      it('should compare non-equal strings to false', done  => {
        comparator.compare('does not', 'equal').should.be.false;
        done();
      })
      it('should compare to true with rhs wildcard at start, middle, end & multiple wild cards', done => {
        comparator.compare('hello', '*hello').should.be.true;
        comparator.compare('hello', '*ello').should.be.true;
        comparator.compare('hello', 'h*ello').should.be.true;
        comparator.compare('hello', 'h*llo').should.be.true;
        comparator.compare('hello', 'hello*').should.be.true;
        comparator.compare('hello', 'hell*').should.be.true;
        comparator.compare('hello', 'h*ello*').should.be.true;
        comparator.compare('hello', 'h*llo*').should.be.true;
        comparator.compare('hello', 'h*ll*').should.be.true;
        done();
      })
      it('should run all the rhs tests above as lhs tests', done => {
        comparator.compare('*hello', 'hello').should.be.true;
        comparator.compare('*ello', 'hello').should.be.true;
        comparator.compare('h*ello', 'hello').should.be.true;
        comparator.compare('h*llo', 'hello').should.be.true;
        comparator.compare('hello*', 'hello').should.be.true;
        comparator.compare('hell*', 'hello').should.be.true;
        comparator.compare('hello*', 'hello').should.be.true;
        comparator.compare('h*llo*', 'hello').should.be.true;
        comparator.compare('h*ll*', 'hello').should.be.true;
        done();
      })
      it('should handle escaped \\*', done => {
        comparator.compare('h\*ello', 'h\*ello').should.be.true;
        comparator.compare('h\*ello', 'h*ello').should.be.true;
        comparator.compare('hello', 'h\\*llo').should.be.false;
        done();
      })
      it('should fail both sides multivariate', done => {
        try {
          comparator.compare(['hello', 'world'], ['hello', 'world']);
          unreachableCode.should.be.true;
          done();
        } catch (err) {
          unreachableCode.should.be.false;
          done();
        }
      })
      it('should compare rhs multivariate with matching entry', done => {
        comparator.compare('hello', ['hello', 'world']).should.be.true;
        done();
      })
      it('should compare rhs multivariate with no matching entry', done => {
        comparator.compare('hello', ['hello1', 'world']).should.be.false;
        done();
      })
      it('should compare rhs multivariate with matching wildcard entry', done => {
        comparator.compare('hello', ['hell*', 'world']).should.be.true;
        done();
      })
      it('should compare rhs multivariate with matching wildcard entry on lhs', done => {
        comparator.compare('he*o', ['hello', 'world']).should.be.true;
        done();
      })
      it('should compare lhs multivariate with rhs', done => {
        comparator.compare(['he*o', 'world'], 'hello').should.be.true;
        done();
      })
    })
  })
})
