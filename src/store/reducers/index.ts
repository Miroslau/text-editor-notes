import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./note-reducer";
import tagReducer from "./tag-reducer";

const rootReducers = combineReducers({
  note: noteReducer,
  tag: tagReducer,
});

export default rootReducers;
