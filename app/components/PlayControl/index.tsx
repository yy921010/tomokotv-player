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
      <div className="playerControllerBar" />
      <div className="playerActions">
        <div className="volume" />
        <div className="buttons">
          <div className="prevSwitch" />
          <div className="playButton" />
          <div className="nextSwitch" />
        </div>
        <div className="right">
          <div className="infos" />
          <div className="menus" />
          <div className="definitions" />
          <div className="switchScreen" />
        </div>
      </div>
      {title}
      {subTitle}
    </div>
  );
};

export default PlayerController;
