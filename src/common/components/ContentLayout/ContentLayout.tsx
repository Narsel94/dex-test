import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppLogo, UserInfo } from "..";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { BurgerButton } from "..";
import styles from "./ContentLayout.module.css";

export const ContentLayout = () => {
  const isMobile = useMobileMediaQuery();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/teams");
    }
  }, [location.pathname]);

  useEffect(() => {
    {isMobile && setOpen(false);}
  }, [isMobile]);

  const onWrapperClick = () => {
    setOpen(false);
  };

  const nanWrapperClasses = classNames(styles.navWrapper, {
    [styles.navWrapperClose]: !isOpen,
  });

  const overlay = classNames(styles.overlay, {
    [styles.overlayOpen ]: isOpen
  })

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.buttonWrapper}>
        <BurgerButton
            extraClasses={styles.button}
            onClick={() => setOpen(!isOpen)}
            status={isOpen}
          />
        </div>
        <AppLogo to="/teams"  />
        <div className={styles.infoWrapper}><UserInfo /></div>
      </div>
      <div className={styles.contentDesctop}>
        <div className={overlay}></div>
        <div className={nanWrapperClasses} onClick={onWrapperClick}>
          <NavigationBar />
        </div>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
