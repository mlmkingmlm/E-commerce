import { call, put, takeEvery } from "redux-saga/effects";
import { CREATE_PRODUCT, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RED } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action) {
    try {
        let response = yield call(createRecord, "product", action.payload);
        if (response.success) {
            yield put({
                type: CREATE_PRODUCT_RED,
                payload: response.product,
                message: response.message
            });
        }
        else {
            yield put({
                type: CREATE_PRODUCT_FAIL,
                message: response.message
            })
        }
    }
    catch (error) {
        yield put({
            type: CREATE_PRODUCT_FAIL,
            message: response.message
        })
    }
}

export function* getSaga(action) {
    let response = yield getRecord("product");
    yield put({ type: GET_PRODUCT_RED, payload: response });
}

export function* updateSaga(action) {
    try {
        let response = yield updateRecord("product", action.payload, action.id);
        if (response.success) {
            console.log("fsds")
            yield put({
                type: UPDATE_PRODUCT_RED,
                payload: response.data,
                message: response.message
            });
            console.log("pappu")
        }
        else {
            yield put({
                type: UPDATE_PRODUCT_FAIL,
                message: response.message
            })
        }
    }
    catch (error) {
        yield put({
            type: UPDATE_PRODUCT_FAIL,
            message: error || "Some Thing went wrong"
        })
    }
}

export function* deleteSaga(action) {
    try {
        let response = yield call(deleteRecord, "product", action.payload.id);
        if (response.success) {
            console.log("success")
            yield put({
                type: DELETE_PRODUCT_RED,
                id: action.payload.id,
                message: response.message || "Deleted SuccessFully"
            });
            console.log("success2")
        }
        else {
            yield put({
                type: DELETE_PRODUCT_FAIL,
                message: message.response
            })
        }
    }
    catch (error) {
        yield put({
            type: DELETE_PRODUCT_FAIL,
            message: error
        })
    }
}

export function* ProductSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)
}