var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Code = nucleusReact.components.Code;
var codeExample = 'var TestComponent = React.createClass({\n\tmixins: [\n\t\tdebounceMixin\n\t],\n\n\tdebounceMethods: [{\n\t\tname: \'increase\',\n\t\tfunc: function() {\n\t\t\t//...\n\t\t},\n\t\tdelay: 500\n\t}, {\n\t\tname: \'decrease\',\n\t\tfunc: function() {\n\t\t\t//...\n\t\t},\n\t\tdelay: 1q500\n\t}],\n\t//...\n});';

module.exports = {
  name: 'Debounce',
  type: 'mixin',
  overview: (
    <span>
      <p>
        This mixin will allow the component to add functions that are debounced.
      </p>
      <p>
        This is done by adding array of object called <code>debounceMethods</code>.  Each object in the <code>debounceMethods</code> array must have a <code>name</code>, <code>func</code>, and <code>delay</code> property.  For example:
        <Code language="javascript">
          {codeExample}
        </Code>
        This code will have add <code>increase</code> and <code>decrease</code> methods to the component that are debounced for the delay that was defined
      </p>
    </span>
  )
};
