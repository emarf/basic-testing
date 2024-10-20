import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    expect(result).toBe(2);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 3, action: Action.Multiply });
    expect(result).toBe(9);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });

    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: 'invalid action' as any,
    });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 2,
      b: 'invalid argument' as any,
      action: Action.Add,
    });

    expect(result).toBeNull();
  });
});
