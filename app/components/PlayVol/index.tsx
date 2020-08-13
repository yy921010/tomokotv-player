import React, { useMemo, useRef, useState } from 'react';
import classnames from 'classnames';

export interface PlayVolProps {
  onVol: (vol: number) => void;
}

const WRAP_HEIGHT = 60;
let defaultVal = 60;
let muted = false;
const PlayVol: React.FC<PlayVolProps> = ({ onVol }: PlayVolProps) => {
  const [thumbHeight, setThumbHeight] = useState<number>(60);

  const trackRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mouseDown = (event: any) => {
    const volumeAreaHeight = trackRef.current?.offsetHeight;
    const clientRect = trackRef.current?.getBoundingClientRect();
    if (clientRect && volumeAreaHeight) {
      const moveOffset = clientRect.bottom - event.clientY - 10;
      if (moveOffset >= 0 && moveOffset <= 60) {
        defaultVal = moveOffset;
        setThumbHeight(moveOffset);
        const volPercent = moveOffset / WRAP_HEIGHT;
        onVol(Math.floor(volPercent * 100) / 100);
      }
    }
  };
  const setMutedHandle = () => {
    setThumbHeight(!muted ? 0 : defaultVal);
    muted = !muted;
    onVol(muted ? 0 : Math.floor((defaultVal / WRAP_HEIGHT) * 100) / 100);
  };

  const heightPercent = useMemo(() => {
    return (thumbHeight / WRAP_HEIGHT) * 100;
  }, [thumbHeight]);

  return (
    <div className="controls-vol">
      <div
        aria-hidden="true"
        className={classnames('vol-button', {
          [`controls-vol__${thumbHeight === 0 ? 'mute' : 'up'}`]: true,
        })}
        onClick={setMutedHandle}
      />
      <div
        aria-hidden="true"
        className="controls-vol-level"
        ref={trackRef}
        onMouseDown={mouseDown}
      >
        <div className="slider-runnable-track">
          <div className="slider-background" />
          <div
            className="slider-thumb-wrapper"
            style={{ height: `${heightPercent}%` }}
          >
            <div className="slider-thumb" />
          </div>
          <div
            className="slider-inner-track"
            style={{ height: `${heightPercent}%` }}
          >
            <div className="slider-scrubbed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVol;
