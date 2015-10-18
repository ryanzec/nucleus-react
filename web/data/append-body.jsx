var React = require('react/addons');

module.exports = {
  name: 'Append Body',
  type: 'mixin',
  overview: (
    <p>
      Adding this mixin to a component will allow it to append and manage one element on the `body` on the `document`.
    </p>
  ),
  providedMethods: [{
    name: 'createAppendElement',
    returnType: 'void',
    parameters: [{
      name: 'options',
      type: 'object'
    }],
    description: (
      <p>
        This method creates an element on the body of the document.  Only one element can be created per component with this mixin.
      </p>
    )
  }, {
    name: 'getAppendElement',
    returnType: 'Element',
    parameters: [],
    description: (
      <p>
        This returns the generated element.
      </p>
    )
  }, {
    name: 'removeAppendElement',
    returnType: 'void',
    parameters: [],
    description: (
      <p>
        Removes the appended element associated with this component.
      </p>
    )
  }],
  providableMethods: [{
    name: 'getAppendBodyContent',
    returnType: 'object',
    parameters: [],
    required: true,
    description: (
      <p>
        This method return a ReactJS element that is used to populate the content of the appended element.
      </p>
    )
  }]
};
