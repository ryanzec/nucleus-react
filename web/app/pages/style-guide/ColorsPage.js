import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from '../../react/components/CodeExample';
import Card from 'src/components/card/Card';
import CardHeader from 'src/components/card/CardHeader';
import CardContent from 'src/components/card/CardContent';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-colors">
        <h1>Color</h1>
        <p>These are the different color palettes that are available (currently using the colors from VMWare's Clarity Project https://vmware.github.io/clarity/documentation/color).</p>
        <Card className="color-palette">
          <CardHeader>Gray Color Palette</CardHeader>
          <CardContent className="u-padding-0">
            <div className="color-palette__example gray7 light">
              <span className="text">A</span>
              <span>#313131</span>
            </div>
            <div className="color-palette__example gray6 light">
              <span className="text">A</span>
              <span>#565656</span>
            </div>
            <div className="color-palette__example gray5 light">
              <span className="text">A</span>
              <span>#747474</span>
            </div>
            <div className="color-palette__example gray4 dark">
              <span className="text">A</span>
              <span>#CCCCCC</span>
            </div>
            <div className="color-palette__example gray3 dark">
              <span className="text">A</span>
              <span>#DDDDDD</span>
            </div>
            <div className="color-palette__example gray2 dark">
              <span className="text">A</span>
              <span>#EEEEEE</span>
            </div>
            <div className="color-palette__example gray1 dark">
              <span className="text">A</span>
              <span>#FAFAFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="color-palette">
          <CardHeader>Red Color Palette</CardHeader>
          <CardContent className="u-padding-0">
            <div className="color-palette__example red5 light">
              <span className="text">A</span>
              <span>#A32100</span>
            </div>
            <div className="color-palette__example red4 light">
              <span className="text">A</span>
              <span>#C92100</span>
            </div>
            <div className="color-palette__example red3 light">
              <span className="text">A</span>
              <span>#E62700</span>
            </div>
            <div className="color-palette__example red2 dark">
              <span className="text">A</span>
              <span>#EBAFA6</span>
            </div>
            <div className="color-palette__example red1 dark">
              <span className="text">A</span>
              <span>#F5DBD9</span>
            </div>
          </CardContent>
        </Card>
        <Card className="color-palette">
          <CardHeader>Blue Color Palette</CardHeader>
          <CardContent className="u-padding-0">
            <div className="color-palette__example blue7 light">
              <span className="text">A</span>
              <span>#002538</span>
            </div>
            <div className="color-palette__example blue6 light">
              <span className="text">A</span>
              <span>#004A70</span>
            </div>
            <div className="color-palette__example blue5 light">
              <span className="text">A</span>
              <span>#007CBB</span>
            </div>
            <div className="color-palette__example blue4 light">
              <span className="text">A</span>
              <span>#0094D2</span>
            </div>
            <div className="color-palette__example blue3 light">
              <span className="text">A</span>
              <span>#49AFD9</span>
            </div>
            <div className="color-palette__example blue2 dark">
              <span className="text">A</span>
              <span>#89CBDF</span>
            </div>
            <div className="color-palette__example blue1 dark">
              <span className="text">A</span>
              <span>#E1F1F6</span>
            </div>
          </CardContent>
        </Card>
        <Card className="color-palette">
          <CardHeader>Green Color Palette</CardHeader>
          <CardContent className="u-padding-0">
            <div className="color-palette__example green6 light">
              <span className="text">A</span>
              <span>#1D5100</span>
            </div>
            <div className="color-palette__example green5 light">
              <span className="text">A</span>
              <span>#266900</span>
            </div>
            <div className="color-palette__example green4 light">
              <span className="text">A</span>
              <span>#318700</span>
            </div>
            <div className="color-palette__example green3 light">
              <span className="text">A</span>
              <span>#62A420</span>
            </div>
            <div className="color-palette__example green2 light">
              <span className="text">A</span>
              <span>#60B515</span>
            </div>
            <div className="color-palette__example green1 dark">
              <span className="text">A</span>
              <span>#DFF0D0</span>
            </div>
          </CardContent>
        </Card>
        <Card className="color-palette">
          <CardHeader>Orange Color Palette</CardHeader>
          <CardContent className="u-padding-0">
            <div className="color-palette__example orange3 light">
              <span className="text">A</span>
              <span>#8A5301</span>
            </div>
            <div className="color-palette__example orange2 light">
              <span className="text">A</span>
              <span>#EB8D00</span>
            </div>
            <div className="color-palette__example orange1 dark">
              <span className="text">A</span>
              <span>#FEECB5</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ButtonsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ButtonsPage;
