import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export const ErrroElement = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h3>{error.data.message || "Something Goes Wrong"}</h3>
        <h4>{error.data.reason}</h4>

        {error.data}
      </div>
    );
  }

  return (
      <div>
         <h1>"Something Goes Wrong"</h1>
      </div>
  )
};
