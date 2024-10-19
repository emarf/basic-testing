import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 1,
    action: Action.Add,
    expected: 2,
    description: 'add two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
    description: 'subtract two numbers',
  },
  {
    a: 3,
    b: 3,
    action: Action.Multiply,
    expected: 9,
    description: 'multiply two numbers',
  },
  {
    a: 6,
    b: 3,
    action: Action.Divide,
    expected: 2,
    description: 'divide two numbers',
  },
  {
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
    description: 'exponentiate two numbers',
  },
  {
    a: 2,
    b: 3,
    action: 'invalid action',
    expected: null,
    description: 'return null for invalid action',
  },
  {
    a: 2,
    b: 'invalid argument',
    action: Action.Add,
    expected: null,
    description: 'return null for invalid arguments',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should $description', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action: action as Action });
    expect(result).toBe(expected);
  });
});
