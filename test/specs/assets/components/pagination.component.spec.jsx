var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Pagination = require('../../../../assets/components/pagination.component.jsx');
var paginationMixin = require('../../../../assets/mixins/pagination.mixin');
var testHelper = require('../../../test-helper');
var reactTestUtils = React.addons.TestUtils;

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
      this.component = React.render(<Pagination setPage={testHelper.noop}/>, div);
      var pagination = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination');

      expect(pagination.props.className).to.equal('pagination');
    });

    it('should be able to add custom classes', function() {
      this.component = React.render(<Pagination
                                      className="m-safe"
                                      setPage={testHelper.noop} />, div);
      var pagination = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination');

      expect(pagination.props.className).to.equal('pagination m-safe');
    });

    it('should render navigation', function() {
      this.component = React.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      expect(navigation.length).to.equal(7);
    });

    it('should properly mark active page navigation', function() {
      this.component = React.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var activeNavigation = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'is-active');

      expect(activeNavigation.props.children).to.equal(5);
    });

    it('should render both ellipses when current page falls within correct range', function() {
      this.component = React.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.props.children[2].props.className).to.equal('pagination__ellipse');
      expect(pages.props.children[pages.props.children.length - 3].props.className).to.equal('pagination__ellipse');
    });

    it('should only render first ellipse when current page is high enough', function() {
      this.component = React.render(<Pagination
                                      currentPage={12}
                                      totalPages={20}
                                      pagesToShow={15}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.props.children[2].props.children).to.equal('...');
      expect(pages.props.children[pages.props.children.length - 3].props.children).to.equal(19);
    });

    it('should only render last ellipse when current page is low enough', function() {
      this.component = React.render(<Pagination
                                      currentPage={3}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.props.children[2].props.children).to.equal(2);
      expect(pages.props.children[pages.props.children.length - 3].props.children).to.equal('...');
    });

    /* bug case */
    it('properly render pages when current page is at 1', function() {
      this.component = React.render(<Pagination
                                      currentPage={1}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.props.children.length).to.equal(7);
      expect(pages.props.children[0].props.children).is.a.object;
      expect(pages.props.children[1].props.children).to.equal(1);
      expect(pages.props.children[2].props.children).to.equal(2);
      expect(pages.props.children[3].props.children).to.equal(3);
      expect(pages.props.children[4].props.children).to.equal('...');
      expect(pages.props.children[5].props.children).to.equal(20);
      expect(pages.props.children[6].props.children).is.a.object;
    });

    it('should render show number of pages when active of the last page', function() {
      this.component = React.render(<Pagination
                                      currentPage={20}
                                      totalPages={20}
                                      setPage={testHelper.noop} />, div);
      var pages = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'pagination__pages');

      expect(pages.props.children.length).to.equal(7);
      expect(pages.props.children[0].props.children).is.a.object;
      expect(pages.props.children[1].props.children).to.equal(1);
      expect(pages.props.children[2].props.children).to.equal('...');
      expect(pages.props.children[3].props.children).to.equal(18);
      expect(pages.props.children[4].props.children).to.equal(19);
      expect(pages.props.children[5].props.children).to.equal(20);
      expect(pages.props.children[6].props.children).is.a.object;
    });

    it('should render be able to set pages to show between the ends', function() {
      this.component = React.render(<Pagination
                                      currentPage={5}
                                      totalPages={20}
                                      pagesToShow={5}
                                      setPage={testHelper.noop} />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      expect(navigation.length).to.equal(9);
      expect(reactTestUtils.scryRenderedDOMComponentsWithClass(navigation[0], 'svg-icon').length).to.equal(1);
      expect(navigation[1].props.children).to.equal(1);
      expect(navigation[2].props.children).to.equal(3);
      expect(navigation[3].props.children).to.equal(4);
      expect(navigation[4].props.children).to.equal(5);
      expect(navigation[5].props.children).to.equal(6);
      expect(navigation[6].props.children).to.equal(7);
      expect(navigation[7].props.children).to.equal(20);
      expect(reactTestUtils.scryRenderedDOMComponentsWithClass(navigation[8], 'svg-icon').length).to.equal(1);
    });
  });

  describe('navigation', function() {
    it('should switch current page when clicking a page number', function() {
      this.component = React.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[7]);

      expect(this.component.state.paginationCurrentPage).to.equal(20);
    });

    it('should switch to the next page when clicking next', function() {
      this.component = React.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[8]);

      expect(this.component.state.paginationCurrentPage).to.equal(6);
    });

    it('should switch the previous page when clicking previous', function(){
      this.component = React.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[0]);

      expect(this.component.state.paginationCurrentPage).to.equal(4);
    });

    it('should keep current page when clicking previous and on first page', function() {
      this.component = React.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[1]);
      reactTestUtils.Simulate.click(navigation[0]);

      expect(this.component.state.paginationCurrentPage).to.equal(1);
    });

    it('should keep current page when clicking next and on the last page', function() {
      this.component = React.render(<TestComponent />, div);
      var navigation = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'pagination__navigation');

      reactTestUtils.Simulate.click(navigation[7]);
      reactTestUtils.Simulate.click(navigation[8]);

      expect(this.component.state.paginationCurrentPage).to.equal(20);
    });
  });
});
