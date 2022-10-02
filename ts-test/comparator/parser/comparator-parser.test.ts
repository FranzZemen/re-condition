import 'mocha';
import {StandardDataType} from '@franzzemen/re-data-type';
import chai from 'chai';
import {ComparatorParser, ConditionScope} from '../../../publish/index.js';


const expect = chai.expect;
const should = chai.should();


const parser = new ComparatorParser();
const scope = new ConditionScope();

describe('Rules Engine Tests', () => {
  describe('Comparator Parser Tests', () => {
    describe('/core/comparator/parser/comparator-parser.test', () => {
      it('should parse greater than using refName >', done => {
        const [remaining, result] = parser.parse('> Hello World', StandardDataType.Number, scope);
        result.should.equal('>');
        done();
      })
      it('should parse like and ~', done => {
        const [remaining, result] = parser.parse('~ "Hello World"', StandardDataType.Text, scope);
        result.should.equal('~');
        const [remaining2, result2] = parser.parse('like "Hello World"', StandardDataType.Text, scope);
        result2.should.equal('~');
        done();
      })
    })
  })
})
