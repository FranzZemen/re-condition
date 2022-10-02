import {RuleElementFactory} from '@franzzemen/re-common';
import {RuleElementInstanceReference} from '@franzzemen/re-common';
import {StandardDataType} from '@franzzemen/re-data-type';
import {StandardComparator} from '../comparator.js';

export interface DataTypeComparatorRef {
  refName: string;
  comparators: string [];
}

export class DataTypeComparatorFactory extends RuleElementFactory<DataTypeComparatorRef>{
  constructor(loadStandard: boolean = true) {
    super();
    const textComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Text,
      instance: {
        refName: StandardDataType.Text,
        comparators: [
          StandardComparator.StandardEquality,
          StandardComparator.StandardInequality,
          StandardComparator.StandardLike
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(textComparators.instance.comparators);
    this.register({instanceRef: textComparators});

    const numberComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Number,
      instance: {
        refName: StandardDataType.Number,
        comparators: [
          StandardComparator.StandardEquality,
          StandardComparator.StandardInequality,
          StandardComparator.StandardLessThan,
          StandardComparator.StandardLessThanOrEqual,
          StandardComparator.StandardGreaterThan,
          StandardComparator.StandardGreaterThanOrEqual,
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(numberComparators.instance.comparators);
    this.register({instanceRef: numberComparators});

    const floatComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Float,
      instance: {
        refName: StandardDataType.Float,
        comparators: [
          StandardComparator.StandardEquality,
          StandardComparator.StandardInequality,
          StandardComparator.StandardLessThan,
          StandardComparator.StandardLessThanOrEqual,
          StandardComparator.StandardGreaterThan,
          StandardComparator.StandardGreaterThanOrEqual
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(floatComparators.instance.comparators);
    this.register({instanceRef: floatComparators});


    const booleanOperators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Boolean,
      instance: {
        refName: StandardDataType.Boolean,
        comparators: [
          StandardComparator.StandardEquality,
          StandardComparator.StandardInequality
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(booleanOperators.instance.comparators);
    this.register({instanceRef: booleanOperators});


    const timestampComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Timestamp,
      instance: {
        refName: StandardDataType.Timestamp,
        comparators: [
          StandardComparator.MomentEquality,
          StandardComparator.MomentInequality,
          StandardComparator.MomentEarlier,
          StandardComparator.MomentNowOrEarlier,
          StandardComparator.MomentLater,
          StandardComparator.MomentNowOrLater
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(timestampComparators.instance.comparators);
    this.register({instanceRef: timestampComparators});

    const dateComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Date,
      instance: {
        refName: StandardDataType.Date,
        comparators: [
          StandardComparator.MomentEquality,
          StandardComparator.MomentInequality,
          StandardComparator.MomentEarlier,
          StandardComparator.MomentNowOrEarlier,
          StandardComparator.MomentLater,
          StandardComparator.MomentNowOrLater
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(dateComparators.instance.comparators);
    this.register({instanceRef: dateComparators});

    const timeComparators: RuleElementInstanceReference<DataTypeComparatorRef> = {
      refName: StandardDataType.Time,
      instance: {
        refName: StandardDataType.Time,
        comparators: [
          StandardComparator.MomentEquality,
          StandardComparator.MomentInequality,
          StandardComparator.MomentEarlier,
          StandardComparator.MomentNowOrEarlier,
          StandardComparator.MomentLater,
          StandardComparator.MomentNowOrLater
        ]
      }
    };
    DataTypeComparatorFactory.sortLargestToSmallest(timeComparators.instance.comparators);
    this.register({instanceRef: timeComparators});
  }

  static sortLargestToSmallest(comparators:  string[]) {
    comparators.sort((op1:string, op2:string) => {
      // Behavior is that if result > 0 it will sort op2 first, which is what we want.
      // So subtract lengths.
      return op2.length - op1.length;
    });
  }

  isC(obj: any): obj is DataTypeComparatorRef {
    return obj.dataTypeRef !== undefined && Array.isArray(obj.comparators);
  }

  addOperatorToDataType(dataTypeRef: string, comparatorRef: string): boolean {
    const registered = this.getRegistered(dataTypeRef);
    if(!registered) {
      throw new Error(`addOperatorToDataType:  dataTypeRef [${dataTypeRef}] does not exist`);
    }
    if(registered.comparators.indexOf(comparatorRef) >= 0) {
      return false;
    } else {
      registered.comparators.push(comparatorRef);
      DataTypeComparatorFactory.sortLargestToSmallest(registered.comparators);
      return true;
    }
  }

  removeComparatorFromDataType(dataTypeRef: string, comparatorRef: string): boolean {
    const registered = this.getRegistered(dataTypeRef);
    if(!registered) {
      throw new Error(`addOperatorToDataType:  dataTypeRef [${dataTypeRef}] does not exist`);
    }
    const ndx = registered.comparators.indexOf(comparatorRef);
    if(ndx >= 0) {
      registered.comparators.splice(ndx, 1);
    } else {
      return false;
    }
  }
}
