import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

// SLICE

export interface IApplicationStore {
  isLoading: boolean;
  isServiceActive: boolean | null;
  isMenuOpen: boolean;
  activePage: string | null;
  pageTitle: string | null;
  isLogin: boolean;
  jwt: string | null;
  user: string | null;
}

const applicationSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isServiceActive: null,
    isMenuOpen: true,
    activePage: null,
    pageTitle: null,
    isLogin: false,
    jwt: null,
    user: null,
  } as IApplicationStore,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.jwt = action.payload.token;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.jwt = null;
      state.user = null;
    },
    menu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    title: (state, action) => {
      state.pageTitle = action.payload;
    },
    activePage: (state, action) => {
      state.activePage = action.payload;
    },
    serviceActive: (state, action) => {
      state.activePage = action.payload;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  login,
  logout,
  menu,
  title,
  activePage,
  serviceActive,
  loading,
} = applicationSlice.actions;

export default applicationSlice.reducer;

// ACTIONS

export const setLogin = (value: any) => async (dispatch: Dispatch) => {
  dispatch(login(value));
};

export const setLogout = () => async (dispatch: Dispatch) => {
  dispatch(logout());
};

export const toggleMenu = () => async (dispatch: Dispatch) => {
  dispatch(menu());
};

export const setPageTitle = (value: string) => async (dispatch: Dispatch) => {
  dispatch(title(value));
};

export const setActivePage = (value: string) => async (dispatch: Dispatch) => {
  dispatch(activePage(value));
};

export const setServiceActive =
  (value: string) => async (dispatch: Dispatch) => {
    dispatch(serviceActive(value));
  };

export const setLoading = (value: boolean) => async (dispatch: Dispatch) => {
  dispatch(loading(value));
};
