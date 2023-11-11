import React, { useState } from "react";
import { createBrowserRouter, json } from "react-router-dom";
import { AuthLayout } from "../modules/auth/components/exports";
import {
  NotFound,
  SignInPage,
  SignUpPage,
  TeamsPage,
  PlayersPage,
  AddNewTeam,
  UpdatePlayer,
  PlayersList,
  TeamsList,
  AddNewPlayer,
} from "../pages/exports";
import { ContentLayout } from "../modules/content/components/exports";
import { PrivateRoutes, PublicRoutes } from "../common/components/exports";
import {
  PlayerInfo,
} from "../modules/content/players/exports";
import {
  SingleTeam,
  ErrroElement,
} from "../modules/content/teams/exports";
import { getTeamLoader } from "../api/teams/teams-api";
import { getPlayerLoader } from "../api/players/players-api";

import { AppLayout } from "../pages/app-layout/app-layout";
import { TPlayerData } from "../api/players/types";

export const router2 = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PublicRoutes element={<AuthLayout />} />,
        children: [
          {
            path: "/sign-in",
            element: <SignInPage />,
          },
          {
            path: "/sign-up",
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: "/",
        element: <PrivateRoutes element={<ContentLayout />} />,
        children: [
          {
            path: "/teams",
            element: <TeamsPage />,
            handle: { title: "Teams", url: "/teams" },
            children: [
              {
                path: "/teams",
                element: <TeamsList />,
              },
              {
                path: `/teams/:teamId`,
                element: <SingleTeam />,
                handle: { title: "teamId", url: "/teams/:teamId" },
                loader: async ({ params }) => {
                  const teamData = getTeamLoader(params.teamId);
                  if (!teamData) {
                    throw json(
                      { message: "Not Found", reason: "Wrong Url" },
                      { status: 404 }
                    );
                  }
                  return teamData;
                },
                errorElement: <ErrroElement />,
              },
              {
                path: "/teams/add-team",
                element: <AddNewTeam />,
                handle: { title: "Add new Team", url: "/teams/add-team" },
              },
            ],
          },
          {
            path: "/players",
            element: <PlayersPage />,
            handle: { title: "Players", url: "/players" },
            children: [
              {
                path: "/players",
                element: <PlayersList />,
              },
              {
                path: "/players/:playerId",
                element: <PlayerInfo />,
                handle: { title: "playerId", url: "/players/:playerId" },
                loader: async ({ params }) => {
                  if (params.playerId) {
                    return getPlayerLoader(params);
                  }
                },
                errorElement: <ErrroElement />,
              },
              {
                path: "/players/add-player",
                element: <AddNewPlayer />,
                handle: { title: "Add New Player", url: "/players/add-player" },
              },
              {
                path: "/players/update-player/:playerId",
                element: <UpdatePlayer />,
                handle: {
                  title: "Update Player",
                  url: "/players/update-player",
                },
                loader: async ({ params }) => {
                  if (params.playerId) {
                    return getPlayerLoader(params);
                  }
                },
                errorElement: <ErrroElement />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
