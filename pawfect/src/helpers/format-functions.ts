export const weightFormat = (amount: number, unit: string, options: Intl.NumberFormatOptions = {}) => {
  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
    useGrouping: true,
    notation: 'standard',
    ...options,
  }).format(amount)} ${unit}`;
};