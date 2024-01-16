export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'USD',
  }).format(value);
};
