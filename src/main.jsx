import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreationPage from './Create'
import "./layout.css"
import ListPage from './List'
import Root from './routes/Root'
import SettingsPage from './Settings'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path:"list",
        element: <ListPage />
      },
      {
        path:"settings",
        element: <SettingsPage />
      },
      {
        path:"new",
        element: <CreationPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
)
