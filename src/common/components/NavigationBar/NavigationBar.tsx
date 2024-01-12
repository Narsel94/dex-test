import React from "react";
import { IconPerson, IconGroup } from "../../../assests/icons/exports";
import { IconInput } from "../../../assests/icons/icon-input";
import { ButtonWithIcon, UserInfo } from "..";
import { useLocation, useNavigate } from "react-router";
import { removeCookie } from "../../helpers/cookies";
import { Link } from "react-router-dom";


import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logOut } from "../../../modules/auth/authSlice";

import styles from "./NavigationBar.module.css";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const location = useLocation();

  const onLogoutClick = () => {
    dispatch(logOut())
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}><UserInfo/></div>
      <div className={styles.block}>
        <div className={styles.links}>
          <Link className={styles.link} to="/teams">
            <ButtonWithIcon
              text="Teams"
              isActive={Boolean(location.pathname.includes("/teams"))}
            >
              <IconGroup
                type={
                  Boolean(location.pathname.includes("/teams"))
                    ? "secondary"
                    : "primary"
                }
              />
            </ButtonWithIcon>
          </Link>
          <Link className={styles.link} to="/players">
            <ButtonWithIcon
              text="Players"
              isActive={Boolean(location.pathname.includes("/players"))}
            >
              <IconPerson
                type={
                  Boolean(location.pathname.includes("/players"))
                    ? "secondary"
                    : "primary"
                }
              />
            </ButtonWithIcon>
          </Link>
        </div>
        <ButtonWithIcon
          onClick={onLogoutClick}
          colored
          text="Sign out"
        >
          <IconInput type="close" />
        </ButtonWithIcon>
      </div>
    </div>
  );
};
