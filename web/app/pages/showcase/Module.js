import React from 'react';
import {Route} from 'react-router';

import * as routerHooks from './RouterHooks';

import DynamicallyLoadingComponentsPage from './DynamicallyLoadingComponentsPage';
import AlgorithmsPage from './AlgorithmsPage';
import SvgMapPage from './SvgMapPage';
import KanbanBoardPage from './KanbanBoardPage';

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
  />,
  <Route
    key="4"
    name="showcase-kanban-board"
    path="/showcase/kanban-board"
    component={KanbanBoardPage}
  />,
];
