import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';
const onPlay = throttle(data => {
  localStorage.setItem(currentTime, data.seconds);
}, 1000);

player.on('timeupdate', onPlay);

player.on('loaded', function () {
  if (localStorage.getItem(currentTime)) {
    player.setCurrentTime(localStorage.getItem(currentTime));
  }
});
