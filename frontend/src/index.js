import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
const queryClient = new QueryClient()
if (localStorage.getItem('mode') === 'dark') {
  require('./App.css');
  require('./Dark.css');

} else {
  require('./App.css');
  require('./index.css');
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>


);
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
