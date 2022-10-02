import {Comparator} from '../publish/index.js';

export class FooBarEqualityComparator extends Comparator {
  constructor() {
    super('Bar equality comparator');
  }

  compare(lhs: any, rhs:any): boolean {
    const lhsVal = lhs['fooValue'];
    const rhsVal = rhs['fooValue'];

    return lhs['fooValue'] === rhs['fooValue'];
  }
}
