var React = require('react/addons');

module.exports = {
  name: 'DOM Event Manger',
  type: 'mixin',
  overview: (
    <p>
      While you should try to use React's event dom as much as possible, sometimes you need to manually attach event yourself (ex. adding an event to the document itself).  This mixin provides a system that will automatically remove event use the component is unmounted in order to prevent leaking event listeners.
    </p>
  ),
  providedMethods: [{
    name: 'addDomEvent',
    returnType: 'void',
    parameters: [{
      name: 'element',
      type: 'mixed'
    }, {
      name: 'type',
      type: 'string'
    }, {
      name: 'func',
      type: 'function'
    }],
    description: (
      <p>
        This will attach a DOM event to the passed element and track it so that when the component unmounts, it automatically removes the event.
      </p>
    )
  }]
};
