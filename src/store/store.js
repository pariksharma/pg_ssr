import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import footerReducer from "../components/footer/footerSlice";
import masterContentReducer from "../containers/home/masterContentSlice";
import profileReducer from "../containers/profile/profileSlice";
import libraryReducer from "../containers/library/librarySlice";
import purchaseHistoryReducer from "../containers/purchaseHistory/purchaseHistorySlice";
import notificationReducer from "../containers/notificationTab/notificationSlice";



const combinereducer = combineReducers({
    allCategory: masterContentReducer,
    footerDetail: footerReducer,
    profileDetail: profileReducer,
    libraryDetail: libraryReducer,
    purchaseHistory: purchaseHistoryReducer,
    notification: notificationReducer,
})

const rootReducer = (state, action) => {
    if (action.type == 'logout/logoutAction') {
        state = {}
    }
    return combinereducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    // reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    //  :{
    //     all_category : masterContentReducer
    // }
})

export const persistor = store;