import React, { useEffect } from 'react';
import styles from './index.css';

interface IPlayerControl {
  title: string;
  subTitle: string;
}

const Progress = ({ title, subTitle }: IPlayerControl) => {
  useEffect(() => {}, []);
  return (
    <div className={styles.progress}>
      {title}
      {subTitle}
    </div>
  );
};

export default Progress;
