import { put, takeEvery } from "redux-saga/effects";
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services";


export function* createSaga(action){
    let response = yield createRecord("testimonial",action.payload);
    yield put({type:CREATE_TESTIMONIAL_RED, payload:response});
}

export function* getSaga(action){
    let response = yield getRecord("testimonial");
    yield put({type:GET_TESTIMONIAL_RED, payload:response});
}

export function* updateSaga(action){
    let response = yield updateRecord("testimonial",action.payload);
    yield put({type:UPDATE_TESTIMONIAL_RED, payload:response});
}

export function* deleteSaga(action){
    let response = yield deleteRecord("testimonial",action.payload);
    yield put({type:DELETE_TESTIMONIAL_RED, payload:response});
}

export function* TestimonialSagas(){
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)
}