import { put, takeEvery } from "redux-saga/effects";
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action){
    let response = yield createRecord("setting",action.payload);
    yield put({type:CREATE_SETTING_RED, payload:response});
}

export function* getSaga(action){
    let response = yield getRecord("setting");
    yield put({type:GET_SETTING_RED, payload:response});
}

export function* updateSaga(action){
    let response = yield updateRecord("setting",action.payload);
    yield put({type:UPDATE_SETTING_RED, payload:response});
}

export function* deleteSaga(action){
    let response = yield deleteRecord("setting",action.payload);
    yield put({type:DELETE_SETTING_RED, payload:response});
}

export function* SettingSagas(){
    yield takeEvery(CREATE_SETTING, createSaga)
    yield takeEvery(GET_SETTING, getSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
    yield takeEvery(DELETE_SETTING, deleteSaga)
}