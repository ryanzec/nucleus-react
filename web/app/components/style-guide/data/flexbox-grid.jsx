var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var FlexRow = nucleusReact.components.FlexRow;
var FlexCell = nucleusReact.components.FlexCell;

module.exports = {
  name: 'Flexbox Grid',
  type: 'component',
  overview: (
    <p>
      Flexbox grid examples.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        You can specific sizes for a cell from 1 to 24 with the modifier class <code>m-size*</code>.
      </p>
    ),
    example: (
      <span>
        <FlexRow>
          <FlexCell columns={1}>1</FlexCell>
          <FlexCell columns={11}>11</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={2}>2</FlexCell>
          <FlexCell columns={10}>10</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={3}>3</FlexCell>
          <FlexCell columns={9}>9</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={4}>4</FlexCell>
          <FlexCell columns={8}>8</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={5}>5</FlexCell>
          <FlexCell columns={7}>7</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={6}>6</FlexCell>
          <FlexCell columns={6}>6</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={7}>7</FlexCell>
          <FlexCell columns={5}>5</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={8}>8</FlexCell>
          <FlexCell columns={4}>4</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={9}>9</FlexCell>
          <FlexCell columns={3}>3</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={10}>10</FlexCell>
          <FlexCell columns={2}>2</FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={11}>11</FlexCell>
          <FlexCell columns={1}>1</FlexCell>
        </FlexRow>
      </span>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        By default, grid cells will take up the height needed for its own content however if you specific the <code>m-flex</code> class to the cell and it will grow the height to the height of the row.
      </p>
    ),
    example: (
      <FlexRow>
        <FlexCell>
          Lorem ipsum dolor sit amet.
        </FlexCell>
        <FlexCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla libero congue magna porta suscipit. Morbi consectetur volutpat sapien et semper. Nullam quis nisl hendrerit, eleifend leo eu, vehicula est. Fusce posuere purus quis dapibus tincidunt. Donec quis elit blandit, fermentum urna nec, ullamcorper nulla. Curabitur placerat dolor non dolor viverra finibus. Quisque mattis dolor nec vehicula tincidunt.
        </FlexCell>
        <FlexCell flex={true}>
          Lorem ipsum dolor sit amet
        </FlexCell>
      </FlexRow>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        By default, a cell will be vertically aligned at the top however you can set the verticalAlign property for the flex row to <code>start</code>, <code>center</code>, or <code>end</code>.
      </p>
    ),
    example: (
      <FlexRow verticalAlign="center">
        <FlexCell>
          Lorem ipsum dolor sit amet.
        </FlexCell>
        <FlexCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla libero congue magna porta suscipit. Morbi consectetur volutpat sapien et semper. Nullam quis nisl hendrerit, eleifend leo eu, vehicula est. Fusce posuere purus quis dapibus tincidunt. Donec quis elit blandit, fermentum urna nec, ullamcorper nulla. Curabitur placerat dolor non dolor viverra finibus. Quisque mattis dolor nec vehicula tincidunt.
        </FlexCell>
        <FlexCell>
          Lorem ipsum dolor sit amet.
        </FlexCell>
        <FlexCell>
          Lorem ipsum dolor sit amet.
        </FlexCell>
      </FlexRow>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        You can also apply the the same value to the flex cell for its verticalAlign property.
      </p>
    ),
    example: (
      <FlexRow>
        <FlexCell verticalAlign="start">
          Lorem ipsum dolor sit amet.
        </FlexCell>
        <FlexCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla libero congue magna porta suscipit. Morbi consectetur volutpat sapien et semper. Nullam quis nisl hendrerit, eleifend leo eu, vehicula est. Fusce posuere purus quis dapibus tincidunt. Donec quis elit blandit, fermentum urna nec, ullamcorper nulla. Curabitur placerat dolor non dolor viverra finibus. Quisque mattis dolor nec vehicula tincidunt.
        </FlexCell>
        <FlexCell verticalAlign="center">
          Lorem ipsum dolor sit amet.
        </FlexCell>
        <FlexCell verticalAlign="end">
          Lorem ipsum dolor sit amet.
        </FlexCell>
      </FlexRow>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        By default, if a row does not have enough cells to fill the row, the cells start at the left however you can the horizontalAlign property for the flex row to <code>start</code>, <code>center</code>, or <code>end</code>.
      </p>
    ),
    example: (
      <span>
        <FlexRow horizontalAlign="start">
          <FlexCell smallColumns={4} columns={4}>
            Lorem ipsum dolor sit amet.
          </FlexCell>
        </FlexRow>
        <FlexRow horizontalAlign="center">
          <FlexCell smallColumns={4} columns={4}>
            Lorem ipsum dolor sit amet.
          </FlexCell>
        </FlexRow>
        <FlexRow horizontalAlign="end">
          <FlexCell smallColumns={4} columns={4}>
            Lorem ipsum dolor sit amet.
          </FlexCell>
        </FlexRow>
      </span>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Grids in grids.
      </p>
    ),
    example: (
      <div style={{border: '1px solid black'}}>
        Grid1
        <FlexRow>
          <FlexCell columns={9}>
            Grid2
            <FlexRow>
              <FlexCell>
                Lorem ipsum dolor sit amet.
              </FlexCell>
              <FlexCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla libero congue magna porta suscipit. Morbi consectetur volutpat sapien et semper. Nullam quis nisl hendrerit, eleifend leo eu, vehicula est. Fusce posuere purus quis dapibus tincidunt. Donec quis elit blandit, fermentum urna nec, ullamcorper nulla. Curabitur placerat dolor non dolor viverra finibus. Quisque mattis dolor nec vehicula tincidunt.
              </FlexCell>
              <FlexCell columns={6} verticalAlign="center">
                Grid3
                <FlexRow>
                  <FlexCell smallColumns={2}>
                    Lorem ipsum dolor sit amet.
                  </FlexCell>
                  <FlexCell smallColumns={4}>
                    Lorem ipsum dolor sit amet.
                  </FlexCell>
                  <FlexCell smallColumns={2}>
                    Lorem ipsum dolor sit amet.
                  </FlexCell>
                  <FlexCell smallColumns={4}>
                    Lorem ipsum dolor sit amet.
                  </FlexCell>
                </FlexRow>
              </FlexCell>
            </FlexRow>
          </FlexCell>
          <FlexCell>
            Lorem ipsum dolor sit amet.
          </FlexCell>
        </FlexRow>
      </div>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, , {
    description: (
      <p>
        This is a responsive grid that shifts as the browser size changes.
      </p>
    ),
    example: (
      <span>
        <FlexRow>
          <FlexCell columns={6} mediumColumns={4} smallColumns={2}>
            6/4/2
          </FlexCell>
          <FlexCell columns={4} mediumColumns={2} smallColumns={6}>
            4/2/6
          </FlexCell>
          <FlexCell columns={2} mediumColumns={6} smallColumns={4}>
            2/6/4
          </FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={2} mediumColumns={4} smallColumns={6}>
            2/4/6
          </FlexCell>
          <FlexCell columns={4} mediumColumns={6} smallColumns={2}>
            4/6/2
          </FlexCell>
          <FlexCell columns={6} mediumColumns={2} smallColumns={4}>
            6/2/4
          </FlexCell>
        </FlexRow>
        <FlexRow>
          <FlexCell columns={6} mediumColumns={4} smallColumns={2}>
            6/4/2
          </FlexCell>
          <FlexCell columns={4} mediumColumns={2} smallColumns={6}>
            4/2/6
          </FlexCell>
          <FlexCell columns={2} mediumColumns={6} smallColumns={4}>
            2/6/4
          </FlexCell>
        </FlexRow>
      </span>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
