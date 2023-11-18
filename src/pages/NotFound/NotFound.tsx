import React, {FC} from "react";
import classNames from "classnames";
import image from "../../assests/images/not-found.svg";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";
import styles from "./NotFound.module.css";

export const NotFound:FC = () => {
  const isMobile = useMobileMediaQuery();
  const titleClasses = classNames(styles.title, {
    [styles.titleMobile]: isMobile,
    [styles.titleDescto]: !isMobile,
  });

  const subtitleClasses = classNames(styles.subtitle, {
    [styles.subtitleMobile]: isMobile,
    [styles.subtitleDesctop]: !isMobile,
  });

  const imageClasses = classNames({
    [styles.imageMobile]: isMobile,
    [styles.imageDesctop]: !isMobile,
  });

  return (
    <div className={styles.page}>
      <img className={imageClasses} src={image} alt="Страница не найдена" />
      <h1 className={titleClasses}>Page not found</h1>
      <h3 className={subtitleClasses}>
        Sorry, we can’t find what you’re looking for
      </h3>
    </div>
  );
};
