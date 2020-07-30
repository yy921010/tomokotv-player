/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import styles from './Home.css';

export default function Home(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const initPlayer = () => {};

  const hlsPlayer = () => {
    // const videoSrc = 'http://117.169.120.140:8080/live/cctv-1/.m3u8';
    // if (Hls.isSupported()) {
    //   const hls = new Hls();
    //   hls.loadSource(videoSrc);
    //   hls.attachMedia(videoRef.current as HTMLVideoElement);
    //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //     if (videoRef && videoRef.current) {
    //       videoRef.current.play();
    //     }
    //   });
    //   hls.on(Hls.Events.ERROR, () => {
    //     console.log('ssss');
    //   });
    // }
  };

  useEffect(() => {
    initPlayer();
    hlsPlayer();
  }, []);

  return (
    <div className={styles.container}>
      <video controls ref={videoRef} />
    </div>
  );
}
