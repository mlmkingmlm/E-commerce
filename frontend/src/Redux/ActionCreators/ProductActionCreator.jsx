import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../Constants";

export function createProduct(data) {
    return {
        type: CREATE_PRODUCT,
        payload: data
    }
};

export function getProduct() {
    return {
        type: GET_PRODUCT
    }
};

export function updateProduct({ data, id }) {
    return {
        type: UPDATE_PRODUCT,
        payload: data,
        id: id
    }
}

export function deleteProduct(data) {
    return {
        type: DELETE_PRODUCT,
        payload: data
    }
}