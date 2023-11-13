import React from "react";
import { useLoaderData } from "react-router";
import { PlayerForm } from "../../modules/content/players/exports";
import { BreadCrumbs } from "../../common/components/exports";
import {
  TPlayerData,
} from "../../api/players/types";
import { FormWrapper } from "../../common/components/exports";

export const UpdatePlayer = () => {
  const playerData = useLoaderData() as TPlayerData;

  return (
    <FormWrapper>
      <BreadCrumbs />
      <PlayerForm data={playerData} />
    </FormWrapper>
  );
};
