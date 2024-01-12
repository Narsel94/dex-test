import { createAsyncThunk } from "@reduxjs/toolkit";
import { TSignInRequest, TSignInResponse, TSignUpRequest, TSignUpResponse, TUpdateUser, TUpdateUserRequest } from "../../api/helpers/types/types";
import { RootState } from "../../core/redux/store";
import { signInRequest } from "../../api/auth/signIn";
import { isCustomError } from "../../api/helpers/isCustomError";
import { signUpRequest } from "../../api/auth/signUp";
import { updateUserRequest } from "../../api/auth/updateUser";

export type TAuthThunk<T extends any> = {
  ok: boolean;
  data?: T;
  error?: any;
};

export const signInThunk = createAsyncThunk<
  TAuthThunk<TSignInResponse>,
  TSignInRequest,
  { state: RootState }
>("auth/signIn", async (data) => {
  try {
    const response = await signInRequest(data);
    if (!response.token) {
      throw new Error("401");
    }
    return { ok: true, data: response };
  } catch (error) {
    if (isCustomError(error)) {
      return { ok: false, error: error.status.toString() };
    }
    if (error instanceof Error) {
      return { ok: false, error: error.message || "Failed to submit form" };
    } else {
      return { ok: false, error: "An unknown error occurred" };
    }
  }
});

export const signUpThunk = createAsyncThunk<
  TAuthThunk<TSignUpResponse>,
  TSignUpRequest,
  { state: RootState }
>("auth/signUn", async (data) => {
  try {
    const response = await signUpRequest(data);
    if (!response.token) {
      throw new Error("401");
    }
    return { ok: true, data: response };
  } catch (error) {
    if (isCustomError(error)) {
      return { ok: false, error: error.status.toString() };
    }
    if (error instanceof Error) {
      return { ok: false, error: error.message || "Failed to submit form" };
    } else {
      return { ok: false, error: "An unknown error occurred" };
    }
  }
});

export const updateUserThunk = createAsyncThunk<
  TAuthThunk<TUpdateUserRequest>,
  TUpdateUser
>("auth/updateUser", async (data) => {
  try {
    const response = await updateUserRequest(data);
    if (response.ok) {
      return response;
    } else {
      if (response.error.status) {
        return {
          ok: response.ok,
          error: response.error.status,
        };
      } else {
        return response;
      }
    }
  } catch (error) {
    if (isCustomError(error)) {
      return { ok: false, error: error.status.toString(), data: undefined };
    }
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message || "Failed to submit form",
        data: undefined,
      };
    } else {
      return {
        ok: false,
        error: "An unknown error occurred",
        data: undefined,
      };
    }
  }
});
