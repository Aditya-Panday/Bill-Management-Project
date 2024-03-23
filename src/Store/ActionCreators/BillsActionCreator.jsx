import { ADD_BILLS, DELETE_BILLS, GET_BILLS, UPDATE_BILLS } from "../Constants"
// import { addRecord } from "../Sagas/Services/BillsServices"

export function addBills(data) {
    console.log("action" + data.action )
    return {
        type: ADD_BILLS,
        payload: data
    }
}
// export function addBills(data) {
//     // Returning a function instead of an object to enable asynchronous operations
//     return async (dispatch) => {
//         try {
//             console.log("action" + data.action);
//             // Assuming addRecord function returns a promise
//             await addRecord(data);
//             // If the above statement doesn't throw an error, dispatch the success action
//             dispatch({
//                 type: ADD_BILLS,
//                 payload: data
//             });
//         } catch (error) {
//             // If an error occurs, dispatch an error action
//             dispatch({
//                 type: "ADD_BILLS_ERROR",
//                 payload: error.message // You can pass the error message or any other relevant information
//             });
//         }
//     };
// }

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

export function deleteBills(data) {
    return {
        type: DELETE_BILLS,
        payload: data
    }
}