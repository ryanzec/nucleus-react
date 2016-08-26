import * as utilities from '../../../utilities';
import DesktopPage from '../../../objects/pages/desktop/desktop';

describe('desktop page', function() {
  it('should render desktop', function() {
    let page = new DesktopPage();

    utilities.url('/desktop');

    let header = page.getHeader();

    header.menuItemsAreRendered([{
      textContent: 'Desktop',
      href: testParameters.baseUrl + '/desktop'
    }, {
      textContent: 'Prevent Double Click',
      href: testParameters.baseUrl + '/prevent-double-click'
    }, {
      textContent: 'With Param',
      href: testParameters.baseUrl + '/with-param'
    }]);
    utilities.saveScreenshot('fu');
  });

  it('should get able to load user data', function() {
    let page = new DesktopPage();

    utilities.url('/desktop');

    page.userDataNotRendered();

    page.clickGetUser();

    page.userDataIsRendered({
      id: 123,
      username: 'test.user',
      firstName: 'Test',
      lastName: 'User'
    });
  });
});
