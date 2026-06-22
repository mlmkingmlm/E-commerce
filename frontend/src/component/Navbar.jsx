import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMaincategory } from '../Redux/ActionCreators/MainCategoryActionCreator'
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
  const { data: MaincategoryStateData } = useSelector(state => state.MaincategoryStateData)
  let { data: SubcategoryStateData } = useSelector((state) => state.SubcategoryStateData);
  let { data: BrandStateData } = useSelector((state) => state.BrandStateData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getMaincategory());
  }, []);

  useEffect(() => {
    dispatch(getSubcategory());
  }, []);

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  function logoutuser() {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <>
      <header className="top-header">
        <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
          <Link className="navbar-brand d-none d-xl-inline" to="/">
            <img src="assets/images/logo.png" className="logo-img" alt="" />
          </Link>
          <a
            className="mobile-menu-btn d-inline d-xl-none"
            href="javascript:;"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <i className="bi bi-list" />
          </a>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <img src="assets/images/logo.webp" className="logo-img" alt="" />
              </div>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body primary-menu">
              <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="tv-shows.html"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </a>
                  <div className="dropdown-menu dropdown-large-menu">
                    <div className="row">
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">MainCategory</h6>
                        <ul className="list-unstyled">
                          {
                            (MaincategoryStateData || []).map(item => {
                              if (!item) return null;

                              return (
                                <li key={item.id}>
                                  <Link to={`/shop/maincategory/${item.name}`}>{item.name}</Link>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">SubCategory</h6>
                        <ul className="list-unstyled">
                          {
                            (SubcategoryStateData || []).map(item => {
                              if (!item) return null;
                              return <li key={item.id}>
                                <Link to={`/shop/subcategory/${item.name}`}>{item.name}</Link>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">Brands</h6>
                        <ul className="list-unstyled">
                          {
                            (BrandStateData || []).map(item => {
                              if (!item) return null;
                              return <li key={item.id}>
                                <Link to={`/shop/brand/${item.name}`}>{item.name}</Link>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                      {/* end col-3 */}
                      <div className="col-12 col-xl-3 d-none d-xl-block">
                        <div className="pramotion-banner1">
                          <img
                            src="assets/images/menu-img.webp"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                      {/* end col-3 */}
                    </div>
                    {/* end row */}
                  </div>
                </li>
                <li className="nav-item" >
                  <Link className="nav-link" to="/shop" > Shop </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/features">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                {
                  localStorage.getItem("isLogin") && localStorage.getItem("role") === "admin" ? <><li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                      data-bs-toggle="dropdown"
                    >
                      {localStorage.getItem("name")}
                    </a>
                    <ul className="dropdown-menu">
                      <button className="dropdown-item" onClick={logoutuser}>
                        Logout
                      </button>
                    </ul>
                  </li>
                  </> : ""
                }
                {
                  localStorage.getItem("isLogin") && localStorage.getItem("role") === "user" ? <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                      data-bs-toggle="dropdown"
                    >
                      {localStorage.getItem("name")}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/update-profile">
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/address">
                          Addresses
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={logoutuser}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li> : ""
                }
                {
                  localStorage.getItem("isLogin") ? "" : <><li className='nav-item'>
                    <Link className='nav-link' to="/login">Login</Link>
                  </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to="/signup">Signup</Link>
                    </li></>
                }
              </ul>
            </div>
          </div>
          <ul className="navbar-nav secondary-menu flex-row">
            <li className="nav-item">
              <a className="nav-link dark-mode-icon" href="javascript:;">
                <div className="mode-icon">
                  <i className="bi bi-moon" />
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="search.html">
                <i className="bi bi-search" />
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className="bi bi-suit-heart" />
              </Link>
            </li>
            <li
              className="nav-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
            >
              <Link className="nav-link position-relative" to="/cart">
                <div className="cart-badge">8</div>
                <i className="bi bi-basket2" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="bi bi-person-circle" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
