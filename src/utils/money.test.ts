import { formatMoney } from './money';

describe('formatMoney', () => {
  it('should format a positive number correctly', () => {
    const result = formatMoney(12345.6789);
    expect(result).toBe('$12,345.68');
  });

  it('should format a negative number correctly', () => {
    const result = formatMoney(-9876.5432);
    expect(result).toBe('-$9,876.54');
  });

  it('should format a zero correctly', () => {
    const result = formatMoney(0);
    expect(result).toBe('$0.00');
  });
});
