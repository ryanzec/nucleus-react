# Nucleus React

## What / Why

This is a framework of components built from the ground up for ReactJS. This framework is specifically designed for building web application and is probably overkill if you just want to build a samller site. While there are a number of 3rd party libraries (and I try to use 3rd party library when I feel I can), most of the visual components / styling is completely custom built.

I did attempt to use bootstrap as a foundational piece and then tie togother other libraries to create this framework (and got a basic version of that working) however there were a number of reasons why I decided to not continue with that path.

For one, I don't want to have first class mobile support. In order to have better than average mobile support for other projects in the past, I had to make compromises between a great mobile experience and a great desktop experience and I don't like doing that. This framework in intended to be used for complex web applications and I feel if you want to support both desktop and mobile at a high level, you should build for both platforms independently (I would recommend looking at React Native for mobile application development). This framework should have ok mobile support but things will not be perfect and if there are browser bugs, then things might be very bad / not work at all.

Another reason is that I want to fully embrace Flex Box.  While Bootstrap does support Flex Box a little, it is not something that is used everywhere. Even with Flex Box turned on, there are still a bunch of elements that are floated or positioned absolutely where with Flex Box, if would be easier for me do it. Building the styling all from scratch will allow this framework to take full advantage of Flex Box.

With those things in mind, I decided to go the mostly custom route (still using 3rd party libraries where it makes sense like with using the Tether library).

## Docs

The `/web` directory in this repository is where all examples and documentation is going to be stored, more information about running it locally will be provided some time in the future but you can always browse the code until then.

## Browser Support

This framework will offically support the latest versions of Chrome, Firefox, Safari, and Microsoft Edge. IE 10 / 11 might work however testing will not be done against those against those browsers.

### Mobile Support

This framework is going to have limited mobile support. It will include a responsive design so most things should look ok on mobile however certain functionality might not be great or work at all.  This will mainly be functionality that is related to browser bugs. For example, modal windows will probably not work very well on iOS Safari becuase of this bug (https://bugs.webkit.org/show_bug.cgi?id=153852). While it is possible to do certain things that I would consider hacky to make it work a little better in iOS Safari, it would have an impact on the desktop experience and that is something this framework will not do. The framework will try it's best to make sure mobile is usable but it is not a top priority.

# License

MIT

# MORE TO COME SOON
