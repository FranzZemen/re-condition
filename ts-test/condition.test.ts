import {Scope} from '@franzzemen/re-common';
import {isPromise} from 'node:util/types';
import {StandardDataType} from '@franzzemen/re-data-type';
import {
  AttributeExpression,
  AttributeExpressionReference,
  ExpressionReference,
  StandardExpressionType,
  SetExpressionReference,
  ValueExpressionReference
} from '@franzzemen/re-expression';
import chai from 'chai';
import 'mocha';
import {
  Comparator,
  ComparatorFactory,
  Condition,
  ConditionReference,
  ConditionScope,
  StandardComparator
} from '../publish/index.js';


let should = chai.should();
let expect = chai.expect;

const unreachableCode = false;


describe('re-condition', () => {
  describe('condition tests', () => {
    describe('value expression tests', () => {
      describe('number data type tests', () => {
        it('should evaluate two equal NUMBER expressions to true for 5 ="5"', done => {
          const scope = new ConditionScope();

          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '5',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();

          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '6',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();

          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: '3',
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 4,
            dataTypeRef: StandardDataType.Number,
            type: StandardExpressionType.Value
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
      describe('float data type tests', () => {
        it('should evaluate two equal NUMBER expressions to true for 5.0 ="5"', done => {
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '5',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '6',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4.0',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 5.0,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {
            value: '4.0',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: '3',
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 4.0,
            dataTypeRef: StandardDataType.Float,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 'abcdef',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'abcdefg',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();

          const lhs: ValueExpressionReference = {
            value: 'hello world',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: '*ll*',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: 'helo world',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: '*ll*',
            dataTypeRef: StandardDataType.Text,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'true',
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'false',
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
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
          const scope = new ConditionScope();
          const lhs: ValueExpressionReference = {
            value: true,
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
          };
          const rhs: ValueExpressionReference = {

            value: 'false',
            dataTypeRef: StandardDataType.Boolean,
            type: StandardExpressionType.Value
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
    });
    describe('Attribute Expression tests', () => {
      it('should evaluate true for foo.bar > "5"', done => {
        const scope = new ConditionScope();

        const lhs: AttributeExpressionReference = {
          path: 'foo.bar',
          dataTypeRef: StandardDataType.Number,
          type: StandardExpressionType.Attribute
        };
        const rhs: ValueExpressionReference = {

          value: '5',
          dataTypeRef: StandardDataType.Number,
          type: StandardExpressionType.Value
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

        it('Should should evaluate two objects with custom comparator as true', () => {
          const comparatorFactory: ComparatorFactory = new ComparatorFactory(true);
          const scope = new ConditionScope();
          scope.addRuleElementReferenceItem({
            moduleRef: {
              refName: 'FooBarEqualityComparator',
              module: {
                moduleName: '../../../testing/core/condition/foo-bar-equality-comparator.js',
                constructorName: 'FooBarEqualityComparator'
              }
            }
          }, ConditionScope.ComparatorFactory);

          const resultOrPromise = Scope.resolve(scope);
          if (isPromise(resultOrPromise)) {
            return resultOrPromise
              .then(truVal => {
                const lhsRef: AttributeExpressionReference = {
                  path: 'foo.bar',
                  dataTypeRef: StandardDataType.Unknown,
                  type: StandardExpressionType.Attribute
                };
                const rhsRef: AttributeExpressionReference = {
                  path: 'foo1.bar1',
                  dataTypeRef: StandardDataType.Unknown,
                  type: StandardExpressionType.Attribute
                };
                const conditionRef: ConditionReference = {
                  lhsRef,
                  rhsRef,
                  comparatorRef: 'FooBarEqualityComparator'
                };
                const condition = new Condition(conditionRef, new ConditionScope());
                const result = condition.awaitValidation({
                  foo: {bar: {fooValue: 1234}},
                  foo1: {bar1: {fooValue: 1234}}
                }, scope);
                expect(result).to.exist;
                if (isPromise(result)) {
                  unreachableCode.should.be.true;
                }
                result.should.be.true;
              });
          }
        });
      });
      it('Should should evaluate two objects with custom comparator as true', () => {
        /*
        class BarEqualityComparator extends Comparator {
          constructor() {
            super('Bar equality comparator');
          }

          operate(lhs: string | number | boolean | Moment | object, rhs: string | number | boolean | Moment | object): boolean {
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
          type: StandardExpressionType.Attribute
        });
        const rhs: AttributeExpression = new AttributeExpression({
          path: 'foo1.bar1',
          dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
          type: StandardExpressionType.Attribute
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

          operate(lhs: string | number | boolean | Moment | object, rhs: string | number | boolean | Moment | object): boolean {
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
          type: StandardExpressionType.Attribute
        });
        const rhs: AttributeExpression = new AttributeExpression({
          path: 'foo1.bar1',
          dataTypeRef: {name: StandardDataType.Extended, name: 'BarEqualityComparator'},
          type: StandardExpressionType.Attribute
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

         */
      });
      describe('Function Expression Tests', () => {
        describe('Set Expression Tests', () => {
          it('should validate "hello world" like ["hel*"]', done => {
            const scope = new ConditionScope();

            const lhs: ValueExpressionReference = {
              type: StandardExpressionType.Value,
              dataTypeRef: StandardDataType.Text,
              value: 'hello world'
            };
            const rhs: SetExpressionReference = {
              type: StandardExpressionType.Set,
              dataTypeRef: StandardDataType.Text,
              set: [{
                type: StandardExpressionType.Value,
                dataTypeRef: StandardDataType.Text,
                value: 'hel*'
              } as ExpressionReference
              ]
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
            } else {
              expect(result).to.be.true;
            }
            done();
          });
        });
        describe('Conversion tests', () => {
          it('should convert 3 =< 4 to a reference', done => {
            const scope = new ConditionScope();
            const lhs: ValueExpressionReference = {
              value: '3',
              dataTypeRef: StandardDataType.Number,
              type: StandardExpressionType.Value
            };
            const rhs: ValueExpressionReference = {
              value: 4,
              dataTypeRef: StandardDataType.Number,
              type: StandardExpressionType.Value
            };
            const conditionRef: ConditionReference = {
              lhsRef: lhs,
              rhsRef: rhs,
              comparatorRef: StandardComparator.StandardLessThanOrEqual
            };
            const condition = new Condition(conditionRef, scope);
            const asReference = condition.to();
            asReference.comparatorRef.should.equal(StandardComparator.StandardLessThanOrEqual);
            asReference.lhsRef.type.should.equal(StandardExpressionType.Value);
            done();
          });
        });
      });
    });
  });
});


// TODO: Test evaluable expressions



