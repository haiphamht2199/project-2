
import Slidebar from './components/slidebar/Slidebar';

import React, { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import TopBar from './components/topBar/TopBar';
import Home from './pages/Home/Home';
import UserList from './pages/userList/UserList';
import ProductList from './pages/products/Product';
import User from './pages/user/User';
import ProductDetail from './pages/productDetail/ProductDetail';
import NewProduct from './pages/newProduct/NewProduct';
import NewUser from './pages/newUser/NewUser';
import Login from './pages/login/Login';
import { getProduct1, getProducts, isUserLoggedIn } from './Action';
import Categories from './pages/categorys/Categories';
import CategoryDetail from './pages/categoryDetail/CategoryDetail';
import AddCategory from './pages/AddCategory/AddCategory';
import Orders from './pages/OrderList/Order';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import 'react-toastify/dist/ReactToastify.css';
import Analytics from './pages/Analytics/Analytics';
import Sales from './pages/sales/Sales';
import Report from './pages/report/Report';
import CP from './pages/Cp/CP';
import { toast } from "react-toastify";


// import "./index.css";
function App() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth);
  const authenticate = useSelector((state) => state.auth.authenticate)
  useEffect(() => {
    if (authenticate) {
      toast.success("Đăng nhập thành công!");
    }
    if (!admin.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getProducts());
      dispatch(getProduct1());
    }

  }, [authenticate])
  return (
    <Router>

      {admin.authenticate ? (
        <>

          <TopBar />
          <div className="container">
            <Slidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/admin/users">
              <UserList />
            </Route>
            <Route path="/admin/user/:userId">
              <User />
            </Route>
            <Route path="/admin/newUser">
              <NewUser />
            </Route>
            <Route path="/admin/products">
              <ProductList />
            </Route>
            <Route path="/admin/product/:productId">
              <ProductDetail />
            </Route>
            <Route path="/admin/newproduct">
              <NewProduct />
            </Route>
            <Route exact path="/admin/categories" component={Categories} />
            <Route path="/admin/category/:categoryId">
              <CategoryDetail />
            </Route>
            <Route path="/admin/newcategory">
              <AddCategory />
            </Route>
            <Route path="/admin/orders">
              <Orders />
            </Route>
            <Route path="/admin/order/:orderId">
              <OrderDetail />
            </Route>
            <Route path="/admin/analytics">
              <Analytics />
            </Route>
            <Route path="/admin/sales">
              <Sales />
            </Route>
            <Route path="/admin/report">
              <Report />
            </Route>
            <Route path="/admin/cp">
              <CP />
            </Route>
          </div>
        </>
      ) : <Route exact path="/">
        <Login />
      </Route>}
    </Router>
  );

}

export default App;
