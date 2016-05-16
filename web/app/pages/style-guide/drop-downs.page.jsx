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

import DropDown from '../../../../assets/components/drop-down.component.jsx';
import DropDownButtonToggle from '../../../../assets/components/drop-down-button-toggle.component.jsx';
import DropDownMenu from '../../../../assets/components/drop-down-menu.component.jsx';
import DropDownMenuItem from '../../../../assets/components/drop-down-menu-item.component.jsx';
import DropDownMenuHeader from '../../../../assets/components/drop-down-menu-header.component.jsx';
import DropDownMenuDivider from '../../../../assets/components/drop-down-menu-divider.component.jsx';

class ButtonPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDown1IsActive: false,
      dropDown2IsActive: false,
      dropDown3IsActive: false,
      dropDown4IsActive: false,
      dropDown5IsActive: false,
      dropDown6IsActive: false,
      dropDown7IsActive: false,
      dropDown8IsActive: false
    };

    this.onClickDropDown1Toggle = this.onClickDropDown1Toggle.bind(this);
    this.onClickDropDown2Toggle = this.onClickDropDown2Toggle.bind(this);
    this.onClickDropDown3Toggle = this.onClickDropDown3Toggle.bind(this);
    this.onClickDropDown4Toggle = this.onClickDropDown4Toggle.bind(this);
    this.onClickDropDown5Toggle = this.onClickDropDown5Toggle.bind(this);
    this.onClickDropDown6Toggle = this.onClickDropDown6Toggle.bind(this);
    this.onClickDropDown7Toggle = this.onClickDropDown7Toggle.bind(this);
    this.onClickDropDown8Toggle = this.onClickDropDown8Toggle.bind(this);
    this.onClickDropDown1Outside = this.onClickDropDown1Outside.bind(this);
    this.onClickDropDown2Outside = this.onClickDropDown2Outside.bind(this);
    this.onClickDropDown3Outside = this.onClickDropDown3Outside.bind(this);
    this.onClickDropDown4Outside = this.onClickDropDown4Outside.bind(this);
    this.onClickDropDown5Outside = this.onClickDropDown5Outside.bind(this);
    this.onClickDropDown6Outside = this.onClickDropDown6Outside.bind(this);
    this.onClickDropDown7Outside = this.onClickDropDown7Outside.bind(this);
    this.onClickDropDown8Outside = this.onClickDropDown8Outside.bind(this);
  }

  onClickDropDown1Toggle() {
    this.setState({
      dropDown1IsActive: !this.state.dropDown1IsActive
    });
  }

  onClickDropDown2Toggle() {
    this.setState({
      dropDown2IsActive: !this.state.dropDown2IsActive
    });
  }

  onClickDropDown3Toggle() {
    this.setState({
      dropDown3IsActive: !this.state.dropDown3IsActive
    });
  }

  onClickDropDown4Toggle() {
    this.setState({
      dropDown4IsActive: !this.state.dropDown4IsActive
    });
  }

  onClickDropDown5Toggle() {
    this.setState({
      dropDown5IsActive: !this.state.dropDown5IsActive
    });
  }

  onClickDropDown6Toggle() {
    this.setState({
      dropDown6IsActive: !this.state.dropDown6IsActive
    });
  }

  onClickDropDown7Toggle() {
    this.setState({
      dropDown7IsActive: !this.state.dropDown7IsActive
    });
  }

  onClickDropDown8Toggle() {
    this.setState({
      dropDown8IsActive: !this.state.dropDown8IsActive
    });
  }

  onClickDropDown1Outside() {
    this.setState({
      dropDown1IsActive: false
    });
  }

  onClickDropDown2Outside() {
    this.setState({
      dropDown2IsActive: false
    });
  }

  onClickDropDown3Outside() {
    this.setState({
      dropDown3IsActive: false
    });
  }

  onClickDropDown4Outside() {
    this.setState({
      dropDown4IsActive: false
    });
  }

  onClickDropDown5Outside() {
    this.setState({
      dropDown5IsActive: false
    });
  }

  onClickDropDown6Outside() {
    this.setState({
      dropDown6IsActive: false
    });
  }

  onClickDropDown7Outside() {
    this.setState({
      dropDown7IsActive: false
    });
  }

  onClickDropDown8Outside() {
    this.setState({
      dropDown8IsActive: false
    });
  }

  render() {
    return (
      <div className="p-style-guide-drop-downs">
        <h1 className="test">Drop Downs</h1>
        <h4>Default</h4>
        <DropDown isActive={this.state.dropDown1IsActive} onClickOutside={this.onClickDropDown1Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown1Toggle}>
            Drop Down
          </DropDownButtonToggle>
          <DropDownMenu>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Right Aligned</h4>
        <DropDown isActive={this.state.dropDown2IsActive} onClickOutside={this.onClickDropDown2Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown2Toggle}>
            Drop Down Right Aligned
          </DropDownButtonToggle>
          <DropDownMenu align="right">
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Menu Header</h4>
        <DropDown isActive={this.state.dropDown3IsActive} onClickOutside={this.onClickDropDown3Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown3Toggle}>
            Drop Down Menu Header
          </DropDownButtonToggle>
          <DropDownMenu>
            <DropDownMenuHeader>Menu Header</DropDownMenuHeader>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Menu Divider</h4>
        <DropDown isActive={this.state.dropDown4IsActive} onClickOutside={this.onClickDropDown4Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown4Toggle}>
            Drop Down Menu Divider
          </DropDownButtonToggle>
          <DropDownMenu>
            <DropDownMenuHeader>Menu Header</DropDownMenuHeader>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
            <DropDownMenuDivider />
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Disabled Menu Item</h4>
        <DropDown isActive={this.state.dropDown5IsActive} onClickOutside={this.onClickDropDown5Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown5Toggle}>
            Drop Down Disabled Items
          </DropDownButtonToggle>
          <DropDownMenu>
            <DropDownMenuHeader>Menu Header</DropDownMenuHeader>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem isDisabled={true}>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
            <DropDownMenuDivider />
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Button Styles</h4>
        <DropDown isActive={this.state.dropDown6IsActive} onClickOutside={this.onClickDropDown6Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown6Toggle} styleType="success" isOutline={true} size="lg">
            Drop Down Success Style
          </DropDownButtonToggle>
          <DropDownMenu>
            <DropDownMenuHeader>Menu Header</DropDownMenuHeader>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem isDisabled={true}>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
            <DropDownMenuDivider />
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <DropDown isActive={this.state.dropDown7IsActive} onClickOutside={this.onClickDropDown7Outside}>
          <DropDownButtonToggle onClick={this.onClickDropDown7Toggle} styleType="primary" size="sm">
            Drop Down Primary Style
          </DropDownButtonToggle>
          <DropDownMenu align="right">
            <DropDownMenuHeader>Menu Header</DropDownMenuHeader>
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem isDisabled={true}>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
            <DropDownMenuDivider />
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
        <h4>Right Aligned Top</h4>
        <DropDown isActive={this.state.dropDown8IsActive} onClickOutside={this.onClickDropDown8Outside} align="top">
          <DropDownButtonToggle onClick={this.onClickDropDown8Toggle}>
            Drop Down Right Aligned
          </DropDownButtonToggle>
          <DropDownMenu align="right">
            <DropDownMenuItem>Action</DropDownMenuItem>
            <DropDownMenuItem>Another action</DropDownMenuItem>
            <DropDownMenuItem>Something else here</DropDownMenuItem>
          </DropDownMenu>
        </DropDown>
      </div>
    );
  }
}

ButtonPage.displayName = 'ButtonPage';

ButtonPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonPage;
