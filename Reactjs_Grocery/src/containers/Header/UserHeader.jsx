import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./UserHeader.scss";
import { FormattedMessage } from "react-intl"; //translate lang
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import * as actions from "../../store/actions";

//@mui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

function UserHeader({
  changeLanguageAppRedux,
  isLoggedIn,
  language,
  processLogout,
  fetchCategoryRedux,
  listCategories,
}) {
  const [categoriesList, setCategoriesList] = useState([]);
  console.log(categoriesList);
  const handleChangeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };
  useEffect(() => {
    fetchCategoryRedux();
  }, []);
  useEffect(() => {
    setCategoriesList(listCategories);
  }, [listCategories]);
  const [openCategoryMenu, setOpenCategoryMenu] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCateMenu = Boolean(openCategoryMenu);
  const open = Boolean(anchorEl);

  const handleClickCategoryMenu = (event) => {
    console.log(event);
    setOpenCategoryMenu(event.currentTarget);
  };
  const handleCloseCategoryMenu = () => {
    setOpenCategoryMenu(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="user_header_container">
        <div className="container home_head_content">
          <div className="left_content">
            <div>
              <i className="fas fa-phone"></i>
              <label>0386040650</label>
            </div>
            <div>
              <i className="fas fa-envelope"> </i>
              <label> tuantuong326@gmail.com</label>
            </div>
          </div>

          <div className="right_content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              <FormattedMessage id="userheader.support" />
            </div>
            <div
              className={
                language == LANGUAGES.VI ? "language_vi active" : "language_vi"
              }
            >
              <span onClick={() => handleChangeLanguage(LANGUAGES.VI)}>
                🌐VN
              </span>
            </div>
            <div
              className={
                language == LANGUAGES.EN ? "language_en active" : "language_en"
              }
            >
              <span onClick={() => handleChangeLanguage(LANGUAGES.EN)}>
                🌐EN
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="user_navbar_container">
        <div className="home_header_content">
          <div className="left_content">
            <Link to="/home" className="header_logo"></Link>

            <div className="child_content">
              <Button
                id="category-button"
                className="category_btn category_menu"
                aria-controls={open ? "category-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickCategoryMenu}
              >
                <i className="fas fa-bars "></i>
                <span>Danh mục sản phẩm</span>
              </Button>
              <Menu
                id="category-menu"
                anchorEl={openCategoryMenu}
                open={openCateMenu}
                onClose={handleCloseCategoryMenu}
                MenuListProps={{
                  "aria-labelledby": "category-button",
                }}
              >
                {categoriesList &&
                  categoriesList.length > 0 &&
                  categoriesList.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <div>
                          <Link to="/" className="category">
                            <MenuItem className="category_menu">
                              {item.name}
                            </MenuItem>
                          </Link>
                        </div>
                        {index < categoriesList.length - 1 && <Divider />}
                      </Fragment>
                    );
                  })}
              </Menu>
            </div>
          </div>
          <div className="center_content">
            <div className="child_content">
              <div className="search_box f_flex">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  // value={wordEntered}
                  // onChange={handleFilter}
                />
                <button
                  type="submit "
                  className="submit btn btn-primary"
                  // onClick={handleSearch}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="right_content">
            <div className="cart">
              <Link to="/cart">
                <i className="fas fa-shopping-cart icon-circle"></i>
                <span>0</span>
              </Link>
            </div>

            {isLoggedIn ? (
              <div className="login">
                <Tooltip title="Tài khoản">
                  <IconButton
                    onClick={handleClick}
                    className="icon_login"
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <i className="fas fa-user icon-circle"></i>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  className="show_account_settings"
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                >
                  <div>
                    <Link to="./profile" className="profile">
                      <MenuItem>Thông tin cá nhân</MenuItem>
                    </Link>
                  </div>
                  <div>
                  <Link to="./order" className="profile">
                      <MenuItem>Đơn hàng</MenuItem>
                    </Link>
                  </div>
                  <Divider />

                  <MenuItem onClick={processLogout} title="Log out">
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="./login">
                <i className="fas fa-user icon-circle"></i>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listCategories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
    fetchCategoryRedux: () => dispatch(actions.fetchAllCategoriesStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
