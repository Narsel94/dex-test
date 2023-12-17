import { FC } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../common/helpers/capitalizeFirstLetter";
import { TTeamData } from "../../../../api/teams/TTeams";
import classNames from "classnames";
import styles from "./TeamCard.module.css";

type TTeamCard = {
  data: TTeamData;
  size?: number
};

export const TeamCard: FC<TTeamCard> = ({ data, size }) => {

  const nameClasses = classNames(styles.name, {
    [styles.name_long]: data.name.length >= 15,
    [styles.name_24]: size === 24,
    [styles.name_12]: size === 12

  })

  const textClassses = classNames(styles.text, {
    [styles.text_24]: size === 24,
    [styles.text_12]: size === 12

  })

  return (
    <Link className={styles.link} to={`/teams/${data.id}`}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={data.imageUrl} alt={data.name} />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={nameClasses}>{capitalizeFirstLetter(data.name)}</h3>
        <p className={textClassses}>Year of foundation: {data.foundationYear}</p>
      </div>
    </Link>
  );
};
