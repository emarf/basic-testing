import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let bankAccount: ReturnType<typeof getBankAccount>;
  let firstBankAccount: ReturnType<typeof getBankAccount>;
  let secondBankAccount: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    bankAccount = getBankAccount(100);
    firstBankAccount = getBankAccount(200);
    secondBankAccount = getBankAccount(9000);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdraw = () => bankAccount.withdraw(200);
    expect(withdraw).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const transfer = () => firstBankAccount.transfer(300, secondBankAccount);
    expect(transfer).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transfer = () => firstBankAccount.transfer(200, firstBankAccount);
    expect(transfer).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(200);
    expect(bankAccount.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(100);
    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    firstBankAccount.transfer(200, secondBankAccount);
    expect(firstBankAccount.getBalance()).toBe(0);
    expect(secondBankAccount.getBalance()).toBe(9200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(50);
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(20);
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(20);

    if (balance) {
      bankAccount.deposit(balance);
      expect(bankAccount.getBalance()).toBe(120);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(20);
    (random as jest.Mock).mockReturnValueOnce(0);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
