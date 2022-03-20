export const formatPrice = (amount) => {
  return `£${(amount / 100).toFixed(2)}`;
};
