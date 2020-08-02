/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import Videojs from 'video.js';
import styles from './Home.css';
import PlayerBar from './PlayerBar';
import PlayerController from './PlayControl';
import '@videojs/http-streaming';

export default function Home(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const intiPlayer = () => {
    const player = Videojs(videoRef.current, {}, () => {
      player.play();
    });
    player.src({
      src: 'http://117.169.120.140:8080/live/cctv-1/.m3u8',
      type: 'application/x-mpegURL',
    });
    setInterval(() => {
      console.log('player.duration()', player.currentTime());
    }, 1000);
  };

  useEffect(() => {
    intiPlayer();
  }, []);

  return (
    <div className={styles.container}>
      <PlayerBar
        title="Modern web html5 Video player"
        subTitle="subtitle test video"
      />
      <PlayerController
        title="Modern web html5 Video player"
        subTitle="subtitle test video"
      />
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" width="100%" height="100%" />
      </div>
    </div>
  );
}
