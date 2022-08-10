import 'mocha';
import {Hints} from '@franzzemen/app-utility';
import {StandardDataType} from '@franzzemen/re-data-type';
import {ExpressionType, isAttributeExpressionReference, isValueExpressionReference} from '@franzzemen/re-expression';
import chai from 'chai';
import {ConditionExpressionParser, ConditionScope, StandardComparator} from '../../publish';


const expect = chai.expect;
const should = chai.should();
const unreachableCode = false;

const parser = new ConditionExpressionParser();
const scope = new ConditionScope();

describe('Rules Engine Tests', () => {
  describe('Expression Tests', () => {
    describe('Condition Expression Tests', () => {
      describe ('/core/expression/parser/condition-expression-parser.test', () => {
        it('should return undefined and remaining for "akadfajdfalhl"', done => {
          const badExpression = 'akadfajdfalhl';
          let [remaining, ref] = parser.parse(badExpression, scope, new Hints(''), false);
          remaining.should.equal(badExpression);
          expect(ref).to.be.undefined;
          done();
        });
        it('should return a condition reference', done => {
          const textFormat = '?[5 < 4]';
          let [remaining, ref] = parser.parse(textFormat, scope, new Hints(''), false);
          remaining.should.equal('');
          expect(ref).to.exist;
          ref.type.should.equal(ExpressionType.Condition);
          ref.dataTypeRef.should.equal(StandardDataType.Boolean);
          if(isValueExpressionReference(ref.lhsRef)) {
            ref.lhsRef.value.should.equal(5);
          } else {
            unreachableCode.should.be.true;
          }
          if(isValueExpressionReference(ref.rhsRef)) {
            ref.rhsRef.value.should.equal(4);
          } else {
            unreachableCode.should.be.true;
          }
          ref.comparatorRef.should.equal(StandardComparator.StandardLessThan);
          done();
        });
        it('should return a condition reference for attribute on lhs', done => {
          const textFormat = '?[price < 4.0]';
          let [remaining, ref] = parser.parse(textFormat, scope, new Hints(''), false);
          remaining.should.equal('');
          expect(ref).to.exist;
          ref.type.should.equal(ExpressionType.Condition);
          ref.dataTypeRef.should.equal(StandardDataType.Boolean);
          if(isAttributeExpressionReference(ref.lhsRef)) {
            ref.lhsRef.path.should.equal('price');
            ref.lhsRef.dataTypeRef.should.equal(StandardDataType.Float);
          } else {
            unreachableCode.should.be.true;
          }
          if(isValueExpressionReference(ref.rhsRef)) {
            ref.rhsRef.value.should.equal(4.0);
          } else {
            unreachableCode.should.be.true;
          }
          ref.comparatorRef.should.equal(StandardComparator.StandardLessThan);
          done();
        });
      });
    });
  });
});
