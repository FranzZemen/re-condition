import 'mocha';
import {StandardDataType} from '@franzzemen/re-data-type';
import {ExpressionType, isAttributeExpressionReference, isValueExpressionReference} from '@franzzemen/re-expression';
import chai from 'chai';
import {ConditionParser, ConditionScope, StandardComparator} from '../../publish';



const expect = chai.expect;
const should = chai.should();

const unreachableCode = false;
const parser = new ConditionParser();
const scope = new ConditionScope();

describe('Rules Engine Tests', ()=> {
  describe('Condition Parser Tests', () => {
    describe('core/condition/parser/condition-parser.test', ()=> {
      it('should parse simplest value condition 5 > 6', done => {
        const [remaining, conditionRef] = parser.parse('5 > 6', scope);
        remaining.length.should.equal(0);
        conditionRef.lhsRef.type.should.equal(ExpressionType.Value);
        conditionRef.lhsRef.dataTypeRef.should.equal(StandardDataType.Number);
        if(isValueExpressionReference(conditionRef.lhsRef)) {
          conditionRef.lhsRef.value.should.equal(5);
        } else {
          unreachableCode.should.be.true;
        }
        if(isValueExpressionReference(conditionRef.rhsRef)) {
          conditionRef.rhsRef.value.should.equal(6);
        } else {
          unreachableCode.should.be.true;
        }
        conditionRef.comparatorRef.should.equal(StandardComparator.StandardGreaterThan);
        done();
      })
      it('should parse fully hinted condition "<<ex type=Attribute data-type=Number>> path.to.something[5] > <<ex type=Value 6 data-type=Number>>"', done => {
        const [remaining, conditionRef] = parser.parse('<<ex type=Attribute data-type=Number>> path.to.something[5] > <<ex type=Value data-type=Number>> 6', scope);
        remaining.length.should.equal(0);
        conditionRef.lhsRef.type.should.equal(ExpressionType.Attribute);
        conditionRef.lhsRef.dataTypeRef.should.equal(StandardDataType.Number);
        if(isAttributeExpressionReference(conditionRef.lhsRef)) {
          conditionRef.lhsRef.path.should.equal('path.to.something[5]');
        } else {
          unreachableCode.should.be.true;
        }
        if(isValueExpressionReference(conditionRef.rhsRef)) {
          conditionRef.rhsRef.value.should.equal(6);
        } else {
          unreachableCode.should.be.true;
        }
        conditionRef.comparatorRef.should.equal(StandardComparator.StandardGreaterThan);
        done();
      })
      it('parse "Hello" = world', done => {
        const [remaining, result] = parser.parse('"Hello" = world', scope);
        result.rhsRef.type.should.equal(ExpressionType.Attribute);
        done();
      })
    });
  })
})

