import { all } from "redux-saga/effects"
import billsSaga from "./BillsSagas"
import UserSagas from "./UserSagas"


export default function* RootSaga() {
    yield all([
        billsSaga(),
        UserSagas()

    ])
}