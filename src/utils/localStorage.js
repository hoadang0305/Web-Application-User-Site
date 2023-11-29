export const sessionStorage = {
  get: (key) => {
    return window.localStorage.getItem(key);
  },
  set: (key, value) => {
    window.localStorage.setItem(key, value);
  },
  remove: (key) => {
    window.localStorage.removeItem(key);
  },
  clear: () => {
    window.localStorage.clear();
  },
};
