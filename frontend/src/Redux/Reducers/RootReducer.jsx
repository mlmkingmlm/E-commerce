import { combineReducers } from "@reduxjs/toolkit";
import { maincategoryReducer } from "./MaincategoryReducer";
import { subcategoryReducer } from "./SubcategoryReducer";
import { featureReducer } from "./FeatureReducer";
import { brandReducer } from "./BrandReducer";
import { faqReducer } from "./FaqReducer";
import { productReducer } from "./ProductReducer";
import { settingReducer } from "./SettingReducer";
import { cartReducer } from "./CartReducer"
import { wishlistReducer } from "./WishlistReducer";
import { checkoutReducer } from "./CheckoutReducer";
import { testimonialReducer } from "./TestimonialReducer";
import { userReducer } from "./UsersReducer";
import { addressReducer } from "./AddressReducer";

export default combineReducers({
    MaincategoryStateData: maincategoryReducer,
    SubcategoryStateData: subcategoryReducer,
    BrandStateData: brandReducer,
    FeatureStateData: featureReducer,
    FaqStateData: faqReducer,
    ProductStateData: productReducer,
    UsersStateData: userReducer,
    SettingStateData: settingReducer,
    CartStateData: cartReducer,
    AddressStateData: addressReducer,
    WishlistStateData: wishlistReducer,
    CheckoutStateData: checkoutReducer,
    TestimonialStateData: testimonialReducer
}
)