import { noteSliceState, noteType } from "../../types/notes-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState: noteSliceState = {
  notes: [],
  status: "idle",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<noteType[]>) {
      state.status = "succeeded";
      state.notes = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.errorMessage = action.payload;
    },
    deleteNotes: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      state.notes =
        state.notes && state.notes.filter((note) => note.id !== idToDelete);
    },
    // updateNote(state, { payload }) {
    //   const idx = state.notes.findIndex((note) => note.id === payload.id);
    //
    //   if (idx >= 0) {
    //     state.notes[idx] = payload;
    //   }
    // },
  },
});

export const { setNotes, setError, deleteNotes } = noteSlice.actions;

export const noteSelector = (state: RootState) => state.note;
