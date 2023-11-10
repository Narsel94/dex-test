import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListPageWrapper,
  ListFooter,
  ListHeader,
  EmptyList,
  ErrorBlock,
} from "../../components/exports";
import {
  Button,
  StyledReactPaginate,
  CountSelect,
  CardContainer,
  Preloader,
} from "../../../../common/components/exports";
import image from "../../../../assests/images/empty-players.svg";
import { StyledMultiselect, PlayerCard } from "../components/exports";
import { SearchInput } from "../../components/exports";
import { useTeamsOptions } from "../components/use-teams-options/use-teams-options";
import { setSize, setPage, setPlayers } from "../players-slice";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { getCurrentPlayersThunk } from "../asynk-thunk";
import {
  playersSelector,
  playersLoadingSelector,
  playersPageDataSelector,
  playersErrorSelector,
  playersErrorDataSelector,
  allPlayersSelector,
} from "../selectors";
import { ActionMeta, MultiValue, OnChangeValue } from "react-select";
import { TPlayerData } from "../../../../api/players/types";

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

  const [selectedOptions, setSelectedOptions] = useState<TeamOption[]>([]);
  const [search, setSearch] = useState<string>("");

  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teams = useTeamsOptions();

  const params = {
    name: search,
    page: inputsData.page,
    size: inputsData.size,
  };

  const filterPlayers = () => {
    if (selectedOptions.length === 0) {
      return playersData;
    }
    const result: TPlayerData[] = [];

    selectedOptions.map((opt) => {
      allPlayers.map((player) => {
        if (player.team === opt.value) {
          result.push(player);
        }
      });
    });
    return result;
  };

  const playersForRender = filterPlayers();

  useEffect(() => {
    dispatch(getCurrentPlayersThunk(params));
    setSelectedOptions([]);
  }, [params.name, params.page, params.size]);

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
      setSelectedOptions(options);
    } else {
      const option = newValue as TeamOption;
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const render = selectedOptions.slice(-3);

  return (
    <ListPageWrapper>
      <ListHeader cols={3}>
        <SearchInput value={search} onChange={handleSearchChange}></SearchInput>
        <StyledMultiselect
          options={teams}
          onChange={handleChange}
          value={render}
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
      {!isLoading && !isError && playersForRender?.length === 0 && (
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

      {!isLoading && !isError && playersForRender?.length > 0 && (
        <CardContainer>
          {playersForRender.map((player) => (
            <PlayerCard key={player.id} data={player} />
          ))}
        </CardContainer>
      )}

      <ListFooter>
        <StyledReactPaginate
          pageCount={inputsData.count || 1}
          onPageChange={handlePageChange}
        />
        <CountSelect options={options} onChange={handleSizeChage} />
      </ListFooter>
    </ListPageWrapper>
  );
};
