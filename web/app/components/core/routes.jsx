var React = require('react/addons');
var Application = require('./application.component.jsx');
var NotFound = require('./not-found.component.jsx');
var StyleGuideAppendBody = require('../style-guide/append-body.component.jsx');
var StyleGuideBadge = require('../style-guide/badge.component.jsx');
var StyleGuideButton = require('../style-guide/button.component.jsx');
var StyleGuideCode = require('../style-guide/code.component.jsx');
var StyleGuideCharacterCounter = require('../style-guide/character-counter.component.jsx');
var StyleGuideDebounce = require('../style-guide/debounce.component.jsx');
var StyleGuideDomEventManager = require('../style-guide/dom-event-manager.component.jsx');
var StyleGuideExtendText = require('../style-guide/extend-text.component.jsx');
var StyleGuideFlexboxGrid = require('../style-guide/flexbox-grid.component.jsx');
var StyleGuideForm = require('../style-guide/form.component.jsx');
var StyleGuideInputAutoSizer = require('../style-guide/input-auto-sizer.component.jsx');
var StyleGuideModal = require('../style-guide/modal.component.jsx');
var StyleGuideOverlay = require('../style-guide/overlay.component.jsx');
var StyleGuideOverview = require('../style-guide/overview.component.jsx');
var StyleGuidePagination = require('../style-guide/pagination.component.jsx');
var StyleGuidePaginationMixin = require('../style-guide/pagination-mixin.component.jsx');
var StyleGuideProgressBar = require('../style-guide/progress-bar.component.jsx');
var StyleGuideSinglePanel = require('../style-guide/single-panel.component.jsx');
var StyleGuideSvgIcon = require('../style-guide/svg-icon.component.jsx');
var StyleGuideTooltip = require('../style-guide/tooltip.component.jsx');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

module.exports = (
  <Route name="home" path="/" handler={Application}>
    <DefaultRoute handler={StyleGuideOverview} />
    <Route name="append-body" path="append-body" handler={StyleGuideAppendBody} />
    <Route name="badge" path="badge" handler={StyleGuideBadge} />
    <Route name="button" path="button" handler={StyleGuideButton} />
    <Route name="code" path="code" handler={StyleGuideCode} />
    <Route name="character-counter" path="character-counter" handler={StyleGuideCharacterCounter} />
    <Route name="debounce" path="debounce" handler={StyleGuideDebounce} />
    <Route name="dom-event-manager" path="dom-event-manager" handler={StyleGuideDomEventManager} />
    <Route name="extend-text" path="extend-text" handler={StyleGuideExtendText} />
    <Route name="flexbox-grid" path="flexbox-grid" handler={StyleGuideFlexboxGrid} />
    <Route name="form" path="form" handler={StyleGuideForm} />
    <Route name="input-auto-sizer" path="input-auto-sizer" handler={StyleGuideInputAutoSizer} />
    <Route name="modal" path="modal" handler={StyleGuideModal} />
    <Route name="overlay" path="overlay" handler={StyleGuideOverlay} />
    <Route name="pagination" path="pagination" handler={StyleGuidePagination} />
    <Route name="pagination-mixin" path="pagination-mixin" handler={StyleGuidePaginationMixin} />
    <Route name="progress-bar" path="progress-bar" handler={StyleGuideProgressBar} />
    <Route name="single-panel" path="single-panel" handler={StyleGuideSinglePanel} />
    <Route name="svg-icon" path="svg-icon" handler={StyleGuideSvgIcon} />
    <Route name="tooltip" path="tooltip" handler={StyleGuideTooltip} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);
