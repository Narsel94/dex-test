import React, { FC, useMemo, } from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./navlink-with-icon.module.css";
import {
  IconGroup,
  IconPerson,
  IconInput,
  TIconsTypes,
} from "../../../../assests/icons/exports";

type TNavLinkWithIcon = NavLinkProps & {
  iconType: TIconsTypes;
  text: string;
  type: "column" | "row";
  to: string;
};

export const NavLinkWithIcon: FC<TNavLinkWithIcon> = ({
  iconType,
  text,
  type,
  to,
  ...rest
}) => {
  const location = useLocation()
  const linkClasses = classNames(styles.base, {
      [styles.column]: type === "column",
      [styles.row]: type === "row",
      [styles.active]: location.pathname.includes(to),
    });

  const render = useMemo(() => {
    if (iconType === "IconGroup")
      return IconGroup({ type: Boolean(location.pathname.includes(to)) ? "secondary" : "primary" });
    if (iconType === "IconPerson")
      return IconPerson({ type: Boolean(location.pathname.includes(to)) ? "secondary" : "primary" });
    if (iconType === "IconInput")
      return IconInput({ type: Boolean(location.pathname.includes(to)) ? "secondary" : "primary" });
    return IconInput({ type: Boolean(location.pathname.includes(to)) ? "secondary" : "primary" });
  }, [location.pathname.includes(to), iconType]);

  return (
    <NavLink className={linkClasses} to={to} {...rest}>
      {render}
      {text}
    </NavLink>
  );
};

const MemoNavLink = React.memo(NavLinkWithIcon);
export default MemoNavLink;
