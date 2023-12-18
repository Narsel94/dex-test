import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ListHeader,
  Button,
  StyledReactPaginate,
  StyledSelect,
  EmptyList,
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
import {
  isSingleSelectOption,
  isOptionsArrayAndValueNumber,
} from "../../../common/helpers/isSelectOption";
import classNames from "classnames";
import styles from "./PlayersList.module.css";

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

  const cardContainerClasses = classNames(styles.card_container, {
    [styles.container_6]: inputsData.size === 6,
    [styles.container_12]: inputsData.size === 12,
    [styles.container_24]: inputsData.size === 24,
  });
  useEffect(() => {
    dispatch(getCurrentPlayersThunk(params));
  }, [params.name, params.page, params.size, params.teams]);

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    handlePageChange({ selected: 0 });

    setSearchDebounced(e.target.value);
  }, 600);

  const onButtonClick = () => {
    navigate("/players/add-player");
  };

  const handleSizeChage = (value: unknown) => {
    handlePageChange({ selected: 0 });

    if (isSingleSelectOption(value)) {
      dispatch(setSize(value.value));
    }
  };

  const handleChange = (newValue: unknown) => {
    handlePageChange({ selected: 0 });
    const value = isOptionsArrayAndValueNumber(newValue);
    if (value instanceof Array) {
      setSelectedOptions(value.map((opt) => opt.value));
    } else {
      value && setSelectedOptions((prev) => [...prev, value.value]);
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
          <Button htmlType="button" onClick={onButtonClick} isPrime>
            {`Add\u00A0\u00A0\u00A0+`}
          </Button>
        </div>
      </ListHeader>
      {isLoading && <Preloader />}
      {!isLoading && !isError && playersData?.length === 0 && (
        <EmptyList image={image} message={"Add new player to continue"} />
      )}
      {isError && !isLoading && <ErrorBlock error={errorData} />}

      {!isLoading && !isError && playersData?.length > 0 && (
        <div className={cardContainerClasses}>
          {playersData.map((player) => (
            <PlayerCard key={player.id} data={player} size={inputsData.size} />
          ))}
        </div>
      )}

      <footer className={styles.footer}>
        <StyledReactPaginate
          pageCount={Math.ceil(inputsData.count / inputsData.size) || 1}
          onPageChange={handlePageChange}
          forcePage={inputsData.page - 1}
        />
        <StyledSelect
          options={options}
          value={options.find((value) => value.value === inputsData.size)}
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
