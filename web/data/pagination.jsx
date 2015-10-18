var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Pagination = nucleusReact.components.Pagination;
var paginationMixin = nucleusReact.mixins.pagination;
var _ = require('lodash');

var Example = React.createClass({
  mixins: [
    paginationMixin
  ],

  getInitialState: function() {
    return {
      random: null,
      paginationCurrentPage: 5,
      paginationTotalPages: 10,
      paginationPagesToShow: 3
    };
  },

  updateRandom: function() {
    this.setState({
      random: Math.random()
    });
  },

  increaseTotalPages: function() {
    this.setState({
      paginationTotalPages: this.state.paginationTotalPages + 1
    });
  },

  decreaseTotalPages: function() {
    this.setState({
      paginationTotalPages: this.state.paginationTotalPages - 1
    });
  },

  increasePagesToShow: function() {
    this.setState({
      paginationPagesToShow: this.state.paginationPagesToShow + 1
    });
  },

  decreasePagesToShow: function() {
    this.setState({
      paginationPagesToShow: this.state.paginationPagesToShow - 1
    });
  },

  render: function() {
    return (
      <span>
        <button onClick={this.updateRandom}>update random state prop</button>
        Total Pages
        <button onClick={this.decreaseTotalPages}>-</button>
        <button onClick={this.increaseTotalPages}>+</button>
        ({this.state.paginationTotalPages})<br /><br />
        # Of Pages In Middle:
        <button onClick={this.decreasePagesToShow}>-</button>
        <button onClick={this.increasePagesToShow}>+</button>
        ({this.state.paginationPagesToShow})<br /><br />
        <Pagination
          currentPage={this.state.paginationCurrentPage}
          totalPages={this.state.paginationTotalPages}
          pagesToShow={this.state.paginationPagesToShow}
          setPage={this.setPaginationPage} />
      </span>
    );
  }
});

module.exports = {
  name: 'Pagination',
  type: 'component',
  overview: (
    <p>
      Pagination component.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to pagination component.'
  }, {
    type: 'number',
    name: 'currentPage',
    defaultValue: '0',
    description: 'What the current page is.',
    required: true,
  }, {
    type: 'number',
    name: 'totalPages',
    defaultValue: '0',
    description: 'how many total pages can be shown.',
    required: true
  }, {
    type: 'number',
    name: 'pagesToShow',
    defaultValue: '3',
    description: 'How many pages number to show besides the first and last.'
  }, {
    type: 'function',
    name: 'setPage',
    defaultValue: 'null',
    description: 'A function when takes 1 parameter which is used to set the currentPage value.'
  }],
  examples: [{
    description: (
      <p>
        Interactive pagination demo.
      </p>
    ),
    example: (
      <Example />
    ),
    exampleString: 'var Example = React.createClass({\n\tmixins: [\n\t\tpaginationMixin\n\t],\n\n\tgetInitialState: function() {\n\t\treturn {\n\t\t\tpaginationCurrentPage: 5,\n\t\t\tpaginationTotalPages: 10,\n\t\t\tpaginationPagesToShow: 3\n\t\t};\n\t},\n\n\tincreaseTotalPages: function() {\n\t\tthis.setState({\n\t\t\tpaginationTotalPages: this.state.paginationTotalPages + 1\n\t\t});\n\t},\n\n\tdecreaseTotalPages: function() {\n\t\tthis.setState({\n\t\t\tpaginationTotalPages: this.state.paginationTotalPages - 1\n\t\t});\n\t},\n\n\tincreasePagesToShow: function() {\n\t\tthis.setState({\n\t\t\tpaginationPagesToShow: this.state.paginationPagesToShow + 1\n\t\t});\n\t},\n\n\tdecreasePagesToShow: function() {\n\t\tthis.setState({\n\t\t\tpaginationPagesToShow: this.state.paginationPagesToShow - 1\n\t\t});\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<span>\n\t\t\t\tTotal Pages\n\t\t\t\t<button onClick={this.decreaseTotalPages}>-</button>\n\t\t\t\t<button onClick={this.increaseTotalPages}>+</button>\n\t\t\t\t({this.state.paginationTotalPages})<br /><br />\n\t\t\t\t# Of Pages In Middle:\n\t\t\t\t<button onClick={this.decreasePagesToShow}>-</button>\n\t\t\t\t<button onClick={this.increasePagesToShow}>+</button>\n\t\t\t\t({this.state.paginationPagesToShow})<br /><br />\n\t\t\t\t<Pagination\n\t\t\t\t\tcurrentPage={this.state.paginationCurrentPage}\n\t\t\t\t\ttotalPages={this.state.paginationTotalPages}\n\t\t\t\t\tpagesToShow={this.state.paginationPagesToShow}\n\t\t\t\t\tsetPage={this.setPaginationPage} />\n\t\t\t</span>\n\t\t);\n\t}\n});\n\n//...\n\n<Example />'
  }]
};
