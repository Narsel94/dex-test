import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAuthSlice } from "./types";
import { setCookie, removeCookie } from "../../common/helpers/cookies";
import {
  TAuthThunk,
  signInThunk,
  signUpThunk,
  updateUserThunk,
} from "./asynkThunk";
import {
  TSignInResponse,
  TSignUpResponse,
} from "../../api/helpers/types/types";

const initialState: TAuthSlice = {
  isLoading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut() {
      removeCookie("token");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("avatarUrl");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        signInThunk.fulfilled,
        (state, action: PayloadAction<TAuthThunk<TSignInResponse>>) => {
          state.isLoading = false;
          if (action.payload.ok) {
            action.payload.data?.name &&
              sessionStorage.setItem("name", action.payload.data.name);
            action.payload.data?.avatarUrl &&
              sessionStorage.setItem(
                "avatarUrl",
                action.payload.data.avatarUrl
              );
            action.payload.data?.token &&
              setCookie("token", action.payload.data.token);
          } else {
            state.error = action.payload.error;
            console.error("Failed to submit form:", action.payload.error);
          }
        }
      )
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        signUpThunk.fulfilled,
        (state, action: PayloadAction<TAuthThunk<TSignUpResponse>>) => {
          state.isLoading = false;
          if (action.payload.ok) {
            action.payload.data?.name &&
              sessionStorage.setItem("name", action.payload.data.name);
            action.payload.data?.avatarUrl &&
              sessionStorage.setItem(
                "avatarUrl",
                action.payload.data.avatarUrl
              );
            action.payload.data?.token &&
              setCookie("token", action.payload.data.token);
          } else {
            state.error = action.payload.error;
            console.error("Failed to submit form:", action.payload.error);
          }
        }
      )
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.ok && action.payload.data) {
          action.payload.data.avatarUrl &&
            sessionStorage.setItem("avatarUrl", action.payload.data.avatarUrl);
          action.payload.data?.userName &&
            sessionStorage.setItem("name", action.payload.data.userName);
        } else if (!action.payload.ok) {
          state.error = action.payload?.error;
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
