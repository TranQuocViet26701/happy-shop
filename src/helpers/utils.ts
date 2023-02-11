function formatMoney(x: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(x);
}

export const utils = { formatMoney };
