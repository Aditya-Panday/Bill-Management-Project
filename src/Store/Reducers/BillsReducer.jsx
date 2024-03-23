import { ADD_BILLS_RED, DELETE_BILLS_RED, GET_BILLS_RED, UPDATE_BILLS_RED } from "../Constants"
export default function BillsReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_BILLS_RED:
            console.log("Bill Reducer" )

            newState = [...state]   //spread make deep copy
            newState.push(action.payload)
            return newState;

        case GET_BILLS_RED:
            return action.payload.reverse()

        case UPDATE_BILLS_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            return state

        case DELETE_BILLS_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState;
        default:
            return state;
    }
}