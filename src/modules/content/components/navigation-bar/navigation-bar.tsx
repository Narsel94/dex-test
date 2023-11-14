import React from "react";
import classNames from "classnames";
import { IconInput } from "../../../../assests/icons/icon-input";
import { NavLinkWithIcon, ButtonWithIcon, UserInfo } from "../exports";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useNavigate } from "react-router";
import { removeCookie } from "../../../../common/helpers/cookies";

import styles from "./navigation-bar.module.css";

export const NavigationBar = () => {
  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();

  const conrainerClasses = classNames(styles.container, {
    [styles.desc]: !isMobile,
    [styles.mob]: isMobile,
  });

  const onLogoutClick = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("avatarUrl");
    navigate("/", {replace: true});
  };

  return (
    <div className={conrainerClasses}>
      {isMobile && <UserInfo isMobile={isMobile} />}
      <div className={styles.block}>
        <div className={styles.links}>
        <NavLinkWithIcon
            text="Teams"
            to="/teams"
            type={isMobile ? "row" : "column"}
            iconType="IconGroup"
          />
          <NavLinkWithIcon
            text="Players"
            to="/players"
            type={isMobile ? "row" : "column"}
            iconType="IconPerson"
          />
        </div>
        <ButtonWithIcon
          onClick={onLogoutClick}
          colored
          text="Sign Out"
          type={isMobile ? "row" : "column"}
        >
          <IconInput type="close" />
        </ButtonWithIcon>
      </div>
    </div>
  );
};
