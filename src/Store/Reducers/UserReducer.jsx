import { ADD_USER_RED, GET_USER_RED, UPDATE_USER_RED, DELETE_USER_RED } from "../Constants"
export default function UserReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_USER_RED:
            console.log("User Reducer")
            newState = [...state]   //spread make deep copy
            newState.push(action.payload)
            return newState;

        case GET_USER_RED:
            return action.payload.reverse()

        case UPDATE_USER_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            return state

        case DELETE_USER_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState;

        default:
            return state;
    }
}