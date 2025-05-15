/**
 * Discord Bot Website By Anomus.LY
 * Repo URL: https://github.com/AnomusLY/CandyWeb
 * © 2025 Anomus.LY
 */

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');

  window.addEventListener('load', () => {
    preloader.classList.add('hidden');

    document.body.style.overflow = 'auto';

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  document.body.style.overflow = 'hidden';
});
