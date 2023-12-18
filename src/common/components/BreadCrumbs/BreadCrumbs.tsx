import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "./useBreadcrumbs";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import styles from "./BreadCrumbs.module.css";

type TBreadCrumbs = {
  title?: string;
};

export const BreadCrumbs: FC<TBreadCrumbs> = ({ title }) => {
  const crumbs = useBreadcrumbs();

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {crumbs.map((crumb, index) =>
          index !== crumbs.length - 1 ? (
            <li key={index}>
              <Link className={styles.link} to={crumb.url}>
                {crumb.title} <span className={styles.span}>/</span>
              </Link>
            </li>
          ) : (
            <li key={index}>
              <span className={styles.link}>
                {title ? capitalizeFirstLetter(title) : crumb.title}
              </span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
