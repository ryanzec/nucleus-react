import React from 'react';
import {Route} from 'react-router';

import * as routerHooks from './router.hooks';

import DynamicallyLoadingComponentsPage from './dynamically-loading-components.page';
import AlgorithmsPage from './algorithms.page';
import SvgMapPage from './svg-map.page';

export const routes = [
  <Route
    key="1"
    name="showcase-dynamically-loading-components"
    path="/showcase/dynamically-loading-components"
    component={DynamicallyLoadingComponentsPage}
    onEnter={routerHooks.dynamicallyLoadingComponents.onEnter}
  />,
  <Route
    key="2"
    name="showcase-algorithms"
    path="/showcase/algorithms"
    component={AlgorithmsPage}
  />,
  <Route
    key="3"
    name="showcase-svg-map"
    path="/showcase/svg-map"
    component={SvgMapPage}
  />
];
