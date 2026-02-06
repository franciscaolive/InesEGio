const callRows = document.querySelectorAll('.call-row');

if (callRows.length) {
  const audioPlayer = new Audio();
  audioPlayer.preload = 'none';

  let activeSection = null;
  let activeSrc = '';
  let activeProgress = null;

  const resetProgress = (section) => {
    if (!section) return;
    const bar = section.querySelector('.call-progress-bar');
    if (bar) {
      bar.style.width = '0%';
    }
  };

  const attachSection = (section) => {
    activeSection = section || null;
    activeProgress = section ? section.querySelector('.call-progress-bar') : null;
  };

  const setPlayingState = (section, isPlaying) => {
    if (!section) return;
    section.classList.toggle('playing', Boolean(isPlaying));
  };

  const playCall = (row) => {
    const section = row.closest('.call-section');
    const audioSrc = row.dataset.audio;

    if (!audioSrc) {
      console.warn('No audio source configured for', row.dataset.call);
      return;
    }

    const isSameTrack = activeSrc === audioSrc;

    if (isSameTrack) {
      attachSection(section);
      if (!audioPlayer.paused) {
        audioPlayer.pause();
        setPlayingState(section, false);
      } else {
        setPlayingState(section, true);
        audioPlayer.play().catch((err) => {
          console.error('Unable to resume audio', err);
          setPlayingState(section, false);
        });
      }
      return;
    }

    if (activeSection && activeSection !== section) {
      setPlayingState(activeSection, false);
      resetProgress(activeSection);
    }

    audioPlayer.pause();
    audioPlayer.src = audioSrc;
    activeSrc = audioSrc;
    attachSection(section);
    resetProgress(section);
    setPlayingState(section, true);
    audioPlayer.currentTime = 0;

    audioPlayer.play().catch((err) => {
      console.error('Unable to play audio', err);
      setPlayingState(section, false);
      resetProgress(section);
      attachSection(null);
      activeSrc = '';
    });
  };

  audioPlayer.addEventListener('timeupdate', () => {
    if (!activeProgress || !audioPlayer.duration) return;
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    activeProgress.style.width = `${Math.min(percentage, 100)}%`;
  });

  audioPlayer.addEventListener('ended', () => {
    resetProgress(activeSection);
    setPlayingState(activeSection, false);
    attachSection(null);
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
