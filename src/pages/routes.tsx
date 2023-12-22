import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../modules/auth/components";
import {
  ContentLayout,
  AppLayout,
  PrivateRoutes,
  PublicRoutes,
  RouteErrorBoundary,
} from "../common/components";
import { PlayersLayout } from "../modules/players/components";
import { TeamsLayout } from "../modules/teams/components/index";
import {
  NotFound,
  SignIn,
  SignUp,
  AddNewTeam,
  UpdatePlayer,
  PlayersList,
  TeamsList,
  AddNewPlayer,
  UpdateTeam,
  ProfilePage,
  TeamInfo,
  PlayerInfo,
} from ".";
import { getTeamLoader } from "../api/teams/teamsRequests";
import { getPlayerLoader } from "../api/players/playersRequests";
import { ErrorBoundary } from "../common/components/ErrorBoundary/ErrorBoundary";
import { LoaderFunctionArgs } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: (
          <PublicRoutes
            element={
              <ErrorBoundary>
                <AuthLayout />
              </ErrorBoundary>
            }
          />
        ),
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/",
        element: <PrivateRoutes element={<ContentLayout />} />,
        children: [
          {
            path: "/profile",
            element: (
              <ErrorBoundary>
                <ProfilePage />
              </ErrorBoundary>
            ),
          },
          {
            path: "/teams",
            element: (
              <ErrorBoundary>
                <TeamsLayout />
              </ErrorBoundary>
            ),
            handle: { title: "Teams", url: "/teams" },
            children: [
              {
                path: "/teams",
                element: <TeamsList />,
                errorElement: <RouteErrorBoundary />,
              },
              {
                path: `/teams/:teamId`,
                element: <TeamInfo />,
                handle: { title: "teamId", url: "/teams/:teamId" },
                loader: async ({ params }:LoaderFunctionArgs) => {
                  if (params.teamId) {
                    return getTeamLoader(params.teamId);
                  }
                },
                errorElement: <RouteErrorBoundary />,
              },
              {
                path: "/teams/update-team/:teamId",
                element: <UpdateTeam />,
                handle: {
                  title: "Update Team",
                  url: "/teams/update-team",
                },
                loader: async ({ params }:LoaderFunctionArgs) => {
                  if (params.teamId) {
                    return getTeamLoader(params.teamId);
                  }
                },

                errorElement: <RouteErrorBoundary />,
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
            element: (
              <ErrorBoundary>
                <PlayersLayout />
              </ErrorBoundary>
            ),
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
                loader: async ({ params }:LoaderFunctionArgs) => {
                  if (params.playerId) {
                    return getPlayerLoader(params);
                  }
                },
                errorElement: <RouteErrorBoundary />,
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
                loader: async ({ params }:LoaderFunctionArgs) => {
                  if (params.playerId) {
                    return getPlayerLoader(params);
                  }
                },
                errorElement: <RouteErrorBoundary />,
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
