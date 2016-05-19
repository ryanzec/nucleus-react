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

import { readFileSync } from 'fs';
import { join } from 'path';

import Code from '../../../../assets/components/code.component.jsx';

import StylesExample from './assets/examples/buttons/styles.jsx';
import OutlinesExample from './assets/examples/buttons/outlines.jsx';
import SizesExample from './assets/examples/buttons/sizes.jsx';
import BlockExample from './assets/examples/buttons/block.jsx';
import ActiveStatesExample from './assets/examples/buttons/active-states.jsx';
import DisabledStatesExample from './assets/examples/buttons/disabled-states.jsx';
import GroupsExample from './assets/examples/buttons/groups.jsx';
import GroupSizesExample from './assets/examples/buttons/group-sizes.jsx';
import ToolbarExample from './assets/examples/buttons/toolbar.jsx';
import VerticalExample from './assets/examples/buttons/vertical.jsx';

let stylesExampleContent = readFileSync(join(__dirname, 'assets/examples/buttons/styles.jsx'), 'utf8');

import CodeExample from '../../react/components/code-example.component.jsx';

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Test = StylesExample;
    return (
      <div className="p-style-guide-buttons">
        <h1 className="test">Buttons</h1>
        <p>Buttons are used to trigger action by the user.</p>
        <h4>Styles</h4>
        <CodeExample
          exampleComponent={StylesExample}
          codeContent={stylesExampleContent}
        />
        <h4>Outline</h4>
        <OutlinesExample />
        <h4>Sizes</h4>
        <SizesExample />
        <h4>Block</h4>
        <BlockExample />
        <h4>Active State</h4>
        <ActiveStatesExample />
        <h4>Disabled State</h4>
        <DisabledStatesExample />
        <h4>Group</h4>
        <GroupsExample />
        <h4>Group Sizes</h4>
        <GroupSizesExample />
        <h4>Toolbar</h4>
        <ToolbarExample />
        <h4>Vertical</h4>
        <VerticalExample />
      </div>
    );
  }
}

ButtonsPage.displayName = 'ButtonsPage';

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
