require('string.format');

import CoreComponent from '../../core-component';

class HeaderComponent extends CoreComponent {
  constructor(baseSelector) {
    super(baseSelector);

    this.addSelectors({
      menuLinks: 'a',
      menuLink: 'li:nth-child({0}) a'
    });
  }

  //actions
  clickMenuItem(index) {
    browser.waitClick(this.getSelector('menuLink').format(index + 1));
  }

  //assertions
  menuItemsAreRendered(linksData) {
    let items = browser.waitElements(this.getSelector('menuLinks'));

    expect(items.value.length).to.equal(linksData.length);

    let count = linksData.length;

    for (let x = 0; x < count; x += 1) {
      expect(browser.waitIsVisible(this.getSelector('menuLink').format([x + 1]))).to.be.true;
      expect(browser.waitGetText(this.getSelector('menuLink').format([x + 1]))).to.equal(linksData[x].textContent);
      expect(browser.waitGetAttribute(this.getSelector('menuLink').format([x + 1]), 'href')).to.equal(linksData[x].href);
    }
  }
}

export default HeaderComponent;
