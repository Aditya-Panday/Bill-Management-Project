import { ADD_BILLS, DELETE_BILLS, GET_BILLS, UPDATE_BILLS } from "../Constants"
// import { addRecord } from "../Sagas/Services/BillsServices"

export function addBills(data) {
    console.log("action" + data.action)
    return {
        type: ADD_BILLS,
        payload: data
    }
}


export function getBills() {
    return {
        type: GET_BILLS
    }
}

export function updateBills(data) {
    return {
        type: UPDATE_BILLS,
        payload: data
    }
}


export function deleteBills(id) {
    console.log("action bills delete")
    return {
        type: DELETE_BILLS,
        payload: id
    }
}
