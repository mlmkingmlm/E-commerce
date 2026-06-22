import { call, put, takeEvery } from "redux-saga/effects";
import { getRecord, updateRecord } from "./Services";
import { GET_USERS_RED, UPDATE_USERS_RED, UPDATE_USERS_FAIL, GET_USERS, UPDATE_USERS } from "../Constants";


export function* getSaga(action) {
    try {
        console.log("data1");

        let response = yield call(getRecord, "user");

        yield put({
            type: GET_USERS_RED,
            payload: response
        });

    } catch (error) {
        console.log("Saga Error ❌", error);
    }
}

export function* updateSaga(action) {
    try {
        let response = yield call(updateRecord, "user", action.payload, action.id);
        if (response.success) {
            yield put({
                type: UPDATE_USERS_RED,
                payload: response,
                message: response.message
            });
        }
        else {
            yield put({
                type: UPDATE_USERS_FAIL,
                message: response.message
            })
        }
    }
    catch (error) {
        yield put({
            type: UPDATE_USERS_FAIL,
            message: error
        })
    }
}

export function* UsersSagas() {
    console.log("dsts0")
    yield takeEvery(GET_USERS, getSaga)
    yield takeEvery(UPDATE_USERS, updateSaga)
}