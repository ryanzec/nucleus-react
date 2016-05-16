import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import Pagination from '../../../../assets/components/pagination.component.jsx';
import PaginationItem from '../../../../assets/components/pagination-item.component.jsx';
import PaginationLink from '../../../../assets/components/pagination-link.component.jsx';
import Pager from '../../../../assets/components/pager.component.jsx';

class PaginationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-pagination">
        <h1 className="test">Pagination</h1>
        <h4>Default</h4>
        <Pagination>
          <PaginationItem>
            <PaginationLink>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <h4>Disabled / Active</h4>
        <Pagination>
          <PaginationItem isDisabled={true}>
            <PaginationLink>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem isActive={true}>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <h4>Size</h4>
        <Pagination size="lg">
          <PaginationItem>
            <PaginationLink>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <Pagination size="sm">
          <PaginationItem>
            <PaginationLink>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <h4>Pager</h4>
        <Pager />
        <Pager align={true} />
        <Pager align={true} disablePrevious={true} disableNext={true} />
      </div>
    );
  }
}

PaginationPage.displayName = 'PaginationPage';

PaginationPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PaginationPage;
