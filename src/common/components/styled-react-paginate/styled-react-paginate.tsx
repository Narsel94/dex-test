import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./styled-react-paginate.module.css";

type StyledPaginate = ReactPaginateProps;

export const StyledReactPaginate: FC<StyledPaginate> = ({
  pageCount,
  ...rest
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      containerClassName={styles.container}
      pageClassName={styles.pageClassName}
      activeClassName={styles.activePage}
      previousLabel="<"
      nextLabel=">"
      {...rest}
    />
  );
};
