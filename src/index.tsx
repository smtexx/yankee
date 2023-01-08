import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import App from './App';
import './styles/index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import PageError from 'components/PageError/PageError';
import PageHome from 'components/PageHome/PageHome';
import { routes } from 'data/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageError />,
    children: [
      { path: '/', element: <PageHome route={routes.root} /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
