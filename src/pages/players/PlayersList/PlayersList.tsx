import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListHeader,
  Button,
  StyledReactPaginate,
  StyledSelect,
  EmptyList,
  CardContainer,
  ErrorBlock,
  Preloader,
  ControledInput,
} from "../../../common/components";

import image from "../../../assests/images/empty-players.svg";
import { PlayerCard } from "../../../modules/players/components";
import { useTeamOptions } from "../../../modules/players/hooks/useTeamOptions";
import { setSize, setPage } from "../../../modules/players/playersSlice";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { getCurrentPlayersThunk } from "../../../modules/players/asynkThunk";
import {
  playersSelector,
  playersLoadingSelector,
  playersPageDataSelector,
  playersErrorSelector,
  playersErrorDataSelector,
} from "../../../modules/players/selectors";
import { TGetParams } from "../../../common/helpers/getQueries";
import { debounce } from "../../../common/helpers/debounce";
import { isSingleSelectOption } from "../../../common/helpers/isSelectOption";
import styles from "./PlayersList.module.css";

type TeamOption = {
  label: string;
  value: number;
};

export const PlayersList: FC = () => {
  const isLoading = useAppSelector(playersLoadingSelector);
  const isError = useAppSelector(playersErrorSelector);
  const errorData = useAppSelector(playersErrorDataSelector);
  const inputsData = useAppSelector(playersPageDataSelector);
  const playersData = useAppSelector(playersSelector);

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchDebounced, setSearchDebounced] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teamsOpt = useTeamOptions();

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

  const params: TGetParams = {
    name: searchDebounced,
    page: inputsData.page,
    size: inputsData.size,
    teams: selectedOptions,
  };

  useEffect(() => {}, [search]);

  useEffect(() => {
    dispatch(getCurrentPlayersThunk(params));
  }, [params.name, params.page, params.size, params.teams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchDebounced(e.target.value);
  }, 600);

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const onButtonClick = () => {
    navigate("/players/add-player");
  };

  const handleSizeChage = (value: unknown) => {
    if (isSingleSelectOption(value)) {
      dispatch(setSize(value.value));
    }
  };

  const handleChange = (newValue: unknown) => {
    if (newValue instanceof Array) {
      const options = newValue as TeamOption[];
      setSelectedOptions(options.map((opt) => opt.value));
    } else {
      const option = newValue as TeamOption;
      setSelectedOptions((prev) => [...prev, option.value]);
    }
  };

  return (
    <section className={styles.wrapper}>
      <ListHeader cols={3}>
        <ControledInput
          propValue={search}
          onChange={(event) => {
            handleSearchChange(event);
            debouncedSearch(event);
          }}
          search
        ></ControledInput>
        <StyledSelect isMulti options={teamsOpt} onChange={handleChange} />
        <div className={styles.buttonWrapper}> 
        <Button
          htmlType="button"
          onClick={onButtonClick}
          isPrime
        >
          Add +
        </Button>
        </div>

      </ListHeader>
      {isLoading && <Preloader />}
      {!isLoading && !isError && playersData?.length === 0 && (
        <EmptyList image={image} message={"Add new player to continue"} />
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

      {!isLoading && !isError && playersData?.length > 0 && (
        <CardContainer>
          {playersData.map((player) => (
            <PlayerCard key={player.id} data={player} />
          ))}
        </CardContainer>
      )}

      <footer className={styles.footer}>
        <StyledReactPaginate
          pageCount={Math.ceil(inputsData.count / inputsData.size) || 1}
          onPageChange={handlePageChange}
        />
        <StyledSelect
          options={options}
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
