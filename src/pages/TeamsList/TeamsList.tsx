import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { useNavigate } from "react-router";
import {
  Button,
  StyledReactPaginate,
  Preloader,
  MemoCountSelect,
  CardContainer,
  ControledInput,
} from "../../common/components";
import {
  ErrorBlock,
  EmptyList,
  ListFooter,
  ListHeader,
} from "../../modules/content/components";
import { TeamCard } from "../../modules/content/teams/components";
import {
  teamsPageDataSelector,
  teamsSelector,
  teamsErrorSelector,
  teamsErrorDataSelector,
  teamsLoadingSelector,
} from "../../modules/content/teams/selectors";
import { setSize, setPage } from "../../modules/content/teams/teams-slice";
import { getTeamsThunk } from "../../modules/content/teams/async-thunk";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";
import image from "../../assests/images/empty-teams.svg";
import styles from "./TeamsList.module.css";

export const TeamsList = () => {
  const [name, setName] = useState<string>("");
  const isLoading = useAppSelector(teamsLoadingSelector);
  const isError = useAppSelector(teamsErrorSelector);
  const errorData = useAppSelector(teamsErrorDataSelector);
  const inputsData = useAppSelector(teamsPageDataSelector);
  const teamsData = useAppSelector(teamsSelector);

  const isMobile = useMobileMediaQuery();

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
    <section className={styles.wrapper}>
      <ListHeader cols={2}>
        <ControledInput propValue={name} onChange={handleSearchChange} search />
        <Button
          htmlType="button"
          isPrime
          mode={isMobile ? "big" : "small"}
          onClick={onButtonClick}
        >
          Add +
        </Button>
      </ListHeader>

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
        <CardContainer>
          {!isLoading &&
            !isError &&
            teamsData?.length > 0 &&
            teamsData.map((team) => <TeamCard data={team} key={team.id} />)}
        </CardContainer>
      )}

      <ListFooter>
        <StyledReactPaginate
          pageCount={Math.ceil(inputsData.count / inputsData.size) || 1}
          onPageChange={handlePageChange}
        />
        <MemoCountSelect
          options={options}
          value={{ label: inputsData.size, value: inputsData.size }}
          onChange={handleSizeChage}
        />
      </ListFooter>
    </section>
  );
};
