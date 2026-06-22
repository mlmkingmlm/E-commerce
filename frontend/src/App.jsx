import React from 'react'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import About from './pages/About'
import Shop from './pages/Shop'
import Dashboard from './pages/Dashborad';
import Orders from './pages/Orders';
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword'
import Updateprofile from './pages/Updateprofile'
import Address from './pages/Address'
import Contact from './pages/Contact'
import Cart from "./pages/CartPage"
import Productdetails from './pages/Productdetails'
import AdminHomePage from './pages/Admin/AdminHomePage'
import AdminMainCategoryHome from './pages/Admin/AdminMainCategory.jsx/AdminMainCategoryHome'
import AdminMainCategoryCreatePage from './pages/Admin/AdminMainCategory.jsx/AdminMainCategoryCreatePage'
import AdminUpdateMainCategory from './pages/Admin/AdminMainCategory.jsx/AdminUpdateMainCategory'
import AdminSubCategoryCreatePage from './pages/Admin/AdminSubCategory.jsx/AdminSubCategoryCreatePage'
import AdminSubCategoryHome from './pages/Admin/AdminSubCategory.jsx/AdminSubCategoryHome'
import AdminUpdateSubCategory from './pages/Admin/AdminSubCategory.jsx/AdminUpdateSubCategory'
import AdminFeatureHome from './pages/Admin/AdminFeature/AdminFeatureHome'
import AdminFeatureCreatePage from './pages/Admin/AdminFeature/AdminFeatureCreatePage'
import AdminBrandHome from './pages/Admin/AdminBrand/AdminBrandHome'
import AdminBrandCreatePage from './pages/Admin/AdminBrand/AdminBrandCreatePage'
import AdminUpdateBrand from './pages/Admin/AdminBrand/AdminUpdateBrand'
import AdminUpdateFeature from './pages/Admin/AdminFeature/AdminUpdateFeature'
import AdminFaqHome from './pages/Admin/AdminFaq/AdminFaqHome'
import AdminFaqCreatePage from './pages/Admin/AdminFaq/AdminFaqCreatePage'
import AdminUpdateFaq from './pages/Admin/AdminFaq/AdminUpdateFaq'
import AdminProductHome from './pages/Admin/AdminProduct/AdminProductHome'
import AdminProductCreatePage from './pages/Admin/AdminProduct/AdminProductCreatePage'
import AdminUpdateProduct from './pages/Admin/AdminProduct/AdminUpdateProduct'
import AdminSettingPage from './pages/Admin/AdminSetting/AdminSettingPage'
import FeaturePage from './pages/FeaturePage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtuctedRoutes from './pages/ProtuctedRoutes'
import AdminUsers from './pages/Admin/AdminUsers/AdminUsersHome'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/shop' element={<Shop />} />
                <Route path="/shop/:type/:value" element={<Shop />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/features' element={<FeaturePage />} />

                {/* Admin Routes */}
                <Route element={<ProtuctedRoutes role="admin" />}>
                    <Route path='/admin' element={<AdminHomePage />} />
                    <Route path='/admin/maincategory' element={<AdminMainCategoryHome />} />
                    <Route path='/admin/maincategorycreate' element={<AdminMainCategoryCreatePage />} />
                    <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMainCategory />} />

                    <Route path='/admin/subcategory' element={<AdminSubCategoryHome />} />
                    <Route path='/admin/subcategorycreate' element={<AdminSubCategoryCreatePage />} />
                    <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubCategory />} />

                    <Route path='/admin/feature' element={<AdminFeatureHome />} />
                    <Route path='/admin/featurecreate' element={<AdminFeatureCreatePage />} />
                    <Route path='/admin/feature/update/:id' element={<AdminUpdateFeature />} />

                    <Route path='/admin/brand' element={<AdminBrandHome />} />
                    <Route path='/admin/brandcreate' element={<AdminBrandCreatePage />} />
                    <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand />} />

                    <Route path='/admin/faq' element={<AdminFaqHome />} />
                    <Route path='/admin/faqcreate' element={<AdminFaqCreatePage />} />
                    <Route path='/admin/faq/update/:id' element={<AdminUpdateFaq />} />

                    <Route path='/admin/product' element={<AdminProductHome />} />
                    <Route path='/admin/productcreate' element={<AdminProductCreatePage />} />
                    <Route path='/admin/product/update/:id' element={<AdminUpdateProduct />} />

                    <Route path="/admin/users" element={<AdminUsers />} />

                    <Route path='/admin/setting' element={<AdminSettingPage />} />
                </Route>


                {/* "Buyer Routes" */}
                <Route element={<ProtuctedRoutes role="user" />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/update-profile' element={<Updateprofile />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/address' element={<Address />} />
                    <Route path='/checkout' element={<CheckoutPage />} />
                    <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='product/:id' element={<Productdetails />} />

                <Route path='/order-confirmation' element={<> <OrderConfirmationPage /> </>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App



