import forEach from 'lodash/forEach';

export const getPassThroughProperties = (componentProperties, propertyDefinations, ...passThrough) => {
  const passThroughProps = {};

  // NOTE: children should always be passed explicited
  const skipProperties = Object.keys(propertyDefinations).concat(['children']);

  forEach(componentProperties, (value, key) => {
    if (skipProperties.indexOf(key) === -1 || passThrough.indexOf(key) !== -1) {
      passThroughProps[key] = value;
    }
  });

  return passThroughProps;
};

export const composeStyles = (baseStyles, customStyles, composeStyle = 'merge') => {
  if (!customStyles) {
    return baseStyles;
  }

  const composedStyles = {};
  const keys = Object.keys(baseStyles);

  for (let x = 0; x < keys.length; x += 1) {
    let newValue = baseStyles[keys[x]];

    if (customStyles[keys[x]]) {
      if (composeStyle === 'overwrite') {
        newValue = customStyles[keys[x]];
      } else {
        newValue += ` ${customStyles[keys[x]]}`;
      }
    }

    composedStyles[keys[x]] = newValue;
  }

  return composedStyles;
};
