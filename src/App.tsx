import React from "react";
import { RouterProvider} from "react-router-dom";
import {  router2 } from "./routes/routes";

function App() {

  return (
      <RouterProvider router={router2} />
  );
}

export default App;
