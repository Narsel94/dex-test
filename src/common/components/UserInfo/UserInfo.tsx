import React, { FC } from "react";
import { getCookie } from "../../helpers/cookies";
import nullAvatar from '../../../assests/icons/profile.svg'
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";



export const UserInfo: FC = () => {
  const name = sessionStorage.getItem('name');
  const avatarUrl = sessionStorage.getItem("avatarUrl");

  const navigate = useNavigate()

  const avatarImg = avatarUrl? avatarUrl : nullAvatar;
  return (
    <div onClick={()=> navigate('/profile')} className={styles.userInfo}>
      <p className={styles.text}>{name || "Unknown"}</p>
      <img src={avatarImg} alt="Аватар" className={styles.avatar} />
    </div>
  );
};
