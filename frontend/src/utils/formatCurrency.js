const formatCurrency = (
  amount,
  currency = "INR"
) => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const formatCompactCurrency = (
  amount
) => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "₹0";
  }

  if (numericAmount >= 10000000) {
    return `₹${(
      numericAmount / 10000000
    ).toFixed(1)}Cr`;
  }

  if (numericAmount >= 100000) {
    return `₹${(
      numericAmount / 100000
    ).toFixed(1)}L`;
  }

  if (numericAmount >= 1000) {
    return `₹${(
      numericAmount / 1000
    ).toFixed(1)}K`;
  }

  return `₹${numericAmount}`;
};

export default formatCurrency;