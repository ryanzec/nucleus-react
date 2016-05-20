import React from 'react';
import {Route} from 'react-router';

import OverlaysPage from './overlays.page.jsx';
import CodePage from './code.page.jsx';
import SvgIconsPage from './svg-icons.page.jsx';

export const routes = [
  <Route
    key="1"
    name="style-guide-overlays"
    path="/style-guide/overlays"
    component={OverlaysPage}
  />,
  <Route
    key="2"
    name="style-guide-code"
    path="/style-guide/code"
    component={CodePage}
  />,
  <Route
    key="2"
    name="style-guide-svg-icons"
    path="/style-guide/svg-icons"
    component={SvgIconsPage}
  />
];
