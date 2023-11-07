import React from "react";
import { RouterProvider, useLocation, useNavigate } from "react-router-dom";
import styles from './app.module.css'
import { router, useRoute, router2 } from "./routes/routes";
import { getCookie } from "./common/helpers/helpers";

function App() {

  return (
    // <div className={styles.app}>
      <RouterProvider router={router2} />
    // </div>
  );
}

export default App;
