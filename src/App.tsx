import React from "react";
import { RouterProvider } from "react-router-dom";
import styles from './app.module.css'
import { router, useRoute } from "./routes/routes";

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={useRoute()} />
    </div>
  );
}

export default App;
