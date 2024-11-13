const { format } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export { format as formatCurrencyToString };
