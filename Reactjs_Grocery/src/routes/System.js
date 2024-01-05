import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux.jsx";
import CU_Product from "../containers/System/Product/CU_Product.jsx";
import CU_Category from "../containers/System/Category/CU_Category.jsx";
import CU_Brand from "../containers/System/Brand/CU_Brand.jsx";
import CU_Discount from "../containers/System/Discount/CU_Discount.jsx";
import AdminHeader from "../containers/Header/AdminHeader";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <AdminHeader />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/manage-user-redux" component={UserRedux} />
              <Route
                path="/system/manage-category-redux"
                component={CU_Category}
              />
              <Route path="/system/manage-brand-redux" component={CU_Brand} />
              <Route
                path="/system/manage-discount-redux"
                component={CU_Discount}
              />
              <Route
                path="/system/manage-product-redux"
                component={CU_Product}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
