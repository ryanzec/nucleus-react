var React = require('react/addons');

module.exports = {
  name: 'Single Panel',
  type: 'store',
  overview: (
    <p>
      This store is used to register and manage single panel component to easily make sure that only one single panel component can be opened at a single time.
    </p>
  ),
  actions: [{
    name: 'registerComponent',
    returnType: 'void',
    parameters: [{
      name: 'object',
      type: 'component'
    }],
    description: (
      <span>
        <p>
          Adds the component to the list of active single panel components.
        </p>
        <p><strong>The component must have a <code>hideSinglePanel()</code> method defined for it is work properly.</strong></p>
      </span>
    )
  }, {
    name: 'unregisterComponent',
    returnType: 'void',
    parameters: [{
      name: 'object',
      type: 'component'
    }],
    description: (
      <p>
        Removes the component from the list of active single panel components.
      </p>
    )
  }, {
    name: 'registerGlobalEventHandler',
    returnType: 'void',
    parameters: [],
    description: (
      <p>
        Registers global events to handle clicks and escape key events to hide signle panels.
      </p>
    )
  }, {
    name: 'unregisterGlobalEventHandler',
    returnType: 'void',
    parameters: [],
    description: (
      <p>
        Removes global events to handle clicks and escape key events to hide signle panels.
      </p>
    )
  }, {
    name: 'setClickedComponent',
    returnType: 'void',
    parameters: [{
      name: 'object',
      type: 'component'
    }],
    description: (
      <p>
        Sets a component as clicked in order to prevent that component from closing in the next global event trigger (so for example, prevent a single panel component from closing when you click on it).
      </p>
    )
  }]
};
