export const formatFieldLabel = (value = '') => value
  .replace(/([A-Z])/g, ' $1')
  .replace(/_/g, ' ')
  .replace(/^./, (letter) => letter.toUpperCase())
  .trim();
