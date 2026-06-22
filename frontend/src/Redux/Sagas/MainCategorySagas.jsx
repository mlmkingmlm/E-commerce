import { put, takeEvery, call } from "redux-saga/effects";
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index.js";
import { act } from "react";


export function* createSaga(action) {
    try {
        let response = yield call(createRecord, "maincategory", action.payload)

        if (response.success) {
            yield put({
                type: CREATE_MAINCATEGORY_RED,
                payload: response.resultObj,
                message: response.message
            })
        }
        else {
            yield put({
                type: CREATE_MAINCATEGORY_FAIL,
                error: response.message
            });
        }
    }
    catch (error) {
        yield put({
            type: CREATE_MAINCATEGORY_FAIL,
            error: "Something went wrong"
        });
    }
}

console.log("getRecord:", getRecord);

export function* getSaga(action) {
    let response = yield call(getRecord, "maincategory");
    yield put({ type: GET_MAINCATEGORY_RED, payload: response });
}

export function* updateSaga(action) {
    try {
        let response = yield call(updateRecord, "maincategory", action.payload, action.id);

        if (response.success) {
            yield put({
                type: UPDATE_MAINCATEGORY_RED,
                payload: response.resultObj,
                message: response.message
            });
        } else {
            yield put({
                type: "UPDATE_MAINCATEGORY_FAIL",
                error: response.message
            });
        }

    } catch (error) {
        yield put({
            type: "UPDATE_MAINCATEGORY_FAIL",
            error: "Something went wrong"
        });
    }
}

export function* deleteSaga(action) {
    console.log(action.payload.id)
    try {
        const response = yield call(deleteRecord, "maincategory", action.payload.id);
        console.log(response)

        yield put({
            type: "DELETE_MAINCATEGORY_SUCCESS",
            id: action.payload.id,
            message: response.message || "Deleted SuccessFully"
        })
    }
    catch (error) {
        yield put({
            type: "DELETE_MAINCATEGORY_FAIL",
            message: error.message || "Delete Failed"
        })
    }
}

export function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}