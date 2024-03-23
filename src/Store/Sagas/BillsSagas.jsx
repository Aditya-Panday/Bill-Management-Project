import { put, takeEvery } from "redux-saga/effects"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/BillsServices"
import { ADD_BILLS, ADD_BILLS_RED, DELETE_BILLS, DELETE_BILLS_RED, GET_BILLS, GET_BILLS_RED, UPDATE_BILLS, UPDATE_BILLS_RED } from "../Constants"

function* getSaga() {
    try {
        let response = yield getRecord();
        yield put({ type: GET_BILLS_RED, payload: response });
    } catch (error) {
        console.error('Error getting bills:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'GET_BILLS_ERROR', payload: error.message });
    }
}

function* addSaga(action) {
    try {
        let response = yield addRecord(action.payload);
        yield put({ type: ADD_BILLS_RED, payload: response });
    } catch (error) {
        console.error('Error adding bill:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'ADD_BILLS_ERROR', payload: error.message });
    }
}

function* updateSaga(action) {
    try {
        yield updateRecord(action.payload);
        yield put({ type: UPDATE_BILLS_RED, payload: action.payload });
    } catch (error) {
        console.error('Error updating bill:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'UPDATE_BILLS_ERROR', payload: error.message });
    }
}

function* deleteSaga(action) {
    try {
        yield deleteRecord(action.payload);
        yield put({ type: DELETE_BILLS_RED, payload: action.payload });
    } catch (error) {
        console.error('Error deleting bill:', error);
        // Dispatch an action indicating the error
        yield put({ type: 'DELETE_BILLS_ERROR', payload: error.message });
    }
}

export default function* billsSaga() {
    yield takeEvery(GET_BILLS, getSaga);
    yield takeEvery(ADD_BILLS, addSaga);
    yield takeEvery(UPDATE_BILLS, updateSaga);
    yield takeEvery(DELETE_BILLS, deleteSaga);
}


// import { put, takeEvery } from "redux-saga/effects"
// // takeevery watch actions
// // put means modify that action

// import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/BillsServices"
// import { ADD_BILLS, ADD_BILLS_RED, DELETE_BILLS, DELETE_BILLS_RED, GET_BILLS, GET_BILLS_RED, UPDATE_BILLS, UPDATE_BILLS_RED } from "../Constants"

// function* getSaga() {
//     let response = yield getRecord()
//     yield put({ type: GET_BILLS_RED, payload: response })
// }

// function* addSaga(action) {
//     console.log("Bill Sagas")
//     let response = yield addRecord(action.payload)
//     yield put({ type: ADD_BILLS_RED, payload: response })
// }

// function* updateSaga(action) {
//     yield updateRecord(action.payload)
//     yield put({ type: UPDATE_BILLS_RED, payload: action.payload })
// }

// function* deleteSaga(action) {
//     yield deleteRecord(action.payload)
//     yield put({ type: DELETE_BILLS_RED, payload: action.payload })
// }

// export default function* billsSaga() {
//     yield takeEvery(GET_BILLS, getSaga)
//     yield takeEvery(ADD_BILLS, addSaga)
//     yield takeEvery(UPDATE_BILLS, updateSaga)
//     yield takeEvery(DELETE_BILLS, deleteSaga)
// }