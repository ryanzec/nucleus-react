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

import GridContainer from '../../../../assets/components/grid-container.component.jsx';
import GridRow from '../../../../assets/components/grid-row.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';
import ClearFix from '../../../../assets/components/clear-fix.component.jsx';

class GridPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-grid">
        <h1 className="test">Grid</h1>
        <GridContainer>
          <GridRow>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
          </GridRow>
        </GridContainer>
        <GridContainer isFixed={true} className="fixed-container">
          <GridRow>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
            <GridColumn smallSize={4}>
              One of three columns
            </GridColumn>
          </GridRow>
        </GridContainer>
        <GridContainer>
          <GridRow>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
            <GridColumn mediumSize={1}>.col-md-1</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={8}>.col-md-8</GridColumn>
            <GridColumn mediumSize={4}>.col-md-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={4}>.col-md-4</GridColumn>
            <GridColumn mediumSize={4}>.col-md-4</GridColumn>
            <GridColumn mediumSize={4}>.col-md-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={6}>.col-md-6</GridColumn>
            <GridColumn mediumSize={6}>.col-md-6</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={12} mediumSize={8}>.col-xs-12 .col-md-8</GridColumn>
            <GridColumn extraSmallSize={6} mediumSize={4}>.col-xs-6 .col-md-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={6} mediumSize={4}>.col-xs-6 .col-md-4</GridColumn>
            <GridColumn extraSmallSize={6} mediumSize={4}>.col-xs-6 .col-md-4</GridColumn>
            <GridColumn extraSmallSize={6} mediumSize={4}>.col-xs-6 .col-md-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={6}>.col-xs-6</GridColumn>
            <GridColumn extraSmallSize={6}>.col-xs-6</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={12} smallSize={6} mediumSize={8}>.col-xs-12 .col-sm-6 .col-md-8</GridColumn>
            <GridColumn extraSmallSize={6} mediumSize={4}>.col-xs-6 .col-md-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={6} smallSize={4}>.col-xs-6 .col-sm-4</GridColumn>
            <GridColumn extraSmallSize={6} smallSize={4}>.col-xs-6 .col-sm-4</GridColumn>
            {/*Optional: clear the XS cols if their content doesn't match in height*/}
            <ClearFix className="hidden-sm-up" />
            <GridColumn extraSmallSize={6} smallSize={4}>.col-xs-6 .col-sm-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={9}>.col-xs-9</GridColumn>
            <GridColumn extraSmallSize={4}>.col-xs-4<br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</GridColumn>
            <GridColumn extraSmallSize={6}>.col-xs-6<br />Subsequent columns continue along the new line.</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn extraSmallSize={6} smallSize={3}>.col-xs-6 .col-sm-3</GridColumn>
            <GridColumn extraSmallSize={6} smallSize={3}>.col-xs-6 .col-sm-3</GridColumn>
            {/*Add the extra clearfix for only the required viewport*/}
            <ClearFix className="hidden-sm-up" />
            <GridColumn extraSmallSize={6} smallSize={3}>.col-xs-6 .col-sm-3</GridColumn>
            <GridColumn extraSmallSize={6} smallSize={3}>.col-xs-6 .col-sm-3</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={5} mediumSize={6}>.col-sm-5 .col-md-6</GridColumn>
            <GridColumn smallSize={5} smallOffset={2} mediumSize={6} mediumOffset={0}>.col-sm-5 .col-sm-offset-2 .col-md-6 .col-md-offset-0</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={6} mediumSize={5} largeSize={6}>.col-sm-6 .col-md-5 .col-lg-6</GridColumn>
            <GridColumn smallSize={6} mediumSize={5} mediumOffset={2} largeSize={6} largeOffset={0}>.col-sm-6 .col-md-5 .col-md-offset-2 .col-lg-6 .col-lg-offset-0</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={4}>.col-md-4</GridColumn>
            <GridColumn mediumSize={4} mediumOffset={4}>.col-md-4 .col-md-offset-4</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={3} mediumOffset={3}>.col-md-3 .col-md-offset-3</GridColumn>
            <GridColumn mediumSize={3} mediumOffset={3}>.col-md-3 .col-md-offset-3</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={6} mediumOffset={3}>.col-md-6 .col-md-offset-3</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={9}>
              Level 1: .col-sm-9
              <GridRow>
                <GridColumn extraSmallSize={8} smallSize={6}>
                  Level 2: .col-xs-8 .col-sm-6
                </GridColumn>
                <GridColumn extraSmallSize={4} smallSize={6}>
                  Level 2: .col-xs-4 .col-sm-6
                </GridColumn>
              </GridRow>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={9} mediumPush={3}>.col-md-9 .col-md-push-3</GridColumn>
            <GridColumn mediumSize={3} mediumPull={9}>.col-md-3 .col-md-pull-9</GridColumn>
          </GridRow>
        </GridContainer>
      </div>
    );
  }
}

GridPage.displayName = 'GridPage';

GridPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default GridPage;
