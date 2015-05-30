# Change Log

There are some key used within the changelog which are as following:

- [bug]: means a bug fix
- [feature]: means a new feature
- [breaking]: mean there is a change that might break existing code
- [test]: add test
- [X]: anything else within brackets say what component that change is related t- o

## master
- [modal][bug] fixed IE mobile issue
- [extend-text][feature] placeholder no longer shows when one or more tags are set (#75)
- [input-auto-sizer][feature] added type props to input auto sizer
- [input-auto-sizer][textbox-input][feature] added support for input auto sizer
- [extend-text][feature] added label support (#76)
- [extend-text][bug] clicking the delete button does not close auto complete box for static data (#77)
- [clickable][feature] now calls passed event if needed
- [input-auto-sizer][extend-text][feature] added support for placeholder text (#74)
- [date-picker] closeOnClick default to `true` (#73)
- [extend-text] added className prop (#63)
- [date-picker] added label prop (#60)
- [sate-picker] added className prop
- [drop-down] added closeOnContentClick prop
- [single-panel-manager] added ability to set outsideHandleClick
- [calendar] added className prop
- [calendar] added ability to set selection unit to day or week (#70)
- [date-picker] added ability to set selection unit to day or week (#70)
- [drop-down] fixed bug with drop down tests/examples
- [extend-text] added dropDownIconFragment prop (#71)
- [drop-down] added test coverage
- [clickable][feature] added mobile support to clickable mixin
- [drop-down][feature] added drop down component
- [date-picker][feature] added ability to close date picker calendar on date selection (#59)
- [card][feature] added hover/pressed functionality for card (without header) (#44)
- [extend-text][bug] fixed a few locations where the value was not being updated or not updated properly (#47)
- [extend-text][bug] auto complete now displays remaining items after entering a tag automatically if threshold is 0 (#45)
- [extend-text][bug] coverted svg based animation to css based animation for loading indicator (#46)
- [extend-text][bug] fixed clicking on auto complete items updating value
- [extend-text][feature] filtering out values that are already selected in the tags (#43)
- [extend-text][feature] added static data functionality (#25)
- [extend-text] added event handling for tab
- [extend-text][breaking] refactored event handling for blur to not selected value
- [extend-text][test] add test for setting default tag values (#42)
- [extend-text][bug] integrate with form system (#41)
- [extend-text][feature] refactored extend text to work with form system (#41)
- [extend-text][feature] added validation to extend text
- [validator-mixin][feature] added support for configuration value property
- [extend-text][feature] removed new indicator
- [bug][forms] fixed bug where form reset was not using proper value when validating inputs that were set to validate on load (#39)
- [feature][forms] moved validator code out of form input mixin and into it's own mixin for better reuse
- [feature][date-picker] integrated the date picker's internal input validator to be accessible from the date picker component
- [bug][forms] fixed bug where resetting a form would not honor the validateOnLoad property
- [bug][forms] fixed bug where validaing form would not work on a component with a different value property than `value`
- [validator][breaking] refactored validation logic into its own more generic object (along with refactoring all form input components)
- [date-picker] fixed date picker's calendar display issue in IE
- [forms] fixed IE issue with setting placeholder font size
- fixed warning with using the type property in the test helper
- [calendar] removed static style in calendar component
- [forms] moved validation stuff from form input components to form input mixin
- [forms] refactored from input generation to use a configuration object
- [forms] updated form validation to allow for error messages
- [forms] updated form validation to allow for multiple validators (#37)
- centralized form input component validation tests
- [date-picker] fixed bug with use date picker within new form system (#35)
- [forms] cleaned up setting values for form input components (#34)
- [forms] validation now runs when showing validation on loading (#33)
- [date-picker] fixed issue when calendar sould show up under some elements (#32)
- [forms] added `getInputs()` to form mixin for better form management
- [forms] fixed issue pulling inputs for some form mixin methods
- [forms] fixed `formMixin.onChangeFormInput()` to properly set value to correct form
- [forms] added form mixin tests to test a component with multiple forms
- [form] added form mixin
- [button] added passing through props for button component
- [svg-icon] refactored svg icon system (#28)
- [callout] added callout component (#24)
- [date-picker] input blurs when single panel close method is called (#27)
- [select-input] added missing empty option related select input tests (#23)
- [grid] fixed styling issue with flexbox based grid (#22)
- refactored mocking solution
- added ability to select dom component by prop value
- reformatted jsx code
- update eslint and add reacts eslint plugin
- [input-group] added back into input group component
- [form-on-change][breaking] removed form on change mixin
- major refactor of mocking solution
- updated gulp clean build task to remove coverage generated files
- [extend-text] fixed issue where blurring input would cause new indicator to show when it should not
- refactored date picker to be more mobile friendly
- assets rewrite add `/build/` to path with configurable option to add `/static/[SHA]/`
- added support for copying directory in copy static assets task
- added support for #... in assets rewrite regex
- renamed gulp task `static-rewrite` to `assets-rewrite`
- added ability to use `process.env.NODE_ENV` technique to wrap debug code for application code
- added `process.env.NODE_ENV` to production build to strip dev code from libraries (like react)
- performance improvements
- clicking prepend/append elements for textbox now focuses input
- switched calendar trigger event for date picker from click to focus
- added test for date picker to improvement code coverage
- added helper methods for spying on react event handlers
- date picker now uses an icon in the append of textbox input
- made the prepend/append elements for the textbox input more flexible
- added ability to add static data before/after input that is attached to the input (#21)

## 0.4.0

- added calendar commponent
- added date picker component
- added single panel mixin
- added ability to pass false for empty option for select input to have no empty option
- moved custom class generation to the cell data element for flex cell
- added ability to configure whether or not to show gutter for flex row
- added button component
- added support for having arrow on card content and on the top of the header
- added card component (#15)
- made styling to work in a more small (mobile) first kinda of way
- added ability to align flex cells horizontally
- removed jshint in favor of eslint
- added suport for className property for flex row and cells
- removed deprecated jshint options (prep for adding JSCS)
- refactored structure of components/mixins
- removed input group component (flex row/column provide a generic solution)
- added flexbox based grid system (with associated components)
- cleaned up break point/media query variables
- refactored code structure
- added tagging support to extend text
- added input auto sizer component
- integrated input auto sizer components with extend text component
- added form styling
- added form input mixin
- added text box (with password and textarea support) component
- added checkbox component
- added radio component
- added select component
- added form input mixin
- added for on change mixin
- refactored jshint to work better with JSX with a bunch of ignore statements
- integrated input auto sizer components with extend text component
- added input auto sizer component
- refactored code structure
- added tagging feature to extend text component
- made gulp i18n task use local messageformat instead of relying on globally installed one
- fixed bug with extend text clearing value even if the value was in the auto complete list
- fixed issue with properly setting the height of textarea
- refactored single panel store to not use fluxe
- added ability to render centered content on top of overlay (#1)
- added style property support for all relevant components (#2)
- boolean type properties now auto set valid values to true and false (#3)
- added pagination component
- added progress bar component
- reverted node module changes (remove shrinkwrap stuff and added node_modules folder back to ignore list)
- added button component (css only component)
- added badge component
- added overlay component
- refactored code (documentation, test, minor tweaks)

## 0.1.0

- refactored dom helper and textarea auto height component into general purpose 3rd party library
- added jshint ignore statements for JSX code
- removed KoaJS code
- coverted generator use to now use fibers to support node v0.10.+ (v0.10.33 tested)
- added custom script for running complexity stats on JS/JSX code
- added ability to specific specific assets for copy static assets gulp task
- added custom script for running mocha tests and generating code coverage stats for JS/JSX code
- added npm shrinkwrap file
- built out more style guide page components
- added code to string helper page for creating code example strings
- general code cleanup

## 0.0.2

- updated package configuration

## 0.0.1

- initial commit
