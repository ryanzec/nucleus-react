var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var utilities = require('../../utilities/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var Badge = commonReact.components.Badge;
var BadgeGroup = commonReact.components.BadgeGroup;
var Code = commonReact.components.Code;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;

var badgePage = {};

badgePage.displayName = 'ComponentsBadgePage';

badgePage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Badge');
};

badgePage.render = function() {
  return (
    <div className="p-components-badge">
      <div className="u-headline">Badge</div>
      <div>
        Badges are a way to add extra inline styling to element in order to make them stand out.
      </div>
      <div>
        <div className="u-title">Standard</div>
        <div>
          All you need to create a standard badge is to use the <Code language="jsx" isInline={true}>{'<Badge />'}</Code> component.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/badge/standard.jsx', 'utf8')}>
          <Badge>Badge</Badge>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Pills</div>
        <div>
          By default, badges have a small border radius.  If you wish for your badge to look like a pill, you can add the <Code isInline={true}>m-pill</Code> class.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/badge/pill.jsx', 'utf8')}>
          <Badge className="m-pill">Pill Form</Badge>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Grouping</div>
        <div>
          If you wish to group multiplebadge together, you will want to use the <Code language="jsx" isInline={true}>{'<BadgeGroup />'}</Code> component.
          <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/badge/grouping.jsx', 'utf8')}>
            <BadgeGroup>
              <Badge>Badge</Badge>
              <Badge className="m-pill">Pill Form</Badge>
            </BadgeGroup>
          </FrameworkExample>
        </div>
      </div>
      <div>
        <div className="u-title">Color Types</div>
        <div>
          This component supports for 4 different color types with the <Code isInline={true}>m-safe</Code>, <Code isInline={true}>m-notice</Code>, <Code isInline={true}>m-warning</Code>, and <Code isInline={true}>m-danger</Code> classes.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/badge/color-types.jsx', 'utf8')}>
          <BadgeGroup>
            <Badge className="m-safe">Safe</Badge>
            <Badge className="m-notice m-pill">Notice</Badge>
            <Badge className="m-warning">Warning</Badge>
            <Badge className="m-danger m-pill">Danger</Badge>
          </BadgeGroup>
        </FrameworkExample>
      </div>
      <hr />
      <div className="framework-properties">
        <div className="u-title">Properties</div>
        <FrameworkProperty
          name="className"
          type="string"
          defaultValue="null"
          descriptionNode="This is a string of one or more css classes that you wish to add to the main element."
        />
      </div>
    </div>
  );
};

module.exports = React.createClass(badgePage);
