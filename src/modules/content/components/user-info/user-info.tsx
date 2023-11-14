import React, { FC } from "react";
import { getCookie } from "../../../../common/helpers/cookies";
import nullAvatar from '../../../../assests/icons/profile.svg'
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./user-info.module.css";

type TUserInfo = {
  isMobile?: boolean;
};

export const UserInfo: FC<TUserInfo> = ({ isMobile = false }: TUserInfo) => {
  const name = getCookie("name");
  const avatarUrl = getCookie("avatarUrl");
  const navigate = useNavigate()

  const wrapperClasses = classNames({
    [styles.userInfoDesctop]: !isMobile,
    [styles.userInfoMobile]: isMobile,
  });

  const avatarClasses = classNames({
    [styles.avatarMobile]: isMobile,
    [styles.avatarDesctop]: !isMobile,
  });



  const avatarImg = avatarUrl? avatarUrl : nullAvatar;
  return (
    <div onClick={()=> navigate('/profile')} className={wrapperClasses}>
      <p className={styles.text}>{name || "Unknown"}</p>
      <img src={avatarImg} alt="Аватар" className={avatarClasses} />
    </div>
  );
};
