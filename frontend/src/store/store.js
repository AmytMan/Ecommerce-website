import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import {authApi} from '../features/apiSlice'
import { productApi } from "../features/productApi";
import { categoryApi } from "../features/categoryApi";
const store = configureStore({
    reducer:{
        authentication:authSlice,
        [authApi.reducerPath] : authApi.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [categoryApi.reducerPath] : categoryApi.reducer

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware, productApi.middleware,categoryApi.middleware),
    devTools:true
})

export {store} ;