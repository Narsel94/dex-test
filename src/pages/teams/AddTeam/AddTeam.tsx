import { BreadCrumbs } from "../../../common/components";
import { AddTeamForm } from "../../../modules/teams/components";

import styles from "./AddTeam.module.css";

export const AddNewTeam = () => {
  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <AddTeamForm />
    </section>
  );
};
