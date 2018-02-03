import store from '../../store';
import * as dynamicallyLoadingComponentsActions from '../../stores/dynamically-loading-components/dynamically-loading-components.actions';

export const dynamicallyLoadingComponents = {
  onEnter: function(nextState, replace, callback) {
    setTimeout(() => {
      const dataSet = [{
        type: 'Story',
        key: 'TEST-123',
        summary: 'Update the components library to React 15.3'
      }, {
        type: 'Bug',
        key: 'TEST-614',
        summary: 'Fix issue where react-dnd does not seem to be working within modal windows'
      }, {
        type: 'Task',
        key: 'TEST-941',
        summary: 'We need to add a file upload drag and drop component'
      }, {
        type: 'Epic',
        key: 'TEST-309',
        summary: 'We need to create a brand new system to managing application state'
      }];
      store.dispatch(dynamicallyLoadingComponentsActions.set('one', dataSet));
    }, 1000);

    setTimeout(() => {
      const dataSet = [{
        type: 'Story',
        key: 'FTH-123',
        summary: 'Update the components library to React 15.3'
      }, {
        type: 'Bug',
        key: 'FTH-614',
        summary: 'Fix issue where react-dnd does not seem to be working within modal windows'
      }, {
        type: 'Task',
        key: 'FTH-941',
        summary: 'We need to add a file upload drag and drop component'
      }, {
        type: 'Epic',
        key: 'FTH-309',
        summary: 'We need to create a brand new system to managing application state'
      }];
      store.dispatch(dynamicallyLoadingComponentsActions.set('two', dataSet));
    }, 2500);

    setTimeout(() => {
      const dataSet = [{
        type: 'Story',
        key: 'SZQ-123',
        summary: 'Update the components library to React 15.3'
      }, {
        type: 'Bug',
        key: 'SZQ-614',
        summary: 'Fix issue where react-dnd does not seem to be working within modal windows'
      }, {
        type: 'Task',
        key: 'SZQ-941',
        summary: 'We need to add a file upload drag and drop component'
      }, {
        type: 'Epic',
        key: 'SZQ-309',
        summary: 'We need to create a brand new system to managing application state'
      }];
      store.dispatch(dynamicallyLoadingComponentsActions.set('three', dataSet));
    }, 1750);

    callback();
  }
};
