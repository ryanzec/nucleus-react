# Change Log

There are some key used within the changelog which are as following:

- [bug]: means a bug fix
- [feature]: means a new fea- ture
- [breaking]: mean there is a change that might break existing code
- [X]: anything else within brackets say what component that change is related t- o

## master

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
- [form-on-change][breaking] removed form on change mixing
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
