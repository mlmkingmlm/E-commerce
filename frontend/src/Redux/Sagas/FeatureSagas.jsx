import { call, put, takeEvery } from "redux-saga/effects";
import {
    CREATE_FEATURE, CREATE_FEATURE_RED, CREATE_FEATURE_FAIL,
    DELETE_FEATURE, DELETE_FEATURE_RED, DELETE_FEATURE_FAIL,
    GET_FEATURE, GET_FEATURE_RED, GET_FEATURE_FAIL,
    UPDATE_FEATURE, UPDATE_FEATURE_RED, UPDATE_FEATURE_FAIL
} from "../Constants";

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services";


// ✅ CREATE
export function* createSaga(action) {
    try {
        const response = yield call(createRecord, "feature", action.payload);

        if (response?.success) {
            yield put({
                type: CREATE_FEATURE_RED,
                payload: response.feature,
                message: response.message
            });
        } else {
            yield put({
                type: CREATE_FEATURE_FAIL,
                message: response?.message || "Create failed"
            });
        }

    } catch (error) {
        yield put({
            type: CREATE_FEATURE_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ GET
export function* getSaga() {
    try {
        const response = yield call(getRecord, "feature");

        yield put({
            type: GET_FEATURE_RED,
            payload: response
        });

    } catch (error) {
        yield put({
            type: GET_FEATURE_FAIL,
            message: error?.message || "Fetch failed"
        });
    }
}


// ✅ UPDATE
export function* updateSaga(action) {
    try {
        const response = yield call(updateRecord, "feature", action.payload);

        if (response?.success) {
            yield put({
                type: UPDATE_FEATURE_RED,
                payload: response.data,
                message: response.message
            });
        } else {
            yield put({
                type: UPDATE_FEATURE_FAIL,
                message: response?.message || "Update failed"
            });
        }

    } catch (error) {
        yield put({
            type: UPDATE_FEATURE_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ DELETE
export function* deleteSaga(action) {
    try {
        const response = yield call(deleteRecord, "feature", action.payload.id);

        if (response?.success) {
            yield put({
                type: DELETE_FEATURE_RED,
                payload: action.payload.id,
                message: response.message
            });
        } else {
            yield put({
                type: DELETE_FEATURE_FAIL,
                message: response?.message || "Delete failed"
            });
        }

    } catch (error) {
        yield put({
            type: DELETE_FEATURE_FAIL,
            message: error?.message || "Something went wrong"
        });
    }
}


// ✅ WATCHER
export function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga);
    yield takeEvery(GET_FEATURE, getSaga);
    yield takeEvery(UPDATE_FEATURE, updateSaga);
    yield takeEvery(DELETE_FEATURE, deleteSaga);
}