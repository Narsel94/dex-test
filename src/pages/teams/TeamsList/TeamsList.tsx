import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { useNavigate } from "react-router";
import {
  Button,
  StyledReactPaginate,
  Preloader,
  CardContainer,
  ControledInput,
  EmptyList,
  ErrorBlock,
  ListHeader,
  StyledSelect,
} from "../../../common/components";
import { TeamCard } from "../../../modules/teams/components";
import {
  teamsPageDataSelector,
  teamsSelector,
  teamsErrorSelector,
  teamsErrorDataSelector,
  teamsLoadingSelector,
} from "../../../modules/teams/selectors";
import { setSize, setPage } from "../../../modules/teams/teamsSlice";
import { getTeamsThunk } from "../../../modules/teams/asyncThunk";
import { debounce } from "../../../common/helpers/debounce";
import { isSingleSelectOption } from "../../../common/helpers/isSelectOption";
import image from "../../../assests/images/empty-teams.svg";
import styles from "./TeamsList.module.css";

export const TeamsList = () => {
  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>("");
  const isLoading = useAppSelector(teamsLoadingSelector);
  const isError = useAppSelector(teamsErrorSelector);
  const errorData = useAppSelector(teamsErrorDataSelector);
  const inputsData = useAppSelector(teamsPageDataSelector);
  const teamsData = useAppSelector(teamsSelector);

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/teams/add-team");
  };

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const debouncedSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    handlePageChange({ selected: 0 });
    setDebouncedName(e.target.value);
  }, 600);

  const handleSizeChage = (option: unknown) => {
    handlePageChange({ selected: 0 });
    if (isSingleSelectOption(option)) {
      dispatch(setSize(option.value));
    }
  };
  const params = {
    name: debouncedName,
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
        <ControledInput
          propValue={name}
          onChange={(event) => {
            handleSearchChange(event);
            debouncedSearch(event);
          }}
          search
        />
        <div className={styles.buttonWraper}>
          <Button htmlType="button" isPrime onClick={onButtonClick}>
            {`Add\u00A0\u00A0\u00A0+`}
          </Button>
        </div>
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

      <footer className={styles.footer}>
        <StyledReactPaginate
          pageCount={Math.ceil(inputsData.count / inputsData.size) || 1}
          onPageChange={handlePageChange}
          forcePage={inputsData.page - 1}
        />
        <StyledSelect
          options={options}
          value={options.find(value => value.value === inputsData.size)}
          small
          menuPlacement="top"
          isSearchable={false}
          isClearable={false}
          onChange={handleSizeChage}
        />
      </footer>
    </section>
  );
};
