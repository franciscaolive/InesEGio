//ytb video ids for each section
const videoIds = {
  '1': 'LYphRh0h454',//preparativos
  '2': 'yC2wen7VArg',//primeiro encontro
  '3': '8V8H89t7ztU',//receção
  '4': 'dQw4w9WgXcQ',//cerimonia
  '5': 'dQw4w9WgXcQ',//cocktail
  '6': 'Rx0RO51JFzs'//jantar
};

const YT_THUMBNAIL = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function loadVideo(videoNum) {
  const videoId = videoIds[videoNum];
  if (!videoId) return;

  const wrapper = document.getElementById(`video-${videoNum}`);
  if (!wrapper || wrapper.classList.contains('loaded')) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  const placeholder = wrapper.querySelector('.video-placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  wrapper.appendChild(iframe);
  wrapper.classList.add('loaded');

  const playLabel = document.querySelector(`.video-play-btn[data-video="${videoNum}"]`);
  if (playLabel) {
    playLabel.classList.add('played');
  }
}

//thumbnails and interactions
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  const videoNum = wrapper.id.split('-')[1];
  const placeholder = wrapper.querySelector('.video-placeholder');
  const videoId = videoIds[videoNum];

  if (placeholder && videoId) {
    placeholder.style.backgroundImage = `url(${YT_THUMBNAIL(videoId)})`;
    placeholder.addEventListener('click', () => loadVideo(videoNum));
  }
});

//click handlers to all play labels
document.querySelectorAll('.video-play-btn').forEach(button => {
  button.addEventListener('click', () => loadVideo(button.getAttribute('data-video')));
});
