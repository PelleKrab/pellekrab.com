document.addEventListener('DOMContentLoaded', function () {
  const numStars = 800; // Adjust this value for the desired star density
  const minStarDistance = 5; // Minimum distance between stars
  const starContainer = document.querySelector('.starry-sky');
  const stars = [];
  const starColors = ['#ffffff', '#ffe9c4', '#d4fbff'];

  function calculateDistance(star1, star2) {
    const dx = star1.x - star2.x;
    const dy = star1.y - star2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function createStars() {
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.x = Math.random() * window.innerWidth;
      star.y = Math.random() * window.innerHeight;

      let validPosition = true;
      for (const existingStar of stars) {
        const distance = calculateDistance(existingStar, star);
        if (distance < minStarDistance) {
          validPosition = false;
          break;
        }
      }

      if (validPosition) {
        star.style.left = `${star.x}px`;
        star.style.top = `${star.y}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starContainer.appendChild(star);
        stars.push(star);
      }
    }
  }

  createStars();

  function updateParallax() {
    const scrollY = window.scrollY;
    stars.forEach(star => {
      const yOffset = -scrollY * 0.5;
      star.style.transform = `translateY(${yOffset}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax);
});
