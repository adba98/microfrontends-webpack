import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#auth-root');
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };