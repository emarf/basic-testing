import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersToNextTimer(3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyOnJoin = jest.spyOn(path, 'join');
    const filePath = 'test.js';
    await readFileAsynchronously(filePath);

    expect(spyOnJoin).toHaveBeenCalledWith(__dirname, filePath);
    spyOnJoin.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const notExistingPath = 'not-existing-path.js';
    const result = await readFileAsynchronously(notExistingPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existsSync = jest.spyOn(fs, 'existsSync');
    const readFile = jest.spyOn(fsPromises, 'readFile');

    const fileContent = 'File content';
    existsSync.mockReturnValue(true);
    readFile.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBe(fileContent);
    existsSync.mockRestore();
    readFile.mockRestore();
  });
});
