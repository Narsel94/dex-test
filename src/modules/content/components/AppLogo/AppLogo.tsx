import { FC } from "react";
import logo from "../../../../assests/images/logo-image.svg";
import { Link } from "react-router-dom";
import styles from "./AppLogo.module.css";

type TLogo = {
  to?: string;
};

export const Logo: FC<TLogo> = ({ to }) => {
  if (to) {
    return (
      <Link className={styles.logo} to={to}>
        <img src={logo} alt="Логотип" className={styles.logo} />
      </Link>
    );
  }

  return <img src={logo} alt="Логотип" className={styles.logo} />;
};
