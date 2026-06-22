import { call, put, takeEvery } from "redux-saga/effects";
import {
    CREATE_FAQ, CREATE_FAQ_FAIL, CREATE_FAQ_RED,
    DELETE_FAQ, DELETE_FAQ_FAIL, DELETE_FAQ_RED,
    GET_FAQ, GET_FAQ_FAIL, GET_FAQ_RED,
    UPDATE_FAQ, UPDATE_FAQ_FAIL, UPDATE_FAQ_RED
} from "../Constants";

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services";
import { act } from "react";


// ✅ CREATE
export function* createSaga(action) {
    try {
        const response = yield call(createRecord, "faq", action.payload);

        if (response?.success) {
            yield put({
                type: CREATE_FAQ_RED,
                payload: response.faq,
                message: response.message
            });
        } else {
            yield put({
                type: CREATE_FAQ_FAIL,
                message: response?.message || "Create failed"
            });
        }

    } catch (error) {
        yield put({
            type: CREATE_FAQ_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ GET
export function* getSaga() {
    try {
        const response = yield call(getRecord, "faq");

        yield put({
            type: GET_FAQ_RED,
            payload: response
        });

    } catch (error) {
        yield put({
            type: GET_FAQ_FAIL,
            message: error?.message || "Failed to fetch FAQ"
        });
    }
}


// ✅ UPDATE
export function* updateSaga(action) {
    console.log(action)
    try {
        const response = yield call(updateRecord, "faq", action.payload, action.id);

        if (response?.success) {
            yield put({
                type: UPDATE_FAQ_RED,
                payload: response.data,
                message: response.message
            });
        } else {
            yield put({
                type: UPDATE_FAQ_FAIL,
                message: response?.message || "Update failed"
            });
        }

    } catch (error) {
        yield put({
            type: UPDATE_FAQ_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ DELETE
export function* deleteSaga(action) {
    try {
        const response = yield call(deleteRecord, "faq", action.payload.id);

        if (response?.success) {
            yield put({
                type: DELETE_FAQ_RED,
                payload: action.payload.id, // 🔥 important for reducer
                message: response.message
            });
        } else {
            yield put({
                type: DELETE_FAQ_FAIL,
                message: response?.message || "Delete failed"
            });
        }

    } catch (error) {
        yield put({
            type: DELETE_FAQ_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ WATCHER
export function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga);
    yield takeEvery(GET_FAQ, getSaga);
    yield takeEvery(UPDATE_FAQ, updateSaga);
    yield takeEvery(DELETE_FAQ, deleteSaga);
}