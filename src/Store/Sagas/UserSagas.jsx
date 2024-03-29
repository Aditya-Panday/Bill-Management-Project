import { put, takeEvery } from "redux-saga/effects"
// takeevery watch actions
// put means modify that action

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/UserServices"
import { ADD_USER, ADD_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED, DELETE_USER, DELETE_USER_RED } from "../Constants"

function* getSaga() {
    try {
        let response = yield getRecord()
        yield put({ type: GET_USER_RED, payload: response })
    } catch (error) {
        console.error('Error getting user:', error);
        yield put({ type: 'GET_USER_ERROR', payload: error.message });
    }
}

function* addSaga(action) {
    console.log("User Sagas")
    try {
        let response = yield addRecord(action.payload)
        yield put({ type: ADD_USER_RED, payload: response })
    } catch (error) {
        console.error('Error adding user:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'GET_USER_ERROR', payload: error.message });
    }
}

function* updateSaga(action) {
    try {
        yield updateRecord(action.payload)
        yield put({ type: UPDATE_USER_RED, payload: action.payload })
    } catch (error) {
        console.error('Error updating user:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'GET_BILLS_ERROR', payload: error.message });
    }
}

function* deleteSaga(action) {
    try {
        yield deleteRecord(action.payload)
        yield put({ type: DELETE_USER_RED, payload: action.payload })
    } catch (error) {
        console.error('Error deleting user:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'GET_USER_ERROR', payload: error.message });
    }
}



export default function* UserSagas() {
    yield takeEvery(GET_USER, getSaga)
    yield takeEvery(ADD_USER, addSaga)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(DELETE_USER, deleteSaga)
}