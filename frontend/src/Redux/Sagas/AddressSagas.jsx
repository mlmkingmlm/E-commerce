import { call, put, take, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";
import { CREATE_ADDRESS, CREATE_ADDRESS_FAIL, CREATE_ADDRESS_RED, DELETE_ADDRESS_RED, GET_ADDRESS, GET_ADDRESS_RED, UPDATE_ADDRESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_RED } from "../Constants";

export function* createSaga(action) {
    try {
        const response = yield call(createRecord, "address", action.payload);
        console.log(response)
        yield put({ type: CREATE_ADDRESS_RED, payload: response.resultObj });
    }
    catch (error) {
        yield put({ type: CREATE_ADDRESS_FAIL, payload: response })
    }
};

export function* getSaga(action) {
    try {
        const response = yield call(getRecord, "address");
        yield put({ type: GET_ADDRESS_RED, payload: response });
    }
    catch (error) {
        yield put({ type: GET_ADDRESS_FAIL, payload: response })
    }
}

export function* updateSaga(action) {
    try {
        const response = yield call(updateRecord, "address", action.payload, action.id);
        if (response.status) {
            yield put({ type: UPDATE_ADDRESS_RED, payload: response.resultObj });
        }
        else {
            yield put({ type: UPDATE_ADDRESS_FAIL, payload: response })
        }
    }
    catch (error) {
        yield put({ type: UPDATE_ADDRESS_FAIL, payload: response })
    }
}

export function* deleteSaga(action){
    try{
        const response = yield call(deleteRecord, "address", action.payload);
        if(response.status){
            yield put({type:DELETE_ADDRESS_RED, payload:})
        }
    }
}

export function* AddressSagas() {
    yield takeEvery(CREATE_ADDRESS, createSaga);
    yield takeEvery(GET_ADDRESS, getSaga)
    yield takeEvery(UPDATE_ADDRESS, updateSaga)
}
