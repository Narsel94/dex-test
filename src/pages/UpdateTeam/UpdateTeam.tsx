import React from "react";
import { useLoaderData } from "react-router";
import { BreadCrumbs } from "../../common/components";
import { UpdateTeamForm } from "../../modules/teams/components";
import { TTeamData } from "../../api/teams/types";
import styles from './UpdateTeam.module.css'

export const UpdateTeam = () => {
  const teamData = useLoaderData() as TTeamData;

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <UpdateTeamForm data={teamData} />
    </section>
  );
};
