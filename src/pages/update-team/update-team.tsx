import React from "react";
import { useLoaderData } from "react-router";
import { BreadCrumbs } from "../../common/components/exports";
import { UpdateTeamForm } from "../../modules/content/teams/exports";
import { TTeamData } from "../../modules/content/teams/types";
import { FormWrapper } from "../../common/components/exports";

export const UpdateTeam = () => {
  const teamData = useLoaderData() as TTeamData;

  return (
    <FormWrapper>
      <BreadCrumbs />
      <UpdateTeamForm data={teamData} />
    </FormWrapper>
  );
};
