import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import Root from './components/root';

// TESTING
import * as APIUtil from './util/api_util';
import * as Actions from './actions/navigation_actions';




document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let store = configureStore();
  ReactDOM.render(<Root store={store} />, root);

  // TESTING
  window.store = store;

  window.Actions = Actions;
  window.APIUtil = APIUtil;

  }
);
