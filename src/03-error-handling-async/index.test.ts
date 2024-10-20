import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'foo';
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Hi, i am error!';
    const result = () => throwError(errorMessage);
    expect(result).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();
    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
