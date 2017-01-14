# Change Log

There are some key used within the changelog which are as following:

- [BREAKING]: means there is a change that is known to break existing code

# IN PROGRESS

- added ability to define custom tag renderer for the extend text component #169
- fixed bug with extend text showing "search" text instead of "no options" text when async returns no data #166
- fixed issue with allow create not working for extend texts given a static set of options that are empty #168
- fixed issue with clicking popover handle trigger the on click outside event of the popover itself
- fixed issue with popover and weird rendering issue when mouseenter / mouseleave event (like a tooltip) #167
- refactored demo application side navigation menu to use new expandable list component
- refactor standard html header styling
- added expandable list component
- added list components
- refactored general demo application styling
- refactored colors (mostly based off of https://vmware.github.io/clarity/documentation/color)
- added tab components
- added custom assets rewrite plugin for webpack
- updated all libraries and related changes
- added auto centering to the modal component
- added showcase for svg map example (based on https://blog.komand.com/building-svg-maps-with-react)
- added shwocase for algorithm work (with 3 algorithms)
- fixed issue with modal auto content sizing
- added basic default table styling
- refactored overlay css to allow for easier centering of top content
- added showcase example for dynamically loading components for a page
- fixed issue with drag and drop not working for components that use the AppendBodyComponent base class
- fixed issue with the default styling of buttons
- fixed some mobile issues with the modal component
- removed element highlighting support from wizard component
- added wizard step indicator
- refactor modal styling to support smaller screens better
- added support for dynamic heights for the modal component
- added drag and drop file upload component #158
- added support for min / max dates for date picker #152
- added thin form for buttons
- added pill form for buttons
- notification additions and updates to support the application notifications sub system
- added form date picker component with support for selecting a single date #147
- incorporated airbnb eslint (with some minor custom tweaks)
- updated src code to pass eslint configurations
- added utilities to managing auto incrementing id
- added support to bind click event for the negative and position notification actions
- added basic notification container with very basic example (example needs more flushing out)

## 0.9.0

- added extend text components with support for auto complete and tagging #116
- added popover function included support for styling in the form of tooltip, popover, and drop down menu #131
- added badge components #126
- added breadcrumbs components #117
- added notification components #129
- added progress bar components #132
- added modal components #128
- added button components #118
- added card components #119
- added css media queries #121
- added grid components #125
- some minor infrastructure updates
- added code components #137
- added svg icon components #133
- added overlay components #130

## 0.8.0

- [BREAKING] Another major re-write.  The Bootstrap re-write was just an experiment and decided I did not want to go that route with this framework so more re-writes of components that will continue using custom styling.

## 0.7.0

- [BREAKING] Complete re-write of pretty much everything

This release is almost a complete re-write of all the components and the introduction of 3rd party components. The base styling of the most of the components is using Bootstrap v4 alpha 2. All the components that use the bootstrap styling are custom built. Other 3rd party components that are use are react-tether, react-datepicker, and react-select.

## 0.6.0
- refactored out validation based local logic out of input component and converted them to properties that are passed in from the outside
- added framework for new documentation system (only some components are documented)
- upgrade prism code to include support for react syntax
- misc style tweaks
- [code] added support for inline display
- [drop-down] added ability to keep active when clicking outside of the component
- [extend-text] added readOnly property
- [textbox-input] added unmanaged property
- [textbox-input] removed maskValue property in favor of using type property
- [extend-text] converted to use single panel mixin to prevent closing issues when clicking on scrollbar in windows
- [calendar] added ability for month / year selection
- [calendar] switch month / year selection to use extend text component
- [calendar] made default to current date configurable
- [date-picker] added ability for month / year selection
- [extend-text] made auto selecting auto complete item configurable
- [extend-text] fixed bug with dealing with not string static data values
- [extend-text] no longer select highlighted item if you click outside of the input / auto complete list
- [input auto-sizer] fixed text sifting issue in IE 10+
- [forms] added ability to reset form with override reset data
- [extend-text] fixed bug where free form value was being removed from the auto complete if typing during the retrieval of remote data
- [forms] removed validation icon
- [forms] added for validation messages components (using in select input, textbox input, and extend-text components)
- [extend-text] fixed bug where selecting a value before the get data was trigger from timeout was not properly clearing that timeout
- [extend-text] added pure render mixin to increase performance
- [validator] added ability to modify options after creation
- [validator] added option to be able to disable validator
- [form] fixed issue with components properly updating after updating one of its properties
- [validator-mixin] fixed bug where validator was not updating if it properties changed
- [forms] added support for modifying input properties after creation
- [forms] added support for validating a specific field
- [extend-text] fixed issue with it validating on load incorrectly
- [checkbox-input] support for svg icons
- [radio-input] added support for svg icon
- [forms] refactored however validators are called
- [date-picker] fixed however validator was being called
- [date-picker] added support for disabled prop
- [validator] added ability to allow empty value even if there are validators
- [calendar] fixed prop type typo
- [extend-text] added ability to set custom classes for tags (#95)
- [confirmation-modal] centered buttons
- [confirmation-modal] added disableButtons prop
- [extend-text] fixed bug where auto complete would show iwth not option after attempting to select value that was already selected (#94)
- [extend-text] remove filtering selected values with remote data (#93)
- fixed broken tests

## 0.5.0
- [forms] added validator collection into form system (#84)
- [loading-bar] added loading bar for site loading indicator (#83)
- [forms] added support for input group to align items with flex-start (#88)
- [input-auto-sizer] fixed issue where rendered in hidden element does not work properly (#89)
- [forms] added support for inline radio groups (#91)
- [forms] added m-[TYPE] class to for form elements (#90)
- [extend-text] added options to configure allowing duplicate tags (#85)
- [extend-text] add new indicator display (#87)
- [modal] added class list shim to test enviroment to fix modal tests (#86)
- [character-counter] properly works when the default value is undefined or null
- [svg-icon] added fragment name as class name for easier styling customization
- [core] added some utilitiy classes
- [confirmation-modal] added confirmation modal component
- [date-picker] made display on input configurable (#80)
- [modal][forms][bug] fixed issue with form inputs and modal window not working in IE (#82)
- removed single panel manager store
- added notification components
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
