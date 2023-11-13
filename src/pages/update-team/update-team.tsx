import React from "react";
import { useLoaderData } from "react-router";
import { BreadCrumbs } from "../../common/components/exports";
import { UpdateTeamForm } from "../../modules/content/teams/exports";
import { FormWrapper } from "../../common/components/exports";
import { TTeamData } from "../../api/teams/types";

export const UpdateTeam = () => {
  const teamData = useLoaderData() as TTeamData;

  return (
    <FormWrapper>
      <BreadCrumbs />
      <UpdateTeamForm data={teamData} />
    </FormWrapper>
  );
};
