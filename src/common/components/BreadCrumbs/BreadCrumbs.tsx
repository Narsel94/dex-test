import React, { useEffect, FC } from "react";
import { useMatches, Link } from "react-router-dom";
import styles from "./BreadCrumbs.module.css";

type TBreadCrumbs = {
  title?: string;
};

type TCrumb = {
  url: string;
  title: string;
};

const isCrumb = (obj: unknown): obj is TCrumb => {
  if (typeof obj === "object" && obj !== null) {
    return "url" in obj && "title" in obj;
  }
  return false;
};

export const BreadCrumbs: FC<TBreadCrumbs> = ({ title }) => {
  const matches = useMatches();

  let crumbs: TCrumb[] = [];

  if (matches) {
    matches.map((match) => {
      if (isCrumb(match.handle)) {
        crumbs.push(match.handle);
      }
    });
  }

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
              <span className={styles.link}>{title ? title : crumb.title}</span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
