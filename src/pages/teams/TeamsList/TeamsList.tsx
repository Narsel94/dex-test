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
import { teamsPageDataSelector } from "../../../modules/teams/selectors";
import { setSize, setPage } from "../../../modules/teams/teamsSlice";
import classNames from "classnames";
import { isSingleSelectOption } from "../../../common/helpers/isSelectOption";
import image from "../../../assests/images/empty-teams.svg";
import { useTeamsList } from "../../../modules/teams/hooks/useTeamsList";
import styles from "./TeamsList.module.css";

export const TeamsList = () => {
  const [name, setName] = useState<string>("");
  const inputsData = useAppSelector(teamsPageDataSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

  const { teamsList, isLoading, error } = useTeamsList(
    inputsData.page,
    inputsData.size,
    name,
    handlePageChange,
    { selected: 0 }
  );

  return (
    <section className={styles.wrapper}>
      <ListHeader cols={2}>
        <ControledInput
          propValue={name}
          onChange={(event) => {
            handleSearchChange(event);
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
      {!isLoading && !error && teamsList?.length === 0 && (
        <EmptyList image={image} message={"Add new teams to continue"} />
      )}
      {error && !isLoading && <ErrorBlock error={error} />}
      {!isLoading && !error && teamsList?.length > 0 && (
        <div className={containerClasses}>
          {teamsList.map((team) => (
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
