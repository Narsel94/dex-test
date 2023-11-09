import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ContentHeader } from "../exports";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BurgerButton } from "../../../../common/components/exports";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { getAllPlayersThunk } from "../../players/asynk-thunk";
import styles from "./content-layout.module.css";

export const ContentLayout = () => {
  const isMobile = useMobileMediaQuery();
  const [isOpen, setOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/teams");
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllPlayersThunk());
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const onWrapperClick = () => {
    setOpen(false);
  };

  const nanWrapperClasses = classNames(styles.navWrapper, {
    [styles.navWrapperDesctop]: !isMobile,
    [styles.navWrapperMobile]: isMobile,
    [styles.navWrapperClose]: !isOpen && isMobile,
    [styles.navWrapperOpen]: isOpen && isMobile,
  });

  const mainClasses = classNames(styles.main, {
    [styles.mainMobile]: isMobile,
    [styles.mainDesc]: !isMobile,
  });

  return (
    <div className={styles.layout}>
      {isMobile && (
        <BurgerButton
          extraClasses={styles.button}
          onClick={() => setOpen(!isOpen)}
        />
      )}
      <ContentHeader />
      <div className={styles.contentDesctop}>
        <div className={nanWrapperClasses} onClick={onWrapperClick}>
          <NavigationBar />
        </div>
        <main className={mainClasses}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
