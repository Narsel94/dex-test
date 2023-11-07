import React, { FC, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router";
import Select, {StylesConfig} from "react-select";
import {
  ListPageWrapper,
  ListFooter,
  ListHeader,
} from "../../components/exports";
import {
  Button,
  StyledReactPaginate,
  StyledSelect,
  Preloader,
  CountSelect,
  CardContainer,
} from "../../../../common/components/exports";
import { SearchInput } from "../../components/exports";
import { useTeamsOptions } from "../components/use-teams-options";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import styles from "./players-list.module.css";

export const PlayersList = () => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();
  const teams = useTeamsOptions();

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

  const styles1:StylesConfig = {
    option: (base, { isSelected }) => {
      if (isSelected) {
        return base;
      } else {
        return {
          ...base,
          display: selectedOptions.length >= 3 ? "none" : "flex",
        };
      }
    },
  };

  
  const handleChange = (selectedOptions:any) => {
    if (selectedOptions.length === 3) {
     selectedOptions[2].label = '...'
    }
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions)
  };


  return (
    <ListPageWrapper>
      <ListHeader cols={3}>
        <SearchInput value={"1"} onChange={() => console.log(1)}></SearchInput>
        <Select
          isMulti
          options={teams}
          onChange={handleChange}
          value={selectedOptions.slice(0,3)}
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
        <div className={styles.test}></div>
        <div className={styles.test}></div>
        <div className={styles.test}></div>
        <div className={styles.test}></div>
        <div className={styles.test}></div>
        <div className={styles.test}></div>
      </CardContainer>
      <ListFooter>
        <StyledReactPaginate pageCount={27} />
        <CountSelect options={options} />
      </ListFooter>
    </ListPageWrapper>
  );
};
