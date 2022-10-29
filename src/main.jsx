import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreationPage from './routes/Create'
import ListPage from './routes/List'
import Root from './Root'
import SettingsPage from './routes/Settings'
import EditPage from './routes/EditPage'
import "./layout.css"
import AuthPage from './routes/AuthPage'
import ErrorCatcher from './routes/ErrorCatcher'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorCatcher />,
    children: [
      {
        path: "",
        element: <ListPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      },
      {
        path: "new",
        element: <CreationPage />
      },
      {
        path:"edit/:id",
        element:<EditPage />,
      },
      {
        path:"auth/:id",
        element: <AuthPage />
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
