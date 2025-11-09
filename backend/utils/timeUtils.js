module.exports = {
  now() {
    return Date.now();
  },

  format(timestamp) {
    return new Date(timestamp).toLocaleString();
  },

  minutesAgo(mins) {
    return Date.now() - mins * 60 * 1000;
  },
};
