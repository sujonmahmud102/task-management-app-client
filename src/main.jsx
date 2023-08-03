import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Layout/Main.jsx';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import Home from './pages/Layout/Home/Home';
import AddTask from './pages/AddTask/AddTask';
import MyAddedTasks from './pages/MyAddedTasks/MyAddedTasks';
import UpdateTask from './pages/MyAddedTasks/UpdateTask/UpdateTask';
import Admin from './pages/Dashboard/Admin/Admin';
import ManageTask from './pages/Dashboard/MangeTask/ManageTask';
import ManageUsers from './pages/Dashboard/ManageUsers/ManageUsers';
import AdminHome from './pages/Dashboard/AdminHome/AdminHome';
import PrivateRoute from './Route/PrivateRoute';
import AuthProvider from './AuthProvider/AuthProvider';
import Check from './pages/Login/Check';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/test',
    element: <Check />
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/',
    element: <PrivateRoute><Main /></PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/add-task',
        element: <AddTask></AddTask>,
        loader: () => fetch('https://task-management-system-server-dun.vercel.app/users')
      },
      {
        path: '/my-added-tasks',
        element: <MyAddedTasks></MyAddedTasks>
      },
      {
        path: '/updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`https://task-management-system-server-dun.vercel.app/task/${params.id}`)
      }
    ]
  },
  {
    path: '/admin/',
    element: <PrivateRoute><Admin></Admin></PrivateRoute>,
    children: [
      {
        path: '/admin/',
        element: <PrivateRoute><AdminHome /></PrivateRoute>
      },
      {
        path: 'manage-tasks',
        element: <ManageTask />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
        loader: () => fetch('https://task-management-system-server-dun.vercel.app/users')
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
