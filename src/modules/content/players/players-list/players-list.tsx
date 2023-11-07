import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListPageWrapper,
  ListFooter,
  ListHeader,
} from "../../components/exports";
import {
  Button,
  StyledReactPaginate,
  CountSelect,
  CardContainer,
} from "../../../../common/components/exports";
import { StyledMultiselect, PlayerCard } from "../components/exports";
import { SearchInput } from "../../components/exports";
import { useTeamsOptions } from "../components/use-teams-options/use-teams-options";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { getPlayersThunk } from "../asynk-thunk";
import { playersSelector } from "../selectors";
import styles from "./players-list.module.css";

export const PlayersList: FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const teams = useTeamsOptions();

  const players = useAppSelector(playersSelector)

  useEffect(() => {
    dispatch(getPlayersThunk())
  }, [])


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


  const handleChange = (selectedOptions: any) => {
    setSelectedOptions((prev) => [...prev, selectedOptions]);
    console.log(selectedOptions);
  };

  return (
    <ListPageWrapper>
      <ListHeader cols={3}>
        <SearchInput value={"1"} onChange={() => console.log(1)}></SearchInput>
        <StyledMultiselect
          classNames={{
            multiValue: () => styles.container,
          }}
          options={teams}
          onChange={handleChange}
          value={selectedOptions.splice(0, 2)}
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

      <CardContainer>
        {players.map((player) => <PlayerCard key={player.id} data={player}/>)}    
      </CardContainer>
      <ListFooter>
        <StyledReactPaginate pageCount={27} />
        <CountSelect options={options} />
      </ListFooter>
    </ListPageWrapper>
  );
};
