import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListHeader,
  Button,
  StyledReactPaginate,
  EmptyList,
  MemoCountSelect,
  CardContainer,
  ErrorBlock,
  Preloader,
  ControledInput
} from "../../common/components";
import image from "../../assests/images/empty-players.svg";
import { StyledMultiselect, PlayerCard } from "../../modules/players/components";
import { useTeamOptions } from "../../modules/players/hooks/useTeamOptions";
import { setSize, setPage } from "../../modules/players/playersSlice";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { getCurrentPlayersThunk } from "../../modules/players/asynkThunk";
import {
  playersSelector,
  playersLoadingSelector,
  playersPageDataSelector,
  playersErrorSelector,
  playersErrorDataSelector,
} from "../../modules/players/selectors";
import { ActionMeta } from "react-select";
import { TGetParams } from "../../common/helpers/getQueries";
import styles from './PlayersList.module.css'

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

  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teamsOpt = useTeamOptions();


  const params: TGetParams = {
    name: search,
    page: inputsData.page,
    size: inputsData.size,
    teams: selectedOptions,
  };

  useEffect(() => {
    dispatch(getCurrentPlayersThunk(params));
  }, [params.name, params.page, params.size, params.teams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSizeChage = (option: any) => {
    if (typeof option.value === "number") {
      dispatch(setSize(option.value));
    }
  };

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const onButtonClick = () => {
    navigate("/players/add-player");
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

  const handleChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    if (newValue instanceof Array) {
      const options = newValue as TeamOption[];
      setSelectedOptions(options.map((opt)=> opt.value));
    } else {
      const option = newValue as TeamOption;
      setSelectedOptions((prev) => [...prev, option.value]);
    }
  };


  return (
    <section className={styles.wrapper}>
      <ListHeader cols={3}>
        <ControledInput propValue={search} onChange={handleSearchChange} search></ControledInput>
        <StyledMultiselect
          options={teamsOpt}
          onChange={handleChange}
        />
        <Button
          htmlType="button"
          onClick={onButtonClick}
          mode={isMobile ? "big" : "small"}
          isPrime
        >
          Add +
        </Button>
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
        <MemoCountSelect options={options} onChange={handleSizeChage} />
      </footer>
    </section>
  );
};
