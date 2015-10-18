module.exports = {
  formatFileCode: function(code) {
    //NOTE: remove the last ending line as it is not needed for code examples
    return code.substr(0, code.length - 1);
  }
};
