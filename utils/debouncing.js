export const debouncer = (callback, limit) => {
  let timeout;

  return (value) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      await callback(value);
    }, limit);
  };
};
