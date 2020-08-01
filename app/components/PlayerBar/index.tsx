import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './index.css';

interface IPlayerBar {
  title: string;
  subTitle: string;
}

const PlayerBar = ({ title, subTitle }: IPlayerBar) => {
  useEffect(() => {}, []);
  return (
    <div className={styles.playBar}>
      <div className={styles.title}>
        <div className={styles.mainTitle}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.actions}>
        <span
          className={classNames(
            'iconfont',
            'icon-close',
            styles.playerBarClose
          )}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
