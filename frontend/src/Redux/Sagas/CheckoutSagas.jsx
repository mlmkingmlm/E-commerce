import { call, put, takeEvery } from "redux-saga/effects";
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED, CREATE_CHECKOUT_FAIL, GET_CHECKOUT_FAIL } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action) {
    try {
        let response = yield call(createRecord, "checkout", action.payload);
        if (response.success) {
            yield put({ type: CREATE_CHECKOUT_RED, payload: response.resultObj });
        }
    }
    catch (error) {
        yield put({ type: CREATE_CHECKOUT_FAIL, payload: error.message })
    }
}

export function* getSaga(action) {
    try {
        let response = yield call(getRecord, "checkout");
        yield put({ type: GET_CHECKOUT_RED, payload: response.resultObj });
    }
    catch (error) {
        yield put({ type: GET_CHECKOUT_FAIL, payload: error.message })
    }
}

export function* updateSaga(action) {
    let response = yield updateRecord("checkout", action.payload);
    yield put({ type: UPDATE_CHECKOUT_RED, payload: response });
}

export function* deleteSaga(action) {
    let response = yield deleteRecord("checkout", action.payload);
    yield put({ type: DELETE_CHECKOUT_RED, payload: response });
}

export function* CheckoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)
}