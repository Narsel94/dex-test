import React, { useState } from "react";
import {
  createBrowserRouter,
  json,
  redirect,
  redirectDocument,
} from "react-router-dom";
import { AuthLayout } from "../modules/auth/components/exports";
import {
  NotFound,
  SignInPage,
  SignUpPage,
  TeamsPage,
  PlayersPage,
} from "../pages/exports";
import { ContentLayout } from "../modules/content/components/exports";
import { PrivateRoutes, PublicRoutes } from "../common/components/exports";
import { AddNewPlayer } from "../modules/content/players/exports";
import {
  AddNewTeam,
  TeamsList,
  SingleTeam,
  ErrroElement,
} from "../modules/content/teams/exports";
import { getCookie } from "../common/helpers/helpers";
import { getTeamLoader } from "../api/teams/teams-api";

export const router = createBrowserRouter([
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
            path: "/players/add-player",
            element: <AddNewPlayer />,
            handle: { title: "Add New Player", url: "/players/add-player" },
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

export const useRoute = () => {
  const isAuth = () => {
    const token = getCookie("token");
    return !!token;
  };
  const [auth2] = useState<boolean>(isAuth());

  const publickRoutes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-in" || "/",
          element: <SignInPage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  const privateRoutes = createBrowserRouter([
    {
      path: "/",
      element: <ContentLayout />,
      children: [
        {
          path: "/teams",
          element: <TeamsPage />,
          handle: { title: "Teams", url: "/teams" }, //?Name=q&Page=6&PageSize=6
          children: [
            {
              path: "/teams",
              element: <TeamsList />,
            },
            {
              path: `/teams/:teamId`,
              element: <SingleTeam />,
              handle: { title: "teamId", url: "/teams" },
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
          handle: { title: "teamId", url: "/teams" },
          children: [
            {
              path: "/players/add-player",
              element: <AddNewPlayer />,
              handle: { title: "Add New Player", url: "/players/add-player" },
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

  if (auth2) {
    return privateRoutes;
  } else {
    return publickRoutes;
  }

  // return publickRoutes;
};
