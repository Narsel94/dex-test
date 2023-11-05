import React, { FC } from "react";
import styles from "./image-container.module.css";

type TImageContainer = {
  src: string;
};

const ImageContainer: FC<TImageContainer> = ({ src }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt="" className={styles.image} />
    </div>
  );
};

export default ImageContainer;
