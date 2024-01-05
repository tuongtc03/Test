import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux.js";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication.js";
import { path } from "../utils/index.js";
import Home from "../routes/Home.js";
import Login from "./Auth/Login.jsx";
import System from "../routes/System.js";
import { CustomToastCloseButton } from "../components/CustomToast.js";
import HomePage from "./HomePage/HomePage.jsx";
import Cart from "./Cart/Cart.jsx";
import Checkout from "./Cart/Checkout.jsx";
import Profile from "./Profile/UserProfile.jsx";
import Product from "./Product/Product.jsx";
import "./App.scss";
import CustomScrollbars from "../components/CustomScrollbars.js";
function App({ persistor, onBeforeLift }) {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [cartItem, setCardItem] = useState([]);
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    handlePersistorState();
  }, []);

  const handlePersistorState = async () => {
    try {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        if (onBeforeLift) {
          await Promise.resolve(onBeforeLift());
        }
        setBootstrapped(true);
      }
    } catch (e) {
      console.log("Error handling persistor state:", e);
      setBootstrapped(true);
    }
  };

  const handleAddToCart = (product) => {
    console.log("pro", product);
    const existingItem = cartItem.find((item) => item.id == product.id);

    if (existingItem) {
      setCardItem(
        cartItem.map((item) =>
          item.id == product.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : item
        )
      );
    } else {
      setCardItem([...cartItem, { ...product, quantity: 1 }]);
    }
  };

  const handleGetProductDetail = (product) => {
    const existingItem = productItem.find((item) => item.id == product.id);

    if (!existingItem) {
      setProductItem([...productItem, product]);
    }
  };
  const handleDecreaseQuantity = (product) => {
    const existingItem = cartItem.find((item) => item.id == product.id);
    if (existingItem.quantity == 1) {
      setCardItem(cartItem.filter((item) => item.id != product.id));
    } else {
      setCardItem(
        cartItem.map((item) =>
          item.id == product.id
            ? { ...existingItem, quantity: existingItem.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleRemoveProductFromCart = (product) => {
    setCardItem(cartItem.filter((item) => item.id !== product.id));
  };

  console.log("cartitem", cartItem);
  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <span className="content-container">
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <Switch>
                <Route path={path.HOME} component={Home} exact />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path={path.HOMEPAGE}>
                  <HomePage handleAddToCart={handleAddToCart} />
                </Route>

                <Route path={"/cart"}>
                  <Cart
                    cartItem={cartItem}
                    setCardItem={setCardItem}
                    handleAddToCart={handleAddToCart}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                  />
                </Route>

                <Route path={"/checkout"} component={Checkout} />

                <Route path={"/profile"} component={Profile} />
                <Route path={"/product"} component={Product} />
              </Switch>
            </CustomScrollbars>
          </span>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
