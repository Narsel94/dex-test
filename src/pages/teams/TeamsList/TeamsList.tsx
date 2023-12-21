import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { useNavigate } from "react-router";
import {
  Button,
  StyledReactPaginate,
  Preloader,
  ControledInput,
  EmptyList,
  ErrorBlock,
  ListHeader,
  StyledSelect,
} from "../../../common/components";
import { TeamCard } from "../../../modules/teams/components";
import { teamsPageDataSelector, teamsSelector } from "../../../modules/teams/selectors";
import { setSize, setPage } from "../../../modules/teams/teamsSlice";
import { debounce } from "../../../common/helpers/debounce";
import classNames from "classnames";
import { isSingleSelectOption } from "../../../common/helpers/isSelectOption";
import image from "../../../assests/images/empty-teams.svg";
import styles from "./TeamsList.module.css";
import { setTeamsRequest } from "../../../modules/teams/teamsSlice";
import { useFetchRequest } from "../../../common/hooks/useFetchRequest";
import {getTeamsRequest } from "../../../api/teams/teamsRequests";
import { TGetTeamsResponse, TGetTeamsRequest } from "../../../api/teams/TTeams";


export const TeamsList = () => {
  const [name, setName] = useState<string>("");
  const [searchDebounced, setSearchDebounced] = useState<string>("");
  const inputsData = useAppSelector(teamsPageDataSelector);
  const teams = useAppSelector(teamsSelector)
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {isLoading, error} = useFetchRequest<TGetTeamsRequest, TGetTeamsResponse>({
    request: getTeamsRequest,
    args: {name: searchDebounced, page: inputsData.page, size: inputsData.size},
    actionCreator: setTeamsRequest
  })

  const containerClasses = classNames(styles.card_container, {
    [styles.container_6]: inputsData.size === 6,
    [styles.container_12]: inputsData.size === 12,
    [styles.container_24]: inputsData.size === 24,
  });

  const onButtonClick = () => {
    navigate("/teams/add-team");
  };

  const handlePageChange = (e: { selected: number }) => {
    dispatch(setPage(e.selected + 1));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSizeChage = (option: unknown) => {
    handlePageChange({ selected: 0 });
    if (isSingleSelectOption(option)) {
      dispatch(setSize(option.value));
    }
  };

  const debouncedSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    handlePageChange({ selected: 0 });

    setSearchDebounced(e.target.value);
  }, 600);

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
      {!isLoading && !error && teams.length === 0 && (
        <EmptyList image={image} message={"Add new teams to continue"} />
      )}
      {!!error && !isLoading && <ErrorBlock error={error} />}
      {!isLoading && !error && teams.length > 0 && (
        <div className={containerClasses}>
          { teams.map((team) => (
            <TeamCard size={inputsData.size} data={team} key={team.id} />
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
