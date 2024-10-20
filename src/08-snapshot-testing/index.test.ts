import { generateLinkedList } from './index';

const expectedList = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 1,
    },
    value: 1,
  },
  value: 1,
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1, 1, 1]);
    expect(result).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([2, 2, 2]);
    expect(result).toMatchSnapshot();
  });
});
