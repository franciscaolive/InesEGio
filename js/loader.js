//fade in para esconder loading time dos svgs
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  
  //espera que todas as imagens carreguem
  const images = Array.from(document.querySelectorAll('img'));
  let loadedCount = 0;
  
  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount >= images.length) {
      container.classList.add('fade-in');
    }
  }
  
  if (images.length === 0) {
    container.classList.add('fade-in');
  } else {
    images.forEach(img => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded);
      }
    });
  }
  
  //mostra conteudo 3seg dps anyways
  setTimeout(() => {
    container.classList.add('fade-in');
  }, 3000);
});
