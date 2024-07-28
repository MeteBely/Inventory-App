import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import User from "./components/User.jsx";
import UsersDebits from "./components/UsersDebits.jsx";
import UserDebits from "./components/UserDebits.jsx";
import Home from "./components/Home.jsx";
import AdminOrIMRoute from "./components/route-controller/adminAndIMRoute.jsx";
import AdminOrIKRoute from "./components/route-controller/adminAndIKRoute.jsx";
import ProductsHistory from "./components/ProductsHistory.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Login />} />
      <Route path="/menu" element={<Home />} />
      <Route path="" element={<AdminOrIMRoute />}>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>
      <Route path="" element={<AdminOrIKRoute />}>
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/usersDebits" element={<UsersDebits />} />
        <Route path="/userDebits/:id" element={<UserDebits />} />
        <Route path="/productsHistory" element={<ProductsHistory />} />
      </Route>
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
