import DecimalFormat from 'decimal-format';

export function formatLocalized(locale, formatStr, numStr = null) {
  let num = numStr;
  if (Number.isNaN(Number(num))) {
    num = null;
  }
  switch (locale.toUpperCase()) {
    case 'FR':
      return new DecimalFormat(formatStr, ',', ' ').format(num);
    case 'ES':
    case 'IT':
    case 'DE':
    case 'PT':
      return new DecimalFormat(formatStr, ',', '.').format(num);
    default:
      return new DecimalFormat(formatStr).format(num);
  }
}
