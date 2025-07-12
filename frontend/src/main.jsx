import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import CustomersRow from './Components/CustomersRow';
import LoginForm from './Components/LoginForm';
import Navbar from './Components/Navbar';
import NavItem from './Components/NavItem';
import Recuperar from './Components/Recuperar';
import RegisterForm from './Components/RegisterForm';
import Reports from './Components/Reports';
import SalesCard from './Components/SalesCard';
import ToppRow from './Components/ToppRow';

// Screens
import Customerview from './Screens/SubScreens/Customerview';
import Inventoryview from './Screens/SubScreens/Inventoryview';
import Orderviews from './Screens/SubScreens/Orderviews';
import Reportsview from './Screens/SubScreens/Reportsview';
import Dashboard from './Screens/Dashboard';
import FullFormsPage from './Screens/FullFormsPage';

const router = createBrowserRouter([
  { path: '/', element: <FullFormsPage formType="login" /> },
  { path: '/about', element: <div>About</div> },
  { path: '/contact', element: <div>Contact</div> },
  { path: '/login', element: <FullFormsPage formType="login" /> },
  { path: '/register', element: <FullFormsPage formType="register" /> },
  { path: '/recuperar', element: <FullFormsPage formType="recuperar" /> },
  { path: '/menu', element: <Dashboard rightType="home" /> },
  { path: '/menu/clientes', element: <Dashboard rightType="clientes" /> },
  { path: '/menu/ordenes', element: <Dashboard rightType="ordenes" /> },
  { path: '/menu/inventario', element: <Dashboard rightType="inventario" /> },
  { path: '/menu/informes', element: <Dashboard rightType="informes" /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
