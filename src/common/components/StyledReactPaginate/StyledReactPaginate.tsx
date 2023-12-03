import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./StyledReactPaginate.module.css";

type StyledPaginate = ReactPaginateProps;

export const StyledReactPaginate: FC<StyledPaginate> = ({
  pageCount,
  ...rest
}) => {

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageLinkClassName={styles.link}
      containerClassName={styles.container}
      pageClassName={styles.pageClassName}
      activeClassName={styles.activePage}
      previousLabel="<"
      nextLabel=">"
      {...rest}
    />
  );
};
