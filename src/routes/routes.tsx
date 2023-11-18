import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../pages/app-layout/app-layout";

import { AuthLayout } from "../modules/auth/components/exports";
import { PlayersLayout } from "../modules/content/players/components/exports";
import {TeamsLayout, ErrroElement} from '../modules/content/teams/components/index'
import { ContentLayout } from "../modules/content/components";

import {
  NotFound,
  SignInPage,
  SignUpPage,
  AddNewTeam,
  UpdatePlayer,
  PlayersList,
  TeamsList,
  AddNewPlayer,
  UpdateTeam,
  ProfilePage,
  TeamInfo,
  PlayerInfo
} from "../pages";
import { PrivateRoutes, PublicRoutes } from "../common/components";
import { getTeamLoader } from "../api/teams/teams-api";
import { getPlayerLoader } from "../api/players/players-api";

export const router = createBrowserRouter([
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
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/teams",
            element: <TeamsLayout />,
            handle: { title: "Teams", url: "/teams" },
            children: [
              {
                path: "/teams",
                element: <TeamsList />,
              },
              {
                path: `/teams/:teamId`,
                element: <TeamInfo />,
                handle: { title: "teamId", url: "/teams/:teamId" },
                loader: async ({ params }) => {
                  if (params.teamId) {
                    return getTeamLoader(params.teamId);
                  }
                },
                errorElement: <ErrroElement />,
              },
              {
                path: "/teams/update-team/:teamId",
                element: <UpdateTeam />,
                handle: {
                  title: "Update Team",
                  url: "/teams/update-team",
                },
                loader: async ({ params }) => {
                  if (params.teamId) {
                    return getTeamLoader(params.teamId);
                  }
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
            element: <PlayersLayout />,
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
