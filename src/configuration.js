const configuration = {
  appendElementSelector: '.append-elements'
};

export default {
  get(key) {
    if (!key) {
      return configuration;
    }

    return configuration[key];
  }
}
