import React from 'react';
import {Route} from 'react-router';

import OverlaysPage from './overlays.page';
import CodePage from './code.page';
import SvgIconsPage from './svg-icons.page';
import ButtonsPage from './buttons.page';
import ColorsPage from './colors.page';
import GridPage from './grid.page';
import CardsPage from './cards.page';
import TypographyPage from './typography.page';
import ModalsPage from './modals.page';
import ProgressBarsPage from './progress-bars.page';
import NotificationsPage from './notifications.page';
import BreadcrumbsPage from './breadcrumbs.page';
import BadgesPage from './badges.page';
import PopoversPage from './popovers.page';
import FormsPage from './forms.page';
import ListsPage from './lists.page';
import DatePickerPage from './date-picker.page';

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
    name="style-guide-notifications"
    path="/style-guide/notifications"
    component={NotificationsPage}
  />,
  <Route
    key="11"
    name="style-guide-breadcrumbs"
    path="/style-guide/breadcrumbs"
    component={BreadcrumbsPage}
  />,
  <Route
    key="12"
    name="style-guide-badges"
    path="/style-guide/badges"
    component={BadgesPage}
  />,
  <Route
    key="13"
    name="style-guide-popovers"
    path="/style-guide/popovers"
    component={PopoversPage}
  />,
  <Route
    key="14"
    name="style-guide-lists"
    path="/style-guide/lists"
    component={ListsPage}
  />,
  <Route
    key="15"
    name="style-guide-date-picker"
    path="/style-guide/date-picker"
    component={DatePickerPage}
  />,
  <Route
    key="16"
    name="style-guide-forms"
    path="/style-guide/forms"
    component={FormsPage}
  />
];
