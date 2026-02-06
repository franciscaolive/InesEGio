//measure images and set CSS grid row spans to preserve full image height
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.three-up, .photo-grid');
  const rowHeightPx = 10; //must match CSS grid-auto-rows value
  const rowGap = 12; // 0.75rem = 12px

  function resizeItem(item) {
    const img = item.querySelector('img');
    if (!img) return;
    const height = img.getBoundingClientRect().height;
    const rowSpan = Math.ceil((height + rowGap) / (rowHeightPx + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  function resizeAll() {
    containers.forEach(container => {
      const items = container.querySelectorAll('a');
      items.forEach(resizeItem);
    });
  }

  //load listeners so measurements happen after images load
  containers.forEach(container => {
    const imgs = container.querySelectorAll('img');
    imgs.forEach(img => {
      if (img.complete) {
        //small timeout to ensure layout settled
        setTimeout(resizeAll, 20);
      } else {
        img.addEventListener('load', resizeAll);
        img.addEventListener('error', resizeAll);
      }
    });
  });

  //recompute window resize
  window.addEventListener('resize', () => {
    //debounce
    clearTimeout(window._galleryResizeTimer);
    window._galleryResizeTimer = setTimeout(resizeAll, 120);
  });

  //initial run in case images already loaded
  setTimeout(resizeAll, 50);
});

