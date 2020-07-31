import React, { useEffect } from 'react';
import styles from './index.css';

interface IPlayerBar {
  title: string;
  subTitle: string;
}

const PlayerBar = ({ title, subTitle }: IPlayerBar) => {
  useEffect(() => {}, []);
  return (
    <div className={styles.playBar}>
      <div className={styles.mainTitle}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
    </div>
  );
};

export default PlayerBar;
