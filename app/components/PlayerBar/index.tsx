import React, { useEffect } from 'react';
import classNames from 'classnames';

interface IPlayerBar {
  title: string;
  subTitle: string;
}

const PlayerBar = ({ title, subTitle }: IPlayerBar) => {
  useEffect(() => {}, []);
  return (
    <div className="playBar">
      <div className="title">
        <div className="main">{title}</div>
        <div className="sub">{subTitle}</div>
      </div>
      <div className="actions">
        <span className={classNames('iconfont', 'icon-close')} />
      </div>
    </div>
  );
};

export default PlayerBar;
