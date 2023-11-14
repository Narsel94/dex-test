import { FC } from "react";
import logo from "../../../../assests/images/logo.svg";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./logo.module.css";

type TLogo = {
  size: "medium" | "small";
  to?: string;
};

export const Logo: FC<TLogo> = ({ size, to }) => {
  const logoClass = classNames({
    [styles.medium]: Boolean(size === "medium"),
    [styles.small]: Boolean(size === "small"),
  });

  if (to) {
    return (
      <Link to={to}>
        <img src={logo} alt="Логотип" className={logoClass} />
      </Link>
    );
  }

  return <img src={logo} alt="Логотип" className={logoClass} />;
};
