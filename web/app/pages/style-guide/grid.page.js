import React from 'react';

import CodeExample from '../../react/components/code-example';

import Grid from '../../../../src/components/grid';
import GridRow from '../../../../src/components/grid-row';
import GridColumn from '../../../../src/components/grid-column';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

class GridPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-grid">
        <h1>Grid</h1>
        <h4>Default</h4>
        <Grid>
          <GridRow>
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Shrink</h4>
        <Grid>
          <GridRow>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Order</h4>
        <Grid>
          <GridRow>
            <GridColumn order={2}>1 (order 2)</GridColumn>
            <GridColumn order={4} shrink={true}>2 (order 4)</GridColumn>
            <GridColumn order={3}>3 (order 3)</GridColumn>
            <GridColumn order={1}>4 (order 1)</GridColumn>
          </GridRow>
        </Grid>
        <h4>One tall example</h4>
        <Grid>
          <GridRow>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn><p>3</p><p>make</p><p>me</p><p>tall</p><p>again</p></GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <Grid>
          <GridRow isStretched={false}>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn><p>3</p><p>make</p><p>me</p><p>tall</p><p>again</p></GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Vertical</h4>
        <Grid>
          <GridRow isVertical={true}>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Wrapping</h4>
        <Grid className="wrapping-test">
          <GridRow canWrap={true}>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Max grid width (just apply max-width to grid element)</h4>
        <Grid className="max-width-test">
          <GridRow canWrap={true}>
            <GridColumn>1</GridColumn>
            <GridColumn shrink={true}>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Alignments</h4>
        <Grid className="align-opposite">
          <GridRow>
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <Grid className="align-opposite">
          <GridRow alignment="center">
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <Grid className="align-opposite">
          <GridRow alignment="right">
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <Grid className="align-opposite">
          <GridRow alignment="spaced">
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <Grid className="align-opposite">
          <GridRow alignment="justify">
            <GridColumn>1</GridColumn>
            <GridColumn>2</GridColumn>
            <GridColumn>3</GridColumn>
            <GridColumn>4</GridColumn>
          </GridRow>
        </Grid>
        <h4>Responsive</h4>
        <Grid>
          <GridRow>
            <GridColumn smallSize={6} mediumSize={8} largeSize={6} extraLargeSize={4}>6/8/6/4</GridColumn>
            <GridColumn smallSize={6} mediumSize={4} largeSize={6} extraLargeSize={8}>6/4/6/8</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
          </GridRow>
        </Grid>
        <h4>Offsets</h4>
        <Grid>
          <GridRow>
            <GridColumn smallSize={6} mediumSize={8} largeSize={6} extraLargeSize={4}>6/8/6/4</GridColumn>
            <GridColumn smallSize={6} mediumSize={4} largeSize={6} extraLargeSize={8}>6/4/6/8</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={6} smallOffset={6} mediumSize={4} mediumOffset={8} largeSize={6} largeOffset={6} extraLargeSize={8} extraLargeOffset={4}>6/4/6/8</GridColumn>
          </GridRow>
        </Grid>
        <Grid>
          <GridRow>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn mediumSize={3} mediumOffset={3} largeSize={4} largeOffset={2} extraLargeSize={2} extraLargeOffset={4}>3/4/2</GridColumn>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
          </GridRow>
        </Grid>
        <p>NOTE: Offsets only work with left / right row alignments</p>
        <Grid>
          <GridRow alignment="right">
            <GridColumn smallSize={6} mediumSize={8} largeSize={6} extraLargeSize={4}>6/8/6/4</GridColumn>
            <GridColumn smallSize={6} mediumSize={4} largeSize={6} extraLargeSize={8}>6/4/6/8</GridColumn>
          </GridRow>
          <GridRow alignment="right">
            <GridColumn smallSize={6} smallOffset={6} mediumSize={4} mediumOffset={4} largeSize={6} largeOffset={6} extraLargeSize={4} extraLargeOffset={8}>6/4/6/4</GridColumn>
          </GridRow>
        </Grid>
        <Grid>
          <GridRow alignment="right">
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
          </GridRow>
          <GridRow alignment="right">
            <GridColumn mediumSize={3} largeSize={4} extraLargeSize={2}>3/4/2</GridColumn>
            <GridColumn mediumSize={3} largeSize={2} extraLargeSize={4}>3/2/4</GridColumn>
            <GridColumn mediumSize={3} mediumOffset={3} largeSize={2} largeOffset={4} extraLargeSize={2} extraLargeOffset={2}>3/2/2</GridColumn>
          </GridRow>
        </Grid>
      </div>
    );
  }
}

GridPage.displayName = 'GridPage';

GridPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default GridPage;
