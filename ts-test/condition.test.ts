import 'mocha';
import chai from 'chai';
import {ExpressionReference} from '../../../build/core/expression/expression';
import {SetExpressionReference} from '../../../build/core/expression/set-expression';
import {StandardComparator} from '../../../publish/core/comparator/comparator';
import {Condition} from '../../../publish/core/condition/condition';
import {ConditionReference} from '../../../publish/core/condition/condition-reference';
import {StandardDataType} from '../../../publish/core/data-type';
import {AttributeExpressionReference} from '../../../publish/core/expression/attribute-expression';
import {ExpressionType} from '../../../publish/core/expression/expression';
import {ValueExpressionReference} from '../../../publish/core/expression/value-expression';
import {isPromise} from '../../../publish/core/is-promise';
import {Scope} from '../../../publish/core/scope';
import {ScopeType} from '../../../publish/core/scope-type';


let should = chai.should();
let expect = chai.expect;

const scope = new Scope(ScopeType.Custom, 'Test');
const unreachableCode = false;


describe('Rules engine tests', () => {
  describe('Condition tests', () => {
    describe('Value Expression tests', () => {
      describe('Number Data Type tests', () => {
        it('should evaluate two equal NUMBER expressions to true for 5 ="5"', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '5',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate two unequal NUMBER expressions to true for 5 !="6"', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '6',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardInequality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate two unequal NUMBER expressions to false for =', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
        it('should evaluate 5 > 4', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardGreaterThan
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate 5 >= 4', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardGreaterThanOrEqual
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate 5 < 4', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLessThan
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
        it('should evaluate 3 =< 4', done => {
          const lhs: ValueExpressionReference = {
            value: '3',
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 4,
            dataTypeRef: StandardDataType.Number,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLessThanOrEqual
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
      });
      describe('Float Data Type tests', () => {
        it('should evaluate two equal NUMBER expressions to true for 5.0 ="5"', done => {
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '5',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate two unequal NUMBER expressions to true for 5 !="6.0"', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '6',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardInequality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate two unequal NUMBER expressions to false for =', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
        it('should evaluate 5.0 > 4', done => {
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardGreaterThan
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate 5 >= 4.0', done => {
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4.0',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardGreaterThanOrEqual
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate 5.0 < 4.0', done => {
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4.0',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLessThan
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
        it('should evaluate 3 =< 4.0', done => {
          const lhs: ValueExpressionReference = {
            value: '3',
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 4.0,
            dataTypeRef: StandardDataType.Float,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLessThanOrEqual
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
      });
      describe('Text data type tests', () => {
        it('should evaluate text equality', done => {
          const lhs: ValueExpressionReference = {
            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate text inequality', done => {
          const lhs: ValueExpressionReference = {
            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'abcdefg',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardInequality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate true text like *ll* for "hello world"', done => {
          const lhs: ValueExpressionReference = {
            value: 'hello world',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: '*ll*',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLike
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });

        it('should evaluate false text like *ll* for "helo world"', done => {
          const lhs: ValueExpressionReference = {
            value: 'helo world',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: '*ll*',
            dataTypeRef: StandardDataType.Text,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardLike
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
      });
      describe('Boolean data type tests', () => {
        it('should evaluate true for true = "true"', done => {
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'true',
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
        it('should evaluate false for true = "false"', done => {
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'false',
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardEquality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.false;
            done();
          }
        });
        it('should evaluate true for true != "false"', done => {
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'false',
            dataTypeRef: StandardDataType.Boolean,
            type: ExpressionType.Value
          };
          const conditionRef: ConditionReference = {
            lhsRef: lhs,
            rhsRef: rhs,
            comparatorRef: StandardComparator.StandardInequality
          };
          const condition = new Condition(conditionRef, scope);
          const result = condition.awaitValidation({}, scope);
          if (isPromise(result)) {
            unreachableCode.should.be.true;
            done();
          } else {
            expect(result).to.exist;
            result.should.be.true;
            done();
          }
        });
      });
    })
    describe('Attribute Expression tests', () => {
      it('should evaluate true for foo.bar > "5"', done => {
        const lhs: AttributeExpressionReference = {
          path: 'foo.bar',
          dataTypeRef: StandardDataType.Number,
          type: ExpressionType.Attribute
        };
        const rhs: ValueExpressionReference = {

          value: '5',
          dataTypeRef: StandardDataType.Number,
          type: ExpressionType.Value
        };
        const conditionRef: ConditionReference = {
          lhsRef: lhs,
          rhsRef: rhs,
          comparatorRef: StandardComparator.StandardGreaterThan
        };
        const condition = new Condition(conditionRef, scope);
        const result = condition.awaitValidation({foo: {bar: 6}}, scope);
        if (isPromise(result)) {
          unreachableCode.should.be.true;
          done();
        } else {
          expect(result).to.exist;
          result.should.be.true;
          done();
        }
      });
      describe('Formula Expression tests', () => {
        // TODO: Formula Expression tests
      });
      describe('Object Expression tests', () => {
        // TODO REINSTORE
        /*
      it('Should should evaluate two objects with custom comparator as true', done => {

        comparatorFactory.register({
          refName: 'FooBarEqualityComparator',
          module: {
            moduleName: '../../../testing/core/condition/foo-bar-equality-comparator', constructorName:'FooBarEqualityComparator'
          }});
        const lhsRef: AttributeExpressionReference = {
          path: 'foo.bar',
          dataTypeRef: StandardDataType.Object,
          type: ExpressionType.Attribute
        };
        const rhsRef: AttributeExpressionReference = {
          path: 'foo1.bar1',
          dataTypeRef: StandardDataType.Object,
          type: ExpressionType.Attribute
        };
        const conditionRef: ConditionReference = {
          lhsRef,
          rhsRef,
          comparatorRef: 'FooBarEqualityComparator'
        };
        const condition = new Condition(conditionRef, new DataTypeFactory());
        const result = condition.isValid({foo: {bar: {fooValue: 1234}}, foo1: {bar1: {fooValue: 1234}}});
        expect(result).to.exist;
        result.should.be.true;
        done();
      });


      });


          it('Should should evaluate two objects with custom comparator as true', done => {
            class BarEqualityComparator extends Comparator {
              constructor() {
                super('Bar equality comparator');
              }

              operate(lhs:string | number | boolean | Moment | object , rhs:string | number | boolean | Moment | object): boolean {
                const lhsVal = lhs['fooValue'];
                const rhsVal = rhs['fooValue'];

                return lhs['fooValue'] === rhs['fooValue'];
              }
            }
            const barEqualityComparators = new Map<string, ComparatorI>();
            barEqualityComparators.set('=', new BarEqualityComparator());
            dataTypeComparators.operatorsByDataType.set('BarEqualityComparator', barEqualityComparators);
            const lhs = new AttributeExpression({
              path: 'foo.bar',
              dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
              type: ExpressionType.Attribute
            });
            const rhs: AttributeExpression = new AttributeExpression({
              path: 'foo1.bar1',
              dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
              type: ExpressionType.Attribute
            });
            const condition: Condition = new Condition({
              lhs,
              rhs,
              comparator: ConditionComparator.EqualTo
            });
            const result = condition.isValid({foo: {bar: {fooValue: 1234}}, foo1: {bar1: {fooValue: 1234}}});
            expect(result).to.exist;
            result.should.be.true;
            done();
          });
          it('Should should evaluate two objects with custom comparator as false', done => {
            class BarEqualityComparator extends Comparator {
              constructor() {
                super('Bar equality comparator');
              }

              operate(lhs:string | number | boolean | Moment | object , rhs:string | number | boolean | Moment | object): boolean {
                const lhsVal = lhs['fooValue'];
                const rhsVal = rhs['fooValue'];

                return lhs['fooValue'] === rhs['fooValue'];
              }
            }
            const barEqualityComparators = new Map<string, ComparatorI>();
            barEqualityComparators.set('=', new BarEqualityComparator());
            dataTypeComparators.operatorsByDataType.set('BarEqualityComparator', barEqualityComparators);
            const lhs = new AttributeExpression({
              path: 'foo.bar',
              dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
              type: ExpressionType.Attribute
            });
            const rhs: AttributeExpression = new AttributeExpression({
              path: 'foo1.bar1',
              dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
              type: ExpressionType.Attribute
            });
            const condition: Condition = new Condition({
              lhs,
              rhs,
              comparator: ConditionComparator.EqualTo
            });
            const result = condition.isValid({foo: {bar: {fooValue: 1234}}, foo1: {bar1: {fooValue: 1233}}});
            expect(result).to.exist;
            result.should.be.false;
            done();
          });

    });
  });
*/
      });
    });
    describe('Function Expression Tests', () => {

    });
    describe('Set Expression Tests', () => {
      it('should validate "hello world" like ["hel*"]', done => {
        const lhs: ValueExpressionReference = {
          type: ExpressionType.Value,
          dataTypeRef: StandardDataType.Text,
          value: 'hello world'
        };
        const rhs: SetExpressionReference = {
          type: ExpressionType.Set,
          dataTypeRef: StandardDataType.Text,
          set: [{
            type: ExpressionType.Value,
            dataTypeRef: StandardDataType.Text,
            value: 'hel*'} as ExpressionReference
          ]}
        const conditionRef: ConditionReference = {
          lhsRef:lhs,
          rhsRef: rhs,
          comparatorRef: StandardComparator.StandardLike
        }
        const condition = new Condition(conditionRef, scope);
        const result = condition.awaitValidation({}, scope);
        if(isPromise(result)) {
          unreachableCode.should.be.true;
        } else {
          expect(result).to.be.true;
        }
        done();
      });
    });
    describe('Conversion tests', () => {
      it('should convert 3 =< 4 to a reference', done => {
        const lhs: ValueExpressionReference = {
          value: '3',
          dataTypeRef: StandardDataType.Number,
          type: ExpressionType.Value
        };
        const rhs: ValueExpressionReference = {
          value: 4,
          dataTypeRef: StandardDataType.Number,
          type: ExpressionType.Value
        };
        const conditionRef: ConditionReference = {
          lhsRef: lhs,
          rhsRef: rhs,
          comparatorRef: StandardComparator.StandardLessThanOrEqual
        };
        const condition = new Condition(conditionRef, scope);
        const asReference = condition.to();
        asReference.comparatorRef.should.equal(StandardComparator.StandardLessThanOrEqual);
        asReference.lhsRef.type.should.equal(ExpressionType.Value);
        done();
      });
    })
  });
});


// TODO: Test evaluable expressions



