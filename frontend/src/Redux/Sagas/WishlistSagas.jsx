import { call, put, takeEvery } from "redux-saga/effects";

import {
    CREATE_WISHLIST,
    CREATE_WISHLIST_RED,
    CREATE_WISHLIST_FAIL,

    GET_WISHLIST,
    GET_WISHLIST_RED,

    UPDATE_WISHLIST,
    UPDATE_WISHLIST_RED,
    UPDATE_WISHLIST_FAIL,

    DELETE_WISHLIST,
    DELETE_WISHLIST_SUCCESS,
    DELETE_WISHLIST_FAIL

} from "../Constants";

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services";



// CREATE
export function* createSaga(action) {
    try {

        let response = yield call(
            createRecord,
            "wishlist",
            action.payload
        );

        if (response.success) {

            yield put({
                type: CREATE_WISHLIST_RED,
                payload: response.wishlist,
                message: response.message
            });

        }
        else {

            yield put({
                type: CREATE_WISHLIST_FAIL,
                message: response.message
            });

        }

    }
    catch (error) {

        yield put({
            type: CREATE_WISHLIST_FAIL,
            message: error.message || "Something Went Wrong"
        });

    }
}



// GET
export function* getSaga() {

    try {

        let response = yield call(
            getRecord,
            "wishlist"
        );

        yield put({
            type: GET_WISHLIST_RED,
            payload: response
        });

    }
    catch (error) {

        console.log(error);

    }

}

// DELETE
export function* deleteSaga(action) {

    try {

        let response = yield call(
            deleteRecord,
            "wishlist",
            action.payload.id
        );

        if (response.success) {

            yield put({
                type: DELETE_WISHLIST_SUCCESS,
                id: action.payload.id,
                message: response.message || "Deleted Successfully"
            });

        }
        else {

            yield put({
                type: DELETE_WISHLIST_FAIL,
                message: response.message || "Delete Failed"
            });

        }

    }
    catch (error) {

        yield put({
            type: DELETE_WISHLIST_FAIL,
            message: error.message || "Delete Failed"
        });

    }

}


// MAIN SAGA
export function* WishlistSagas() {
    yield takeEvery(
        CREATE_WISHLIST,
        createSaga
    );

    yield takeEvery(
        GET_WISHLIST,
        getSaga
    );

    yield takeEvery(
        DELETE_WISHLIST,
        deleteSaga
    );

}