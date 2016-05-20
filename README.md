**NOTE: This rewrite is an experiment. This rewrite was done because the initial interation of this framework was done and I was going to be starting from scratch anyways and I needed bootstrap 4 components for other stuff I was doing that was moving to a bootstrap based styling so figure I would take a weekend and do this and use it as a starting point for my other work. I can't say right now whether or not the bootstrap related code will remain in this framework, that will depend on a number of factors however it will probably be more clear towards the end of June at the latest.**

# Nucleus React

This is a collection of components that include:

- Custom components built with bootstrap 4 alpha 2 styling as a base
- react-tether for functionality like popovers and tooltips
- react-datepicker
- react-select

While these components are originally based off the bootstrap 4 styling, these components are not going to be designed to always be a 1 to 1 match for bootstrap components to react components. While I will continue to upgrade the bootstrap styles, I will also be making custom components when needed and other changes from bootstrap (for example, I have add the ability for a input-group-addon to be place at the top or bottom of an input and have / will not implement the nav bar).

# Notes

- This library depends on an implementation of [messageformat.js](https://github.com/SlexAxton/messageformat.js/) in order to support easy pluralization and multi-language by whatever code using this library

You need to make sure the consuming application also installs the following packages (working on updating the package.json more aproperaitely):

- react / react-dom (only tested against 0.14)
- tether (1.3.2)
- react-tether (0.5.1)
- react-datepicker (0.27.0)
- react-select (v1.0.0-beta13)
- bootstrap (4.0.0-alpha.2)

# License

MIT
