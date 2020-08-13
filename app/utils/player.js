export const isFullscreen = () => {
  const doc = document;
  return (
    doc.fullscreenElement ||
    doc.msFullscreenElement ||
    doc.mozFullScreen ||
    doc.webkitIsFullScreen
  );
};

export const exitFullscreen = () => {
  const doc = document;
  if (doc.fullscreenElement) {
    doc.exitFullscreen();
  } else if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  } else {
    doc.webkitCancelFullScreen();
  }
};

export const enterFullscreen = ($player) => {
  const element = $player;
  if (!element) {
    return;
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else {
    element.webkitRequestFullScreen();
  }
};
const PlayerTools = {};
export default PlayerTools;
