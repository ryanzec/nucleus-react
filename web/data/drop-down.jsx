var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var DropDown = nucleusReact.components.DropDown;
var Button = nucleusReact.components.Button;

module.exports = {
  name: 'Drop Down',
  type: 'component',
  overview: (
    <p>
      Drop down menu.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Standard.
      </p>
    ),
    example: (
      <div>
        just a test on a <DropDown
          handleNode="simple"
          contentNode={
            <ul className="plain-list">
              <li>drop down item 1</li>
              <li>drop down item 2</li>
              <li>drop down item 3</li>
            </ul>
          }
        /> drop down menu
        <div>
          <button>testing to make sure the hidden content does not effect other element below when hidden</button>
        </div>
      </div>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Right aligned.
      </p>
    ),
    example: (
      <div>
        just a test on a <DropDown
          align="right"
          handleNode="simple"
          contentNode={
            <ul className="plain-list">
              <li>drop down item 1</li>
              <li>drop down item 2</li>
              <li>drop down item 3</li>
            </ul>
          }
        /> drop down menu
        <div>
          <button>testing to make sure the hidden content does not effect other element below when hidden</button>
        </div>
      </div>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
