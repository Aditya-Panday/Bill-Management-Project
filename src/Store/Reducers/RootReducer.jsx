import { combineReducers } from "@reduxjs/toolkit";

import BillsReducer from "./BillsReducer"
import UserReducer from "./UserReducer"

export default combineReducers({
    BillsStateData: BillsReducer,
    UserStateData: UserReducer

})