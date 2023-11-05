import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./styled-react-paginate.module.css";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import classNames from "classnames";


type StyledPaginate = ReactPaginateProps;




export const StyledReactPaginate:FC< StyledPaginate >= ({ pageCount, ...rest }) => {
  const isMobile = useMobileMediaQuery()
  const pageClasses = classNames(styles.pageClassName, {
    [styles.desctop]: !isMobile,
    [styles.mobile]:isMobile
  })
  return (
    <ReactPaginate
      pageCount={pageCount}
      containerClassName={styles.container}
      pageClassName={pageClasses}
      activeClassName={styles.activePage}
      previousLabel="<"
      nextLabel=">"
      {...rest}
    />
  );
};
