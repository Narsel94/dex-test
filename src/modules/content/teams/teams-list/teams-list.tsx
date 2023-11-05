import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { useNavigate, useLocation } from "react-router";
import {
  Button,
  StyledReactPaginate,
  Preloader,
  CountSelect,
} from "../../../../common/components/exports";
import { ErrorBlock, SearchInput, EmptyList } from "../../components/exports";
import {
  teamsPageDataSelector,
  teamsSelector,
  teamsErrorSelector,
  teamsErrorDataSelector,
  teamsLoadingSelector,
} from "../selectors";
import { setSize, setPage } from "../teams-slice";
import { getTeamsThunk } from "../async-thunk";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { Link } from "react-router-dom";
import image from "../../../../assests/images/empty-teams.svg";
import classNames from "classnames";
import styles from "./teams-list.module.css";

export const TeamsList = () => {
  const [name, setName] = useState<string>("");
  const isLoading = useAppSelector(teamsLoadingSelector);
  const isError = useAppSelector(teamsErrorSelector);
  const errorData = useAppSelector(teamsErrorDataSelector);
  const inputsData = useAppSelector(teamsPageDataSelector);
  const teamsData = useAppSelector(teamsSelector);

  const isMobile = useMobileMediaQuery();
  const headerClasses = classNames({
    [styles.header]: !isMobile,
    [styles.headerMobile]: isMobile,
  });
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/teams/add-team");
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSizeChage = (option: any) => {
    if (typeof option.value === "number") {
      dispatch(setSize(option.value));
    }
  };

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const params = {
    name: name,
    page: inputsData.page,
    size: inputsData.size,
  };

  const options = [
    {
      label: 6,
      value: 6,
    },
    {
      label: 12,
      value: 12,
    },
    {
      label: 24,
      value: 24,
    },
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeamsThunk(params));
  }, [params.name, params.page, params.size]);

  return (
    <div className={styles.wrapper}>
      <header className={headerClasses}>
        <SearchInput value={name} onChange={handleSearchChange} />
        <Button
          htmlType="button"
          isPrime
          mode={isMobile ? "big" : "small"}
          onClick={onButtonClick}
        >
          Add +
        </Button>
      </header>

      {isLoading && <Preloader />}
      {!isLoading && !isError && teamsData?.length === 0 && (
        <EmptyList image={image} message={"Add new teams to continue"} />
      )}
      {isError && !isLoading && (
        <ErrorBlock
          errorMessage={
            errorData?.message ||
            errorData?.stack ||
            "Sorry! Something goes wrong."
          }
        />
      )}
      {!isLoading && !isError && teamsData?.length > 0 && (
        <div className={styles.container}>
          {teamsData.map((team, index) => (
            <Link key={index} to={team.id.toString()}>
              <h3>{team.name}</h3>
            </Link>
          ))}
          <div className={styles.test}></div>
        </div>
      )}
      <footer className={styles.footer}>
        <StyledReactPaginate
          pageCount={inputsData.count}
          onPageChange={handlePageChange}
        />
        <CountSelect
          options={options}
          value={{ label: inputsData.size, value: inputsData.size }}
          onChange={handleSizeChage}
        />
      </footer>
    </div>
  );
};
