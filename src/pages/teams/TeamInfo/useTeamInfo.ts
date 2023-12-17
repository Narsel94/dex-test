import React from 'react'
import { usePlayersOfTeam } from "../../../modules/teams/hooks/usePlayersOfTeam";
import { useLoaderData } from 'react-router';
import { TTeamData } from "../../../api/teams/TTeams";


const isTeamData = (data: unknown): data is TTeamData => {
  return (
    typeof data === 'object' && data !== null &&
    'id' in data && typeof data.id === 'number' &&
    'name' in data && typeof data.name === 'string' &&
    'foundationYear' in data && typeof data.foundationYear === 'number' &&
    'division' in data && typeof data.division === 'string' &&
    'conference' in data && typeof data.conference === 'string' &&
    'imageUrl' in data && (typeof data.imageUrl === 'string' || data.imageUrl === null)
  )
}


export const useTeamInfo = () => {
  const data = useLoaderData()
  const query: number | null = isTeamData(data)? data.id : null;
  const players = usePlayersOfTeam(query)
  return isTeamData(data)? {data:{
    ...data,
    players: players
  }, isTeam: true} : {data: null, isTeam: false}
}
