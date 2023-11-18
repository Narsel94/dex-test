import { FC } from 'react'
import { Link } from 'react-router-dom'
import { TTeamData } from '../../../../../api/teams/types'
import styles from './TeamCard.module.css'


type TTeamCard = {
  data: TTeamData
}

export const TeamCard:FC<TTeamCard> = ({data}) => {

  return (
    <Link className={styles.link} to={`/teams/${data.id}`}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={data.imageUrl} alt={data.name}/>
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>{data.name}</h3>
        <p className={styles.text}>Year of foundation: {data.foundationYear}</p>
      </div>
    </Link>
  )
}
