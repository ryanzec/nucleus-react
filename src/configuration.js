var configurationValues = {
  appendElementSelector: '.append-elements',
  standardDateFormat: 'YYYY-MM-DDTHH:mm:ssZZ',
  standardDisplayDateFormat: 'MM/DD/YYYY',
  timezone: 'UTC',
  userAgentDetails: {}
};

export default {
  get: (configuration) => {
    if (!configuration) {
      return configurationValues;
    }

    return configurationValues[configuration];
  },

  set: (configuration, value) => {
    configurationValues[configuration] = value;
  }
};
