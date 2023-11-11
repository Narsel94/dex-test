import React, { FC } from 'react'
import { useMobileMediaQuery } from '../../../../../common/hooks/useMobileMediaQuery'
import { TPlayerData } from '../../../../../api/players/types'
import { getAge } from '../../../players/helpers/get-age'
import classNames from 'classnames'
import styles from './roster-element.module.css'

type TRosterElement = {
  player:TPlayerData
}

export const RosterElement:FC<TRosterElement> = ({player}) => {
  const age = getAge(player.birthday)
  
  const isMobile = useMobileMediaQuery()
  
  return (
    <div className={styles.wrapper}>
      <span className={styles.number}>{player.number || '-'}</span>
      <img className={styles.image} src={player.avatarUrl} alt={player.name} />
      <div className={styles.bio}>
        <span>{player.name}</span>
        <span>{player.position}</span>
      </div>
      {!isMobile && <div className={styles.info}>
        <span className={styles.span}>{player.height} cm</span>
        <span className={styles.span}>{player.weight} kg</span>
        <span className={styles.span}>{age}</span>
        
        </div>}

    </div>
  )
}