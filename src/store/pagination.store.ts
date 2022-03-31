import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

// SLICE

const patinationSlice = createSlice({
  name: "patination",
  initialState: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
  },
  reducers: {
    count: (state, action) => {
      state.count = action.payload;
    },
    page: (state, action) => {
      state.page = action.payload;
    },
    rowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const { count, page, rowsPerPage } = patinationSlice.actions;

export default patinationSlice.reducer;

// ACTIONS

export const setCount = (value: any) => async (dispatch: Dispatch) => {
  dispatch(count(value));
};

export const setPage = (value: any) => async (dispatch: Dispatch) => {
  dispatch(page(value));
};

export const setRowsPerPage = (value: any) => async (dispatch: Dispatch) => {
  dispatch(rowsPerPage(value));
};
