import React from 'react';
import { render } from 'react-snapshot'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import * as serviceWorker from 'serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'assets/theme';
import { ScrollToTop } from 'components/UIkit/index';
import createStore from 'reducks/store/store';
import App from './App';

const history = History.createBrowserHistory();
export const store = createStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <ScrollToTop />
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();