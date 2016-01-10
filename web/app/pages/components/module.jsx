var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = {
  routes: [
    <Route key="1" name="components-badge" path="/components/badge" handler={require('./badge.component.jsx')} />,
    <Route key="2" name="components-button" path="/components/button" handler={require('./button.component.jsx')} />,
    <Route key="3" name="components-calendar" path="/components/calendar" handler={require('./calendar.component.jsx')} />,
    <Route key="4" name="components-callout" path="/components/callout" handler={require('./callout.component.jsx')} />,
    <Route key="5" name="components-card" path="/components/card" handler={require('./card.component.jsx')} />,
    <Route key="6" name="components-character-counter" path="/components/character-counter" handler={require('./character-counter.component.jsx')} />,
    <Route key="7" name="components-checkbox-input" path="/components/checkbox-input" handler={require('./checkbox-input.component.jsx')} />,
    <Route key="8" name="components-code" path="/components/code" handler={require('./code.component.jsx')} />,
    <Route key="9" name="components-confirmation-modal" path="/components/confirmation-modal" handler={require('./confirmation-modal.component.jsx')} />,
    <Route key="10" name="components-date-picker" path="/components/date-picker" handler={require('./date-picker.component.jsx')} />,
    <Route key="11" name="components-drop-down" path="/components/drop-down" handler={require('./drop-down.component.jsx')} />,
    <Route key="12" name="components-extend-text" path="/components/extend-text" handler={require('./extend-text.component.jsx')} />,
    <Route key="13" name="components-form-validation-messages" path="/components/form-validation-messages" handler={require('./form-validation-messages.component.jsx')} />,
    <Route key="14" name="components-global-notification" path="/components/global-notification" handler={require('./global-notification.component.jsx')} />,
    <Route key="15" name="components-input-auto-sizer" path="/components/input-auto-sizer" handler={require('./input-auto-sizer.component.jsx')} />,
    <Route key="16" name="components-input-group" path="/components/input-group" handler={require('./input-group.component.jsx')} />,
    <Route key="17" name="components-loading-bar" path="/components/loading-bar" handler={require('./loading-bar.component.jsx')} />,
    <Route key="18" name="components-modal" path="/components/modal" handler={require('./modal.component.jsx')} />,
    <Route key="19" name="components-overlay" path="/components/overlay" handler={require('./overlay.component.jsx')} />,
    <Route key="20" name="components-pagination" path="/components/pagination" handler={require('./pagination.component.jsx')} />,
    <Route key="21" name="components-progress-bar" path="/components/progress-bar" handler={require('./progress-bar.component.jsx')} />,
    <Route key="22" name="components-radio-input" path="/components/radio-input" handler={require('./radio-input.component.jsx')} />,
    <Route key="23" name="components-select-input" path="/components/select-input" handler={require('./select-input.component.jsx')} />,
    <Route key="24" name="components-svg-icon" path="/components/svg-icon" handler={require('./svg-icon.component.jsx')} />,
    <Route key="25" name="components-textbox-input" path="/components/textbox-input" handler={require('./textbox-input.component.jsx')} />
  ]
};
