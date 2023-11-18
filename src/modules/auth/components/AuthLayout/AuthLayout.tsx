import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export const AuthLayout:React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      if (location.pathname === '/') {
    navigate('/sign-in')
    
  }
  }, [location.pathname, navigate])


  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
