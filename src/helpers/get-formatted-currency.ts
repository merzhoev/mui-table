export const getFormattedCurrency = (value: number | bigint): string => {
  const currencyFormatter = Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });

  return currencyFormatter.format(value);
};
