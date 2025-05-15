/**
 * Discord Bot Website By Anomus.LY
 * Repo URL: https://github.com/AnomusLY/CandyWeb
 * © 2025 Anomus.LY
 */

document.addEventListener('DOMContentLoaded', () => {
  initHexagonPattern('heroPattern');
  initHexagonPattern('commandsPattern');
  initHexagonPattern('iconGridPattern');
  initHexagonPattern('supportPattern');
});

function initHexagonPattern(patternId) {
  const pattern = document.getElementById(patternId);
  if (!pattern) return;

  const containerWidth = pattern.offsetWidth;
  const containerHeight = pattern.offsetHeight;

  const hexSize = 60;
  const hexGap = 10;

  const columns = Math.ceil(containerWidth / (hexSize + hexGap)) + 2;
  const rows = Math.ceil(containerHeight / (hexSize + hexGap)) + 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const hexagon = document.createElement('div');
      hexagon.className = 'hexagon';

      if (row % 2 === 1) {
        hexagon.style.marginLeft = `${hexSize / 2}px`;
      }

      pattern.appendChild(hexagon);
    }
  }

  addRandomEffects(pattern);
}

function addRandomEffects(pattern) {
  const hexagons = pattern.querySelectorAll('.hexagon');
  const totalHexagons = hexagons.length;

  const activeCount = Math.floor(totalHexagons * 0.02);
  const glowCount = Math.floor(totalHexagons * 0.03);
  const primaryCount = Math.floor(totalHexagons * 0.02);
  const accentCount = Math.floor(totalHexagons * 0.02);

  for (let i = 0; i < activeCount; i++) {
    const baseIndex = Math.floor(Math.random() * totalHexagons);
    hexagons[baseIndex].classList.add('active');

    if (baseIndex + 1 < totalHexagons && Math.random() < 0.3) {
      hexagons[baseIndex + 1].classList.add('active');
    }

    if (baseIndex - 1 >= 0 && Math.random() < 0.3) {
      hexagons[baseIndex - 1].classList.add('active');
    }
  }

  for (let i = 0; i < glowCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    if (!hexagons[randomIndex].classList.contains('active')) {
      hexagons[randomIndex].classList.add('glow');
    }
  }

  for (let i = 0; i < primaryCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    if (!hexagons[randomIndex].classList.contains('active') &&
        !hexagons[randomIndex].classList.contains('glow')) {
      hexagons[randomIndex].classList.add('primary');
    }
  }

  for (let i = 0; i < accentCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    if (!hexagons[randomIndex].classList.contains('active') &&
        !hexagons[randomIndex].classList.contains('glow') &&
        !hexagons[randomIndex].classList.contains('primary')) {
      hexagons[randomIndex].classList.add('accent');
    }
  }

  const activeHexagons = pattern.querySelectorAll('.hexagon.active');
  const pulseCount = Math.floor(activeHexagons.length * 0.7);

  for (let i = 0; i < pulseCount; i++) {
    if (i < activeHexagons.length) {
      activeHexagons[i].classList.add('pulse');
    }
  }

  setInterval(() => {
    updateRandomEffects(pattern);
  }, 3000);
}

function updateRandomEffects(pattern) {
  const hexagons = pattern.querySelectorAll('.hexagon');
  const totalHexagons = hexagons.length;

  const removeCount = Math.floor(totalHexagons * 0.01);

  for (let i = 0; i < removeCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    hexagons[randomIndex].classList.remove('active', 'glow', 'pulse');
  }

  const addActiveCount = Math.floor(totalHexagons * 0.01);

  for (let i = 0; i < addActiveCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    if (!hexagons[randomIndex].classList.contains('active') &&
        !hexagons[randomIndex].classList.contains('glow')) {
      hexagons[randomIndex].classList.add('active');

      if (Math.random() > 0.5) {
        hexagons[randomIndex].classList.add('pulse');
      }
    }
  }

  const addGlowCount = Math.floor(totalHexagons * 0.01);

  for (let i = 0; i < addGlowCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    if (!hexagons[randomIndex].classList.contains('active') &&
        !hexagons[randomIndex].classList.contains('glow')) {
      hexagons[randomIndex].classList.add('glow');
    }
  }
}
