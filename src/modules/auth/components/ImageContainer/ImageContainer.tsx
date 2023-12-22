import React, { FC } from "react";
import styles from "./ImageContainer.module.css";

type TImageContainer = {
  src: string;
};

export const ImageContainer: FC<TImageContainer> = ({ src }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt="background" className={styles.image} />
    </div>
  );
};

