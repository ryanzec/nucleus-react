var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Pagination = require('../../../../assets/components/pagination.component.jsx');
var paginationMixin = require('../../../../assets/mixins/pagination.mixin');
var testHelper = require('../../../test-helper');
var reactTestUtils = require('react-addons-test-utils');

var TestComponent = React.createClass({
  mixins: [
    paginationMixin
  ],

  getInitialState: function() {
    return {
      paginationCurrentPage: 5,
      paginationTotalPages: 20,
      paginationPagesToShow: 5
    };
  },

  render: function() {
    return (
      <Pagination
        currentPage={this.state.paginationCurrentPage}
        totalPages={this.state.paginationTotalPages}
        pagesToShow={this.state.paginationPagesToShow}
        setPage={this.setPaginationPage} />
    );
  }
});

describe('pagination component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('basic functionally', function() {
    it('should render', function() {
      this.component = ReactDOM.render(<Pagination setPage={testHelper.noop}/>, div);
      var pagination = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination');

      expect(pagination.className).to.equal('pagination');
    });

    it('should be able to add custom classes', function() {
      this.component = ReactDOM.render(<Pagination
                                      className="m-safe"
                                      setPage={testHelper.noop} />, div);
      var pagination = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination');

      expect(pagination.className).to.equal('pagination m-safe');
    });

    it('should render navigation', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      expect(navigation.length).to.equal(7);
    });

    it('should properly mark active page navigation', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var activeNavigation = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'is-active');

      expect(activeNavigation.textContent).to.equal('5');
    });

    it('should render both ellipses when current page falls within correct range', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.childNodes[2].className).to.equal('pagination__ellipse');
      expect(pages.childNodes[pages.childNodes.length - 3].className).to.equal('pagination__ellipse');
    });

    it('should only render first ellipse when current page is high enough', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={12}
                                      totalPages={20}
                                      pagesToShow={15}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.childNodes[2].textContent).to.equal('...');
      expect(pages.childNodes[pages.childNodes.length - 3].textContent).to.equal('19');
    });

    it('should only render last ellipse when current page is low enough', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={3}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.childNodes[2].textContent).to.equal('2');
      expect(pages.childNodes[pages.childNodes.length - 3].textContent).to.equal('...');
    });

    /* bug case */
    it('properly render pages when current page is at 1', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={1}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.childNodes.length).to.equal(7);
      expect(pages.childNodes[0].textContent).is.a.object;
      expect(pages.childNodes[1].textContent).to.equal('1');
      expect(pages.childNodes[2].textContent).to.equal('2');
      expect(pages.childNodes[3].textContent).to.equal('3');
      expect(pages.childNodes[4].textContent).to.equal('...');
      expect(pages.childNodes[5].textContent).to.equal('20');
      expect(pages.childNodes[6].textContent).is.a.object;
    });

    it('should render show number of pages when active of the last page', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={20}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.childNodes.length).to.equal(7);
      expect(pages.childNodes[0].textContent).is.a.object;
      expect(pages.childNodes[1].textContent).to.equal('1');
      expect(pages.childNodes[2].textContent).to.equal('...');
      expect(pages.childNodes[3].textContent).to.equal('18');
      expect(pages.childNodes[4].textContent).to.equal('19');
      expect(pages.childNodes[5].textContent).to.equal('20');
      expect(pages.childNodes[6].textContent).is.a.object;
    });

    it('should render be able to set pages to show between the ends', function() {
      this.component = ReactDOM.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      pagesToShow={5}
                                      setPage={testHelper.noop} />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      expect(navigation.length).to.equal(9);
      expect(ReactDOM.findDOMNode(navigation[0]).querySelectorAll('.svg-icon').length).to.equal(1);
      expect(navigation[1].textContent).to.equal('1');
      expect(navigation[2].textContent).to.equal('3');
      expect(navigation[3].textContent).to.equal('4');
      expect(navigation[4].textContent).to.equal('5');
      expect(navigation[5].textContent).to.equal('6');
      expect(navigation[6].textContent).to.equal('7');
      expect(navigation[7].textContent).to.equal('20');
      expect(ReactDOM.findDOMNode(navigation[8]).querySelectorAll('.svg-icon').length).to.equal(1);
    });
  });

  describe('navigation', function() {
    it('should switch current page when clicking a page number', function() {
      this.component = ReactDOM.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[7]);

      expect(this.component.state.paginationCurrentPage).to.equal(20);
    });

    it('should switch to the next page when clicking next', function() {
      this.component = ReactDOM.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[8]);

      expect(this.component.state.paginationCurrentPage).to.equal(6);
    });

    it('should switch the previous page when clicking previous', function(){
      this.component = ReactDOM.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[0]);

      expect(this.component.state.paginationCurrentPage).to.equal(4);
    });

    it('should keep current page when clicking previous and on first page', function() {
      this.component = ReactDOM.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[1]);
      reactTestUtils.Simulate.click(navigation[0]);

      expect(this.component.state.paginationCurrentPage).to.equal(1);
    });

    it('should keep current page when clicking next and on the last page', function() {
      this.component = ReactDOM.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[7]);
      reactTestUtils.Simulate.click(navigation[8]);

      expect(this.component.state.paginationCurrentPage).to.equal(20);
    });
  });
});
