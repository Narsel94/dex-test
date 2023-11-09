import React, { FC } from 'react'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import { allPlayersSelector } from '../../../players/selectors'
import { RosterElement } from '../roster-element/roster-element'
import styles from './roster.module.css'

type TRoster = {
  id: number
}

export const Roster:FC<TRoster> = ({id}) => {

  const players = useAppSelector(allPlayersSelector).filter((player) => player.team === id)
  console.log(players)

  if (players.length > 0) {
      return (



    <div className={styles.roster}>
      <h1 className={styles.title}>Roster</h1>
      <div className={styles.header}></div>
      {players.length > 0 && players.map((player) => <RosterElement key={player.id} player={player}></RosterElement>) }
    </div>
  )
  }

  return null
}
