import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import mailReducer from "./slices/mailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
  },
});

export default store;