export const getSuffix = (number): string => {
  const length = number?.toString()?.length;
  return length <= 3 ? "" : length <= 6 ? "K" : length <= 9 ? "M" : "?";
};

export const getNumberWithSuffix = (number): string => {
  const length = number?.toString()?.length;
  return length <= 3
    ? String(number)
    : length <= 6
    ? (number / 1000).toFixed(0) + "K"
    : length <= 9
    ? (number / 1000000).toFixed(0) + "M"
    : "?";
};

export const correctNumberForSuffix = (number, suffix) => {
  return {
    "": number,
    K: number / 1000,
    M: number / 1000000,
    "?": number,
  }[suffix];
};
