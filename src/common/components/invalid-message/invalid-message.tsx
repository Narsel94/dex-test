import React, { FC } from "react";
import styles from './invalid-message.module.css'

type TInvalidMessage = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  message?: string;
};

export const InvalidMessage: FC<TInvalidMessage> = ({ message }) => {
  return <p className={styles.error}>{message ? message : ""}</p>;
};
