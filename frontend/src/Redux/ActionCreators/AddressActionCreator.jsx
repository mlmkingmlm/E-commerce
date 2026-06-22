import { CREATE_ADDRESS, DELETE_ADDRESS, GET_ADDRESS, UPDATE_ADDRESS } from "../Constants";

export function createAddress(data) {
    return {
        type: CREATE_ADDRESS,
        payload: data
    }
};

export function getAddress() {
    return {
        type: GET_ADDRESS
    }
}

export function updateAddress({ id, data }) {
    return {
        type: UPDATE_ADDRESS,
        payload: data,
        id: id
    }
}

export function deleteAddress(data) {
    return {
        type: DELETE_ADDRESS,
        payload: data
    }
}