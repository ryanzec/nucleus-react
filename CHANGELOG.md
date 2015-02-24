# Change Log

## master

- made gulp i18n task use local messageformat instead of relying on globally installed one
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
