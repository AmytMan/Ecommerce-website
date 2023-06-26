import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from './screens/LoginScreen.jsx'
import Hero from "./components/Hero.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import SingleProduct from "./components/SingleProduct.jsx";
import CreateProduct from "./admin/CreateProduct.jsx";
import MyComponent from "./screens/Pagination.jsx";
import PrivateRoute from "./components/ProtectedRoute.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} name="home">
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<SignupScreen />} />
      <Route path="/hero" element={<Hero/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/pagination" element={<MyComponent/>}/>
      <Route path="/product/:id" element={<SingleProduct/>} />
      </Route>
      
      <Route path="/admin/addproduct" element={<CreateProduct/>}/>

    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
