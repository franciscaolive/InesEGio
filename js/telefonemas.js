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

  const setActiveSection = (section) => {
    clearActive();
    if (section) {
      section.classList.add('playing');
      activeSection = section;
    }
  };

  const playCall = (row) => {
    const section = row.closest('.call-section');
    const audioSrc = row.dataset.audio;

    if (!audioSrc) {
      console.warn('No audio source configured for', row.dataset.call);
      return;
    }

    const isSameTrack = activeSrc === audioSrc;
    const isPlaying = !audioPlayer.paused;

    if (isSameTrack && isPlaying) {
      audioPlayer.pause();
      clearActive();
      return;
    }

    if (isSameTrack && !isPlaying) {
      setActiveSection(section);
      audioPlayer.play().catch((err) => {
        console.error('Unable to resume audio', err);
        clearActive();
      });
      return;
    }

    audioPlayer.pause();
    audioPlayer.src = audioSrc;
    activeSrc = audioSrc;
    audioPlayer.currentTime = 0;
    setActiveSection(section);
    audioPlayer.play().catch((err) => {
      console.error('Unable to play audio', err);
      clearActive();
      activeSrc = '';
    });
  };

  audioPlayer.addEventListener('ended', () => {
    clearActive();
    activeSrc = '';
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
