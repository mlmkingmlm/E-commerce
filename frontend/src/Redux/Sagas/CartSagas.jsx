import { call, put, takeEvery } from "redux-saga/effects";
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED, GET_CART_FAIL, UPDATE_CART_FAIL, DELETE_CART_FAIL } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action) {
    let response = yield createRecord("cart", action.payload);
    yield put({ type: CREATE_CART_RED, payload: response });
}

export function* getSaga(action) {
    try {
        let response = yield call(getRecord, "cart");
        console.log(response)
        yield put({ type: GET_CART_RED, payload: response })
    }
    catch (error) {
        yield put({ type: GET_CART_FAIL, payload: response })
    }
}

export function* updateSaga(action) {
    try {
        let responce = yield call(updateRecord, "cart", action.payload, action.id);
        console.log(responce)
        yield put({ type: UPDATE_CART_RED, payload: responce })
    }
    catch (error) {
        yield put({ type: UPDATE_CART_FAIL, payload: responce })
    }
}

export function* deleteSaga(action) {
    try {
        let response = yield call(deleteRecord, "cart", action.payload);
        yield put({ type: DELETE_CART_RED, payload: response });
    }
    catch (error) {
        yield put({ type: DELETE_CART_FAIL, payload: responce })
    }
}

export function* CartSagas() {
    yield takeEvery(CREATE_CART, createSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)
}