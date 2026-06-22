import { put, takeEvery, call } from "redux-saga/effects";
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, CREATE_SUBCATEGORY_FAIL, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_FAIL, DELETE_SUBCATEGORY_SUCCESS, DELETE_SUBCATEGORY_FAIL } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";
import { act } from "react";


export function* createSaga(action) {
    console.log(action.payload)
    try {
        let response = yield call(createRecord, "subcategory", action.payload);
        console.log(response)

        if (response.success) {
            yield put({
                type: CREATE_SUBCATEGORY_RED,
                payload: response.resultObj,
                message: response.message
            })
        }
        else {
            yield put({
                type: CREATE_SUBCATEGORY_FAIL,
                error: response.message
            });
        }
    }
    catch (error) {
        yield put({
            type: CREATE_SUBCATEGORY_FAIL,
            error: "Something went wrong"
        });
    }

}

export function* getSaga(action) {
    try {
        let response = yield call(getRecord, "subcategory");
        yield put({ type: GET_SUBCATEGORY_RED, payload: response });
    }
    catch (error) {

    }
}

export function* updateSaga(action) {
    try {
        let response = yield call(updateRecord, "subcategory", action.payload, action.id);
        if (response.success) {
            yield put(
                {
                    type: UPDATE_SUBCATEGORY_RED,
                    payload: response,
                    message: response.message
                });
        }
        else {
            yield put({
                type: UPDATE_SUBCATEGORY_FAIL,
                message: response.message
            })
        }
    }
    catch (error) {
        yield put({
            type: UPDATE_SUBCATEGORY_FAIL,
            message: response.message || "SomeThing went wrong"
        })
    }
}

export function* deleteSaga(action) {
    try {
        let response = yield call(deleteRecord, "subcategory", action.payload.id);
        if (response.success) {
            yield put({
                type: DELETE_SUBCATEGORY_SUCCESS,
                id: action.payload.id,
                message: response.message || "Deleted SuccessFully"
            })
        }
        else {
            yield put({
                type: DELETE_SUBCATEGORY_FAIL,
                message: error.message || "Delete Failed"
            })
        }

    }
    catch (error) {
        yield put({
            type: DELETE_SUBCATEGORY_FAIL,
            message: error.message || "Delete Failed"
        })
    }
}

export function* SubcategorySagas() {
    console.log("subcategory")
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)
}