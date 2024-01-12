import { TCustomError } from "./types/types";

export const isCustomError = (error: any): error is TCustomError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isCustomError" in error &&
    "status" in error &&
    typeof error.isCustomError === "boolean" &&
    typeof error.status === "number"
  );
};