import {ExecutionContextI} from '@franzzemen/app-utility';
import {Scope} from '@franzzemen/re-common';
import {ExpressionScope, ExpressionStackParser} from '@franzzemen/re-expression';
import {ComparatorFactory} from '../comparator/comparator-factory';
import {DataTypeComparatorFactory} from '../comparator/data-type-comparator/data-type-comparator-factory';
import {ConditionExpressionParser} from '../parser/condition-expression-parser';
import {ConditionOptions} from './condition-options';

export class ConditionScope extends ExpressionScope {
  public static DataTypeComparatorFactory = 'DataTypeComparatorFactory';
  public static ComparatorFactory = 'ComparatorFactory';

  constructor(options?: ConditionOptions, parentScope?: Scope, ec?:ExecutionContextI) {
    super(options, parentScope, ec);
    this.set(ConditionScope.DataTypeComparatorFactory, new DataTypeComparatorFactory());
    this.set(ConditionScope.ComparatorFactory, new ComparatorFactory());
    const parser = this.get(ConditionScope.ExpressionStackParser) as ExpressionStackParser;
    parser.addParser(new ConditionExpressionParser(), true, ec);
  }

}
