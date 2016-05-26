import React from 'react';
import {Route} from 'react-router';

import OverlaysPage from './overlays.page.jsx';
import CodePage from './code.page.jsx';
import SvgIconsPage from './svg-icons.page.jsx';
import ButtonsPage from './buttons.page.jsx';
import ColorsPage from './colors.page.jsx';
import GridPage from './grid.page.jsx';
import CardsPage from './cards.page.jsx';
import TypographyPage from './typography.page.jsx';
import ModalsPage from './modals.page.jsx';
import ProgressBarsPage from './progress-bars.page.jsx';
import AlertsPage from './alerts.page.jsx';
import NotificationsPage from './notifications.page.jsx';

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
    key="3"
    name="style-guide-svg-icons"
    path="/style-guide/svg-icons"
    component={SvgIconsPage}
  />,
  <Route
    key="4"
    name="style-guide-buttons"
    path="/style-guide/buttons"
    component={ButtonsPage}
  />,
  <Route
    key="5"
    name="style-guide-grid"
    path="/style-guide/grid"
    component={GridPage}
  />,
  <Route
    key="6"
    name="style-guide-colors"
    path="/style-guide/colors"
    component={ColorsPage}
  />,
  <Route
    key="6"
    name="style-guide-cards"
    path="/style-guide/cards"
    component={CardsPage}
  />,
  <Route
    key="7"
    name="style-guide-typography"
    path="/style-guide/typography"
    component={TypographyPage}
  />,
  <Route
    key="8"
    name="style-guide-modals"
    path="/style-guide/modals"
    component={ModalsPage}
  />,
  <Route
    key="9"
    name="style-guide-progress-bars"
    path="/style-guide/progress-bars"
    component={ProgressBarsPage}
  />,
  <Route
    key="10"
    name="style-guide-alerts"
    path="/style-guide/alerts"
    component={AlertsPage}
  />,
  <Route
    key="11"
    name="style-guide-notifications"
    path="/style-guide/notifications"
    component={NotificationsPage}
  />
];
