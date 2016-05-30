import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

import PopoverContainer from '../../../../assets/components/popover-container.component.jsx';
import PopoverHandle from '../../../../assets/components/popover-handle.component.jsx';
import Popover from '../../../../assets/components/popover.component.jsx';
import Tooltip from '../../../../assets/components/tooltip.component.jsx';
import DropDownMenu from '../../../../assets/components/drop-down-menu.component.jsx';
import DropDownMenuItem from '../../../../assets/components/drop-down-menu-item.component.jsx';
import DropDownMenuHeader from '../../../../assets/components/drop-down-menu-header.component.jsx';
import DropDownMenuDivider from '../../../../assets/components/drop-down-menu-divider.component.jsx';

class PopoversPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      isActive2: false,
      isActiveDD: false
    };

    this.onClickPopover = this.onClickPopover.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClickPopoverDD = this.onClickPopoverDD.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onClickOutsideDD = this.onClickOutsideDD.bind(this);
  }

  onClickPopover() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  onClickOutside() {
    this.setState({
      isActive: false
    });
  }

  onMouseOver() {
    this.setState({
      isActive2: true
    });
  }

  onMouseOut() {
    this.setState({
      isActive2: false
    });
  }

  onClickPopoverDD() {
    this.setState({
      isActiveDD: !this.state.isActiveDD
    });
  }

  onClickOutsideDD() {
    this.setState({
      isActiveDD: false
    });
  }

  renderPopover() {
    return (
      <PopoverContainer
        isActive={this.state.isActive}
        attachment="top left"
      >
        <PopoverHandle onClick={this.onClickPopover}>handle</PopoverHandle>
        <Popover>content</Popover>
      </PopoverContainer>
    );
  }

  renderPopover2() {
    return (
      <PopoverContainer isActive={this.state.isActive2}>
        <PopoverHandle onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>be</PopoverHandle>
        <Tooltip>content2</Tooltip>
      </PopoverContainer>
    );
  }

  renderPopoverDD() {
    return (
      <PopoverContainer
        attachment="top left"
        targetAttachment="bottom left"
         isActive={this.state.isActiveDD}
        onClickOutside={this.onClickOutsideDD}
      >
        <PopoverHandle onClick={this.onClickPopoverDD}>drop down</PopoverHandle>
        <DropDownMenu>
          <DropDownMenuHeader>Welcome John Doe</DropDownMenuHeader>
          <DropDownMenuDivider />
          <DropDownMenuItem>Your profile</DropDownMenuItem>
          <DropDownMenuItem>Explore</DropDownMenuItem>
          <DropDownMenuItem>Intergerations</DropDownMenuItem>
          <DropDownMenuItem>Help</DropDownMenuItem>
          <DropDownMenuDivider />
          <DropDownMenuItem>Settings</DropDownMenuItem>
          <DropDownMenuItem>Log out</DropDownMenuItem>
        </DropDownMenu>
      </PopoverContainer>
    );
  }

  render() {
    return (
      <div className="p-style-guide-popovers">
        <h1>Popovers</h1>
        <div>
          Ideally the popover {this.renderPopover()} should be able to {this.renderPopover2()} placed anywhere
        </div>
        <br /><br /><br /><br /><br />
        <div>
          A popover can be a {this.renderPopoverDD()}, it just have specific styling.
        </div>
      </div>
    );
  }
}

PopoversPage.displayName = 'PopoversPage';

PopoversPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PopoversPage;
