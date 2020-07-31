import React, { useEffect } from 'react';
import styles from './index.css';

interface IPlayerControl {
  title: string;
  subTitle: string;
}

const PlayerController = ({ title, subTitle }: IPlayerControl) => {
  useEffect(() => {}, []);
  return (
    <div className={styles.playerController}>
      {title}
      {subTitle}
    </div>
  );
};

export default PlayerController;
