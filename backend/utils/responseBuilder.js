module.exports = {
  success(message, data = {}) {
    return {
      success: true,
      message,
      data,
    };
  },

  error(message, code = 500) {
    return {
      success: false,
      message,
      code,
    };
  },
};
