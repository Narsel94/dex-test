import { Navigate } from "react-router";
import { BreadCrumbs } from "../../../common/components";
import { UpdateTeamForm } from "../../../modules/teams/components";
import { useTeamInfo } from "../../../modules/teams/hooks/useTeamInfo";
import styles from './UpdateTeam.module.css'

export const UpdateTeam = () => {
  const {data} = useTeamInfo();

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      {data? <UpdateTeamForm data={data} /> : <Navigate to='/teams' replace/>}
    </section>
  );
};
