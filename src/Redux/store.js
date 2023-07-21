import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleContacts";

export const store = configureStore({
  reducer: { toggle: toggleReducer },
});
