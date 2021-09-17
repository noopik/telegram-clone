export const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};
