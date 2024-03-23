import { put, takeEvery } from "redux-saga/effects"
// takeevery watch actions
// put means modify that action

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/UserServices"
import { ADD_USER, ADD_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED, DELETE_USER, DELETE_USER_RED } from "../Constants"

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_USER_RED, payload: response })
}

function* addSaga(action) {
    console.log("User Sagas")
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_USER_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_USER_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_USER_RED, payload: action.payload })
}



export default function* UserSagas() {
    yield takeEvery(GET_USER, getSaga)
    yield takeEvery(ADD_USER, addSaga)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(DELETE_USER, deleteSaga)
}