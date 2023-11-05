import React, { useEffect, FC } from "react";
import { useMatches, Link } from "react-router-dom";
import styles from "./bread-crumb.module.css";

type TBreadCrumbs = {
  title?: string
}

export const BreadCrumbs:FC<TBreadCrumbs> = ({title}) => {
  const matches = useMatches();

  let crumbs: any[] = [];

  if (matches) {
    matches.map((match) => {
      if (match.handle) {
        crumbs.push(match.handle);
      }
    });
  }

  const crumbArr = crumbs.map((crumb) => Object.values(crumb));

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
              <span className={styles.link}>{title? title : crumb.title}</span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
