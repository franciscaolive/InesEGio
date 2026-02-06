//lightbox
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  //gets gallery images
  const galleryLinks = document.querySelectorAll('.gallery a');
  let currentIndex = 0;
  
  //open lightbox
  function openLightbox(index) {
    currentIndex = index;
    const link = galleryLinks[currentIndex];
    const imgSrc = link.getAttribute('href');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; //stops scrolling
  }
  
  //close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; //restores scrolling
  }
  
  //shows prev img
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
    openLightbox(currentIndex);
  }
  
  //shows next img
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryLinks.length;
    openLightbox(currentIndex);
  }
  
  //adds clicks for gallery images
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });
  
  //close button
  closeBtn.addEventListener('click', closeLightbox);
  
  //nav buttons
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  
  //closes on bg click asw
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  //keyboard nav
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
});
