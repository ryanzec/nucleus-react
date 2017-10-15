import PropTypes from 'prop-types';
import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './assets/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles'), 'utf8');

import Accordion from '../../../../src/components/accordion/Accordion';
import AccordionItem from '../../../../src/components/accordion/AccordionItem';
import AccordionItemHeader from '../../../../src/components/accordion/AccordionItemHeader';
import AccordionItemContent from '../../../../src/components/accordion/AccordionItemContent';

class AccordionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeAccordionItem: 0,
    };
  }

  onClickAccordionHeader = (event) => {
    this.setState({
      activeAccordionItem: parseInt(event.currentTarget.getAttribute('data-key'), 10),
    });
  }

  render() {
    return (
      <div className="p-style-guide-accordion">
        <h1>Accordion</h1>
        <h2>Basic</h2>
        <Accordion>
          <AccordionItem isActive={this.state.activeAccordionItem === 0}>
            <AccordionItemHeader data-key={0} onClick={this.onClickAccordionHeader} isActive={this.state.activeAccordionItem === 0}>Section 1</AccordionItemHeader>
            <AccordionItemContent>This<br />is<br />content<br />for<br />section<br />one.</AccordionItemContent>
          </AccordionItem>
          <AccordionItem isActive={this.state.activeAccordionItem === 1}>
            <AccordionItemHeader data-key={1} onClick={this.onClickAccordionHeader} isActive={this.state.activeAccordionItem === 1}>Section 2</AccordionItemHeader>
            <AccordionItemContent>This<br />is<br />content<br />for<br />section<br />two.</AccordionItemContent>
          </AccordionItem>
          <AccordionItem isActive={this.state.activeAccordionItem === 2}>
            <AccordionItemHeader data-key={2} onClick={this.onClickAccordionHeader} isActive={this.state.activeAccordionItem === 2}>Section 3</AccordionItemHeader>
            <AccordionItemContent>This<br />is<br />content<br />for<br />section<br />three.</AccordionItemContent>
          </AccordionItem>
          <AccordionItem isActive={this.state.activeAccordionItem === 3}>
            <AccordionItemHeader data-key={3} onClick={this.onClickAccordionHeader} isActive={this.state.activeAccordionItem === 3}>Section 4</AccordionItemHeader>
            <AccordionItemContent>This<br />is<br />content<br />for<br />section<br />four.</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

AccordionPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AccordionPage;
