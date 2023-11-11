import React from 'react'
import { useLoaderData } from 'react-router'
import { PlayerForm } from '../exports'
import { TPlayerData, TUpdatePlayerRequest } from '../../../../api/players/types'
import styles from './update-player.module.css'


export const UpdatePlayer = () => {

  const playerData = useLoaderData() as TPlayerData;
  
  const onSub = (data:TUpdatePlayerRequest) => {
    console.log(1)
  }

 

  return (
    <div className={styles.wrapper}>
      <PlayerForm data={playerData}/>
    </div>
    
  )
}
