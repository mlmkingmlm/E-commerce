import { CREATE_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../Constants";

export function createCart(data) {
    return {
        type: CREATE_CART,
        payload: data
    }
};

export function getCart() {
    return {
        type: GET_CART
    }
};

export function updateCart({data, id}) {
    return {
        type: UPDATE_CART,
        payload: data,
        id:id
    }
}

export function deleteCart(data) {
    return {
        type: DELETE_CART,
        payload: data
    }
}