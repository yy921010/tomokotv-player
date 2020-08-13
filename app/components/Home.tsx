/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import styles from './Home.css';
import PlayerBar from './PlayerBar';
import PlayController from './Playcontrol';
import { isFullscreen, exitFullscreen, enterFullscreen } from '../utils/player';

export default function Home(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const vods = [
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    'http://devimages.apple.com/iphone/samples/bipbop/gear1/prog_index.m3u8',
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
  ];

  // const lives = [
  //   'http://stream2.ahrtv.cn/xnxq/sd/live.m3u8',
  //   'http://111.40.205.87/PLTV/88888888/224/3221225710/index.m3u8',
  // ];

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const onFullScreenChange = () => {
    if (isFullscreen()) {
      exitFullscreen();
    } else {
      enterFullscreen(videoRef.current);
    }
  };

  useEffect(() => {
    const initHlsPlayer = () => {
      if (videoRef && videoRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          // hls.destroy();
          hls.loadSource(vods[0]);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // console.log(
            //   'Hls.Events.MANIFEST_PARSED>>',
            //   Hls.Events.MANIFEST_PARSED
            // );
          });
          hls.on(Hls.Events.BUFFER_CREATED, (eventName, { tracks }) => {
            console.log('BUFFER_CREATED>>>>', tracks, eventName);
          });
          hls.on(Hls.Events.MANIFEST_LOADING, (eventName) => {
            console.log('AUDIO_TRACKS_UPDATED>>>>', eventName);
          });

          videoRef.current.addEventListener('timeupdate', () => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
              setDuration(videoRef.current.duration);
              // console.log(videoRef.current.buffered);
            }
          });

          videoRef.current.addEventListener('progress', () => {
            if (videoRef.current) {
              const bufferedVal = videoRef.current.buffered.end(
                videoRef.current.buffered.length - 1
              );
              setBuffered(bufferedVal);
            }
          });
        }
      }
    };

    // const initEvent = () => {
    //   document.addEventListener('fullscreenchange', onFullScreenChange, false);
    //   document.addEventListener(
    //     'MSFullscreenChange',
    //     onFullScreenChange,
    //     false
    //   );
    //   document.addEventListener(
    //     'mozfullscreenchange',
    //     onFullScreenChange,
    //     false
    //   );
    //   document.addEventListener(
    //     'webkitfullscreenchange',
    //     onFullScreenChange,
    //     false
    //   );
    // };
    // initEvent();
    initHlsPlayer();
  }, []);

  // const canPlay = () => {
  //   if (videoRef && videoRef.current) {
  //     videoRef.current?.play();
  //   }
  // };
  const setVol = (vol: number) => {
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  return (
    <div className={styles.container}>
      <PlayerBar
        title="Modern web html5 Video player"
        subTitle="subtitle test video"
      />
      <video ref={videoRef} width="100%" height="100%" />
      <PlayController
        isLive={false}
        isFullscreen={isFullscreen()}
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        setVol={setVol}
        setFullscreen={onFullScreenChange}
      />
    </div>
  );
}
