import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListPageWrapper,
  ListFooter,
  ListHeader,
  EmptyList,
  ErrorBlock,
} from "../../modules/content/components/exports";
import {
  Button,
  StyledReactPaginate,
  CountSelect,
  CardContainer,
  Preloader,
} from "../../common/components/exports";
import image from "../../assests/images/empty-players.svg";
import { StyledMultiselect, PlayerCard } from "../../modules/content/players/components/exports";
import { SearchInput } from "../../modules/content/components/exports";
import { useTeamOptions1 } from "../../modules/content/players/components/use-teams-options/use-teams-options";
import { setSize, setPage } from "../../modules/content/players/players-slice";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { getCurrentPlayersThunk } from "../../modules/content/players/asynk-thunk";
import {
  playersSelector,
  playersLoadingSelector,
  playersPageDataSelector,
  playersErrorSelector,
  playersErrorDataSelector,
  allPlayersSelector,
} from "../../modules/content/players/selectors";
import { ActionMeta } from "react-select";
import { TGetParams } from "../../common/helpers/get-queries";

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
  const allPlayers = useAppSelector(allPlayersSelector);

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teamsOpt = useTeamOptions1();


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
    <ListPageWrapper>
      <ListHeader cols={3}>
        <SearchInput value={search} onChange={handleSearchChange}></SearchInput>
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

      <ListFooter>
        <StyledReactPaginate
          pageCount={Math.ceil(inputsData.count / inputsData.size) || 1}
          onPageChange={handlePageChange}
        />
        <CountSelect options={options} onChange={handleSizeChage} />
      </ListFooter>
    </ListPageWrapper>
  );
};
