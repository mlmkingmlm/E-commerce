import { all } from "redux-saga/effects";
import { MaincategorySagas } from "./MainCategorySagas";
import { SubcategorySagas } from "./SubCategorySagas";
import { FeatureSagas } from "./FeatureSagas";
import { BrandSagas } from "./BrandSagas";
import { FaqSagas } from "./FaqSagas";
import { ProductSagas } from "./ProductSagas";
import { SettingSagas } from "./SettingSagas";
import { CartSagas } from "./CartSagas";
import { CheckoutSagas } from "./CheckoutSagas";
import { TestimonialSagas } from "./TestimonialSagas";
import { UsersSagas } from "./UsersSagas";
import { WishlistSagas } from "./WishlistSagas";
import { AddressSagas } from "./AddressSagas";

export default function* RootSagas(){
    console.log("wishlist")
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        FeatureSagas(),
        FaqSagas(),
        ProductSagas(),
        UsersSagas(),
        SettingSagas(),
        WishlistSagas(),
        CartSagas(),
        AddressSagas(),
        CheckoutSagas(),
        TestimonialSagas()
    ])
}