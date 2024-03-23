import { ADD_USER, GET_USER, UPDATE_USER, DELETE_USER } from "../Constants"

export function addUser(data) {
    console.log("action" + data.action)
    return {
        type: ADD_USER,
        payload: data
    }
}

export function getUser() {
    return {
        type: GET_USER
    }
}

export function updateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export function deleteUser(data) {
    return {
        type: DELETE_USER,
        payload: data
    }
}

