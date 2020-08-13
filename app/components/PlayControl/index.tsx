import React, { useEffect, useMemo } from 'react';
import classnames from 'classnames';
import PlayVol from '../PlayVol';

export interface PlayControllerProps {
  duration: number;
  currentTime: number;
  buffered: number;
  isFullscreen: boolean;
  isLive: boolean;
  setVol: (vol: number) => void;
  setFullscreen: (isFullscreen: boolean) => void;
}

function PlayController({
  currentTime,
  duration,
  buffered,
  setVol,
  isLive,
  setFullscreen,
  isFullscreen,
}: PlayControllerProps): JSX.Element {
  useEffect(() => {}, []);

  const jdtPercent = useMemo(() => {
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const bufferedPercent = useMemo(() => {
    return (buffered / duration) * 100;
  }, [buffered, duration]);

  const prefixZero = (num: number) => {
    return num <= 9 ? `0${num}` : num;
  };

  const parseTime = (time: number) => {
    const hour = Math.floor((time / 3600) % 24);
    const mins = Math.floor((time / 60) % 60);
    const second = Math.floor(time % 60);
    return `${prefixZero(hour)}:${prefixZero(mins)}:${prefixZero(second)}`;
  };

  return (
    <div className="controls">
      <div className="top">
        <div className="controls-button">
          <PlayVol onVol={setVol} />
        </div>
        <div className="controls-progress">
          {!isLive ? (
            <>
              <div className="currentTime">{parseTime(currentTime)}</div>
              <div className="progress">
                <div className="jdt" style={{ width: `${jdtPercent}%` }} />
                <div className="jdtButton" style={{ left: `${jdtPercent}%` }} />
                <div
                  className="bufferJdt"
                  style={{ width: `${bufferedPercent}%` }}
                />
              </div>
              <div className="duration">{parseTime(duration)}</div>
            </>
          ) : (
            <>
              <div className="progress">
                <div className="jdt" style={{ width: `100%` }} />
              </div>
              <div className="live-text">直播</div>
            </>
          )}
        </div>
        <div
          aria-hidden="true"
          onClick={() => {
            setFullscreen(!isFullscreen);
          }}
          className={classnames('controls-button', {
            [`${isFullscreen}-fullscreen`]: true,
          })}
        />
      </div>
    </div>
  );
}

export default PlayController;
