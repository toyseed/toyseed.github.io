function createStars() {
  let about = document.querySelector('.about_warp');

  if (!about) {
    return;
  }

  let starCount = Math.max(window.innerHeight, window.innerWidth) / 10;

  for (let i = 0; i < starCount; i++) {
    let star = document.createElement('i');
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    let size = Math.random() * 2 | 0;
    let duration = Math.random() * 10;

    star.style.top = y + '%';
    star.style.left = x + '%';
    star.style.width = 1 + size + 'px';
    star.style.height = 1 + size + 'px';
    star.style.animationDuration = 8 + duration + 's';
    star.style.animationDelay = 6 + duration + 's';
    star.style.boxShadow = `0 0 ${size + 2}px ${size + 1}px rgba(255, 255, 255, 0.3)`;

    about.prepend(star);
  }
}

window.addEventListener('load', createStars);
