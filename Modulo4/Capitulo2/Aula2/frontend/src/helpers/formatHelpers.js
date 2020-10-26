const formmatter = Intl.NumberFormat('pt-BR');

function formatNumber(value) {
  return formmatter.format(value);
}

function formatPercentage(value) {
  const stringValue = value.toFixed(2);
  return stringValue.replace('.', ',') + '%';
}

export { formatNumber, formatPercentage };
