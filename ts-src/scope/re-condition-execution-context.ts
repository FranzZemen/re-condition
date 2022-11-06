/*
Created by Franz Zemen 11/06/2022
License Type: 
*/
import {AppExecutionContextDefaults, appSchemaWrapper} from '@franzzemen/app-execution-context';
import {ExecutionContextDefaults, executionSchemaWrapper} from '@franzzemen/execution-context';
import {LogExecutionContextDefaults, logSchemaWrapper} from '@franzzemen/logger-adapter';
import {reCommonSchemaWrapper} from '@franzzemen/re-common';
import {reDataTypeSchemaWrapper} from '@franzzemen/re-data-type';
import {ExpressionExecutionContext, expressionOptionsSchemaWrapper, ReExpression} from '@franzzemen/re-expression';
import Validator, {ValidationError} from 'fastest-validator';
import {isPromise} from 'util/types';

export interface ConditionOptions {
}

export interface ReCondition extends ReExpression {
  condition?: ConditionOptions;
}

export interface ConditionExecutionContext extends ExpressionExecutionContext {
  re?: ReCondition;
}

export class ConditionExecutionContextDefaults {
  static AllowUnknownDataType = false;
  static ConditionOptions: ConditionOptions = {
    allowUnknownDataType: ConditionExecutionContextDefaults.AllowUnknownDataType
  }
  static ReCondition: ReCondition = {
    condition: ConditionExecutionContextDefaults.ConditionOptions
  }
  static ConditionExecutionContext: ConditionExecutionContext = {
    execution: ExecutionContextDefaults.Execution(),
    app: AppExecutionContextDefaults.App,
    log: LogExecutionContextDefaults.Log,
    re: ConditionExecutionContextDefaults.ReCondition
  };
}

export const conditionOptionsSchema = {
};

export const conditionOptionsSchemaWrapper = {
  type: 'object',
  optional: true,
  default: ConditionExecutionContextDefaults.ConditionOptions,
  props: conditionOptionsSchema
};

const reConditionSchema = {
  common: reCommonSchemaWrapper,
  data: reDataTypeSchemaWrapper,
  expression: expressionOptionsSchemaWrapper,
  condition: conditionOptionsSchemaWrapper,
};

export const reConditionSchemaWrapper = {
  type: 'object',
  optional: true,
  default: ConditionExecutionContextDefaults.ReCondition,
  props: reConditionSchema
};


export const conditionExecutionContextSchema = {
  execution: executionSchemaWrapper,
  app: appSchemaWrapper,
  log: logSchemaWrapper,
  re: reConditionSchemaWrapper
};

export const conditionExecutionContextSchemaWrapper = {
  type: 'object',
  optional: true,
  default: ConditionExecutionContextDefaults.ConditionExecutionContext,
  props: conditionExecutionContextSchema
};


export function isConditionExecutionContext(options: any | ConditionExecutionContext): options is ConditionExecutionContext {
  return options && 're' in options; // Faster than validate
}

const check = (new Validator({useNewCustomCheckerFunction: true})).compile(conditionExecutionContextSchema);

export function validate(context: ConditionExecutionContext): true | ValidationError[] {
  const result = check(context);
  if (isPromise(result)) {
    throw new Error('Unexpected asynchronous on ConditionExecutionContext validation');
  } else {
    if (result === true) {
      context.validated = true;
    }
    return result;
  }
}


