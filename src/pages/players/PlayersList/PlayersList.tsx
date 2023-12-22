import { ChangeEvent, FC, useState } from "react";
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
import { setSize, setPage, setPlayersRequest } from "../../../modules/players/playersSlice";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { playersPageDataSelector, playersSelector } from "../../../modules/players/selectors";
import {
  isOptionAndType,
  isOptionsArrayAndValue
} from "../../../common/helpers/isSelectOption";
import classNames from "classnames";
import styles from "./PlayersList.module.css";
import { debounce } from "../../../common/helpers/debounce";
import { getCurrentPlayersRequest } from "../../../api/players/playersRequests";
import { useFetchRequest } from "../../../common/hooks/useFetchRequest";

export const PlayersList: FC = () => {
  const inputsData = useAppSelector(playersPageDataSelector);
  const players = useAppSelector(playersSelector)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchDebounced, setSearchDebounced] = useState<string>("");

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

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

  const {isLoading, error} = useFetchRequest({
    request: getCurrentPlayersRequest,
    args: {name: searchDebounced, page: inputsData.page, size: inputsData.size, teams: selectedOptions},
    actionCreator: setPlayersRequest
  })

  const cardContainerClasses = classNames(styles.card_container, {
    [styles.container_6]: inputsData.size === 6,
    [styles.container_12]: inputsData.size === 12,
    [styles.container_24]: inputsData.size === 24,
  });

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

    if (isOptionAndType(value, 'number')) {
      dispatch(setSize(value.value));
    }
  };

  const handleChange = (newValue: unknown) => {
    handlePageChange({ selected: 0 });
    const value = isOptionsArrayAndValue(newValue, 'number');
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
      {!isLoading && !error && players.length === 0 && (
        <EmptyList image={image} message={"Add new player to continue"} />
      )}
      {!!error && !isLoading && <ErrorBlock error={error} />}

      {!isLoading && !error && players.length > 0 && (
        <div className={cardContainerClasses}>
          {players.map((player) => (
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
