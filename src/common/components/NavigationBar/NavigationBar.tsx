import React from "react";
import classNames from "classnames";
import { IconPerson, IconGroup } from "../../../assests/icons/exports";
import { IconInput } from "../../../assests/icons/icon-input";
import { ButtonWithIcon, UserInfo } from "..";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import { useLocation, useNavigate } from "react-router";
import { removeCookie } from "../../helpers/cookies";
import { Link } from "react-router-dom";

import styles from "./NavigationBar.module.css";

export const NavigationBar = () => {
  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogoutClick = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("avatarUrl");
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.container}>
      {isMobile && <UserInfo  />}
      <div className={styles.block}>
        <div className={styles.links}>
          <Link className={styles.link} to="/teams">
            <ButtonWithIcon
              text="Teams"
              type={isMobile ? "row" : "column"}
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
              type={isMobile ? "row" : "column"}
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
          text="Sign Out"
          type={isMobile ? "row" : "column"}
        >
          <IconInput type="close" />
        </ButtonWithIcon>
      </div>
    </div>
  );
};
