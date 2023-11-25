import React, { FC } from "react";
import image from "../../assests/images/not-found.svg";
import styles from "./NotFound.module.css";

export const NotFound: FC = () => {
  return (
    <div className={styles.page}>
      <img className={styles.image} src={image} alt="Страница не найдена" />
      <div className={styles.message}>
        <h1 className={styles.title}>Page not found</h1>
        <h3 className={styles.subtitle}>
          Sorry, we can’t find what you’re looking for
        </h3>
      </div>
    </div>
  );
};
