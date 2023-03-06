import React from 'react';
import ReactDOM from 'react-dom/client';
import App, {
  loader as rootLoader,
  action as rootAction,
} from './App';
import Game, {
  loader as gameLoader,
  action as gameAction,
} from './Components/game-component'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ErrorPage from './error-page'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/:gameId',
          element: <Game/>,
        },
      ],
    },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
