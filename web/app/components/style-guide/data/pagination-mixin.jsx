var React = require('react/addons');

module.exports = {
    name: 'Pagination',
    type: 'mixin',
    overview: (
        <p>
            This mixin adds methods to your component useful in conjuction with the pagination component.
        </p>
    ),
    providedMethods: [{
        name: 'setPaginationPage',
        returnType: 'void',
        parameters: [{
            name: 'newPage',
            type: 'number'
        }],
        description: (
            <p>
                This method sets the state's <code>paginationCurrentPage</code> value while making sure it does not go below 1 or above the <code>paginationTotalPages</code>.
            </p>
        )
    }]
};
