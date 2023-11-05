import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./auth-layout.module.css";

const AuthLayout:React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      if (location.pathname === '/') {
    navigate('/sign-in')
    
  }
  }, [location.pathname])


  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;