import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    axios.create = jest.fn().mockReturnValue({
      get: mockGet,
    });

    throttledGetDataFromApi('/posts/1');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({
      get: mockGet,
    });

    throttledGetDataFromApi('/posts/1');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test Post' };
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
