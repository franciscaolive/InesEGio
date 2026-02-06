const callRows = document.querySelectorAll('.call-row');

if (callRows.length) {
  const audioPlayer = new Audio();
  audioPlayer.preload = 'none';

  let activeSection = null;
  let activeSrc = '';

  const clearActive = () => {
    if (activeSection) {
      activeSection.classList.remove('playing');
      activeSection = null;
    }
  };

  const playCall = (row) => {
    const section = row.closest('.call-section');
    const audioSrc = row.dataset.audio;

    if (!audioSrc) {
      console.warn('No audio source configured for', row.dataset.call);
      return;
    }

    if (activeSrc !== audioSrc) {
      audioPlayer.src = audioSrc;
      activeSrc = audioSrc;
    }

    clearActive();
    if (section) {
      section.classList.add('playing');
      activeSection = section;
    }

    audioPlayer.currentTime = 0;
    audioPlayer.play().catch((err) => {
      console.error('Unable to play audio', err);
      clearActive();
    });
  };

  audioPlayer.addEventListener('ended', clearActive);
  audioPlayer.addEventListener('pause', () => {
    if (audioPlayer.currentTime === 0) {
      clearActive();
    }
  });

  const bindClick = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('click', () => {
        const row = el.closest('.call-row');
        if (row) {
          playCall(row);
        }
      });
    });
  };

  bindClick('.call-name');
  bindClick('.call-play-btn');
}
