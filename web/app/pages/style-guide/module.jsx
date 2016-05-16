import React from 'react';
import {Route} from 'react-router';

import AlertsPage from './alerts.page.jsx';
import ButtonsPage from './buttons.page.jsx';
import CardsPage from './cards.page.jsx';
import DropDownsPage from './drop-downs.page.jsx';
import LabelsPage from './labels.page.jsx';
import ListGroupsPage from './list-groups.page.jsx';
import GridPage from './grid.page.jsx';
import PaginationPage from './pagination.page.jsx';
import ModalsPage from './modals.page.jsx';
import DatePickerPage from './date-picker.page.jsx';
import SelectPage from './select.page.jsx';
import FormsPage from './forms.page.jsx';
import TooltipsPage from './tooltips.page.jsx';
import PopoversPage from './popovers.page.jsx';
import BreadcrumbsPage from './breadcrumbs.page.jsx';
import NavigationPage from './progress-bars.page.jsx';
import OverlaysPage from './overlays.page.jsx';

export const routes = [
  <Route
    key="1"
    name="style-guide-buttons"
    path="/style-guide/buttons"
    component={ButtonsPage}
  />,
  <Route
    key="2"
    name="style-guide-drop-downs"
    path="/style-guide/drop-downs"
    component={DropDownsPage}
  />,
  <Route
    key="3"
    name="style-guide-labels"
    path="/style-guide/labels"
    component={LabelsPage}
  />,
  <Route
    key="4"
    name="style-guide-alerts"
    path="/style-guide/alerts"
    component={AlertsPage}
  />,
  <Route
    key="5"
    name="style-guide-cards"
    path="/style-guide/cards"
    component={CardsPage}
  />,
  <Route
    key="6"
    name="style-guide-date-picker"
    path="/style-guide/date-picker"
    component={DatePickerPage}
  />,
  <Route
    key="7"
    name="style-guide-grid"
    path="/style-guide/grid"
    component={GridPage}
  />,
  <Route
    key="8"
    name="style-guide-pagination"
    path="/style-guide/pagination"
    component={PaginationPage}
  />,
  <Route
    key="9"
    name="style-guide-modals"
    path="/style-guide/modals"
    component={ModalsPage}
  />,
  <Route
    key="10"
    name="style-guide-list-groups"
    path="/style-guide/list-groups"
    component={ListGroupsPage}
  />,
  <Route
    key="11"
    name="style-guide-select"
    path="/style-guide/select"
    component={SelectPage}
  />,
  <Route
    key="12"
    name="style-guide-forms"
    path="/style-guide/forms"
    component={FormsPage}
  />,
  <Route
    key="13"
    name="style-guide-tooltips"
    path="/style-guide/tooltips"
    component={TooltipsPage}
  />,
  <Route
    key="14"
    name="style-guide-popovers"
    path="/style-guide/popovers"
    component={PopoversPage}
  />,
  <Route
    key="15"
    name="style-guide-breadcrumbs"
    path="/style-guide/breadcrumbs"
    component={BreadcrumbsPage}
  />,
  <Route
    key="16"
    name="style-guide-navigation"
    path="/style-guide/navigation"
    component={NavigationPage}
  />,
  <Route
    key="17"
    name="style-guide-progress-bars"
    path="/style-guide/progress-bars"
    component={NavigationPage}
  />,
  <Route
    key="18"
    name="style-guide-overlays"
    path="/style-guide/overlays"
    component={OverlaysPage}
  />
];
