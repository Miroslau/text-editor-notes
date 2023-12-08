import { tagType } from "../../types/tag-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface TagsState {
  tags: string[];
}

const initialState: TagsState = {
  tags: [],
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<{ tags: string[] }>) => {
      state.tags = action.payload.tags;
    },
  },
});

export const { setTags } = tagSlice.actions;

export const tagsSelector = (state: RootState) => state.tag;
