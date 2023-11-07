import React, { FC } from 'react'
import { useMobileMediaQuery } from '../../../../../common/hooks/useMobileMediaQuery'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { TeamData } from '../../types'
import styles from './team-card.module.css'

type TTeamCard = {
  data: TeamData
}

export const TeamCard:FC<TTeamCard> = ({data}) => {
  const isMobile = useMobileMediaQuery()
  
  const imageClasses = classNames({
    [styles.imageDesc]:!isMobile,
    [styles.imageMob]:isMobile
  })

  const nameClasses = classNames(styles.name, {
    [styles.nameMobile]: isMobile
  })

  const textClasses = classNames(styles.text, {
    [styles.textMobile]: isMobile
  })



  return (
    <Link className={styles.link} to={`/teams/${data.id}`}>
      <div className={styles.imageWrapper}>
        <img className={imageClasses} src={data.imageUrl} alt={data.name}/>
      </div>
      
      <div className={styles.infoWrapper}>
        <h3 className={nameClasses}>{data.name}</h3>
        <p className={textClasses}>Year of foundation: {data.foundationYear}</p>
      </div>
    </Link>
  )
}
