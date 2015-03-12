# Change Log

## master

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
