import { call, put, takeEvery } from "redux-saga/effects";
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED, CREATE_BRAND_FAIL, DELETE_BRAND_FAIL, DELETE_BRAND_SUCCESS, UPDATE_BRAND_FAIL } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action) {
    try {
        let response = yield call(createRecord, "brand", action.payload);
        if (response.success) {
            console.log("success")
            yield put({
                type: CREATE_BRAND_RED,
                payload: response.brand,
                message: response.message
            });
            console.log("success2")
        }
        else {
            yield put({
                type: CREATE_BRAND_FAIL,
                error: response.message
            })
        }
    }
    catch (error) {
        console.log("failed", error)
        yield put({
            type: CREATE_BRAND_FAIL,
            error: error
        })
    }
}

export function* getSaga(action) {
    let response = yield getRecord("brand");
    yield put({ type: GET_BRAND_RED, payload: response });
}

export function* updateSaga(action) {
    try {
        let response = yield call(updateRecord, "brand", action.payload, action.id);
        if (response.success) {
            yield put({
                type: UPDATE_BRAND_RED,
                payload: response,
                message: response.message
            });
        }
        else {
            yield put({
                type: UPDATE_BRAND_FAIL,
                message: response.message
            })
        }
    }
    catch (error) {
        yield put({
            type: UPDATE_BRAND_FAIL,
            message: error
        })
    }
}

export function* deleteSaga(action) {
    try {
        let response = yield call(deleteRecord, "brand", action.payload.id);
        if (response.success) {
            yield put({
                type: DELETE_BRAND_SUCCESS,
                id: action.payload.id,
                message: response.message || "Deleted SuccessFully"
            })
        }
        else {
            yield put({
                type: DELETE_BRAND_FAIL,
                message: error.message || "Delete Failed"
            })
        }

    }
    catch (error) {
        yield put({
            type: DELETE_BRAND_FAIL,
            message: error.message || "Delete Failed"
        })
    }
}

export function* BrandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)
}