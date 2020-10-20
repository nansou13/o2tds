export default (availableValue) => {
  const result = {};

  if (availableValue.title) result.title = availableValue.title;
  if (availableValue.key) result.key = availableValue.key;
  if (availableValue.disabled) result.disabled = availableValue.disabled;

  return result;
};
