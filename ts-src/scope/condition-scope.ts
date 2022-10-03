import {ExecutionContextI} from '@franzzemen/app-utility';
import {Scope} from '@franzzemen/re-common';
import {ExpressionFactory, ExpressionScope, ExpressionStackParser} from '@franzzemen/re-expression';
import {ComparatorFactory} from '../comparator/comparator-factory.js';
import {DataTypeComparatorFactory} from '../comparator/data-type-comparator/data-type-comparator-factory.js';
import {ConditionExpressionParser} from '../parser/condition-expression-parser.js';
import {ConditionOptions} from './condition-options.js';

export class ConditionScope extends ExpressionScope {
  public static DataTypeComparatorFactory = 'DataTypeComparatorFactory';
  public static ComparatorFactory = 'ComparatorFactory';

  constructor(options?: ConditionOptions, parentScope?: Scope, ec?:ExecutionContextI) {
    super(options, parentScope, ec);

    const factory: ExpressionFactory = this.get(ExpressionScope.ExpressionFactory) as ExpressionFactory;

    this.set(ConditionScope.DataTypeComparatorFactory, new DataTypeComparatorFactory());
    this.set(ConditionScope.ComparatorFactory, new ComparatorFactory());

    const parser = this.get(ExpressionScope.ExpressionStackParser) as ExpressionStackParser;
    parser.addParser(new ConditionExpressionParser(), false, ec);
  }

}
