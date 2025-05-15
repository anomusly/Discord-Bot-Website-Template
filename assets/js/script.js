/**
 * Discord Bot Website By Anomus.LY
 * Repo URL: https://github.com/AnomusLY/CandyWeb
 * © 2025 Anomus.LY
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    const icon = mobileMenuToggle.querySelector('i');
    if (navContainer.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (
      navContainer.classList.contains('active') &&
      !navContainer.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      navContainer.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  const categories = document.querySelectorAll('.category');
  let autoSwitchInterval;
  let userInteracted = false;
  let currentCategoryIndex = 0;

  function switchToCategory(categoryIndex) {
    const category = categories[categoryIndex];

    if (category.classList.contains('active')) {
      return;
    }

    categories.forEach(c => c.classList.remove('active'));
    category.classList.add('active');

    const activeGroup = document.querySelector('.command-group.active');
    const groupToShow = document.querySelector(`[data-group="${category.dataset.category}"]`);

    if (activeGroup) {
      const items = activeGroup.querySelectorAll('.command-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(-20px)';
        }, 30 * index);
      });

      setTimeout(() => {
        document.querySelectorAll('.command-group').forEach(g => {
          g.classList.remove('active');
        });

        if (groupToShow) {
          groupToShow.classList.add('active');

          const commandItems = groupToShow.querySelectorAll('.command-item');
          commandItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
              item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50 * index); 
          });
        }
      }, 300);
    } else {
      document.querySelectorAll('.command-group').forEach(g => {
        g.classList.remove('active');
      });

      if (groupToShow) {
        groupToShow.classList.add('active');

        const commandItems = groupToShow.querySelectorAll('.command-item');
        commandItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';

          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50 * index); 
        });
      }
    }
  }

  const progressBar = document.querySelector('.category-progress');
  const switchInterval = 5000;
  let startTime;

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / switchInterval * 100, 100);

    progressBar.style.width = `${progress}%`;

    if (progress < 100 && !userInteracted) {
      requestAnimationFrame(animateProgress);
    } else if (progress >= 100 && !userInteracted) {
      startTime = null;
      progressBar.style.width = '0%';

      currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      switchToCategory(currentCategoryIndex);

      requestAnimationFrame(animateProgress);
    } else if (userInteracted) {
      progressBar.style.width = '0%';
    }
  }

  function startAutoSwitch() {
    if (autoSwitchInterval) {
      clearInterval(autoSwitchInterval);
    }

    startTime = null;
    requestAnimationFrame(animateProgress);

    autoSwitchInterval = setInterval(() => {
      if (!userInteracted) {
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        switchToCategory(currentCategoryIndex);

        progressBar.style.width = '0%';
        startTime = null;
      }
    }, switchInterval);
  }

  categories.forEach((category, index) => {
    category.addEventListener('click', () => {
      userInteracted = true;
      currentCategoryIndex = index;

      progressBar.style.width = '0%';

      switchToCategory(index);

      setTimeout(() => {
        userInteracted = false;
        requestAnimationFrame(function(timestamp) {
          startTime = timestamp;
          animateProgress(timestamp);
        });
      }, 10000);
    });
  });

  const commandsSection = document.querySelector('.commands');
  commandsSection.addEventListener('mousemove', () => {
    userInteracted = true;

    progressBar.style.width = '0%';

    clearTimeout(commandsSection.mouseMoveTimeout);
    commandsSection.mouseMoveTimeout = setTimeout(() => {
      userInteracted = false;
      requestAnimationFrame(function(timestamp) {
        startTime = timestamp;
        animateProgress(timestamp);
      });
    }, 10000);
  });

  generateCommandGroups();

  generateIconGrid();

  initAnimations();

  setTimeout(() => {
    const activeGroup = document.querySelector('.command-group.active');
    if (activeGroup) {
      const commandItems = activeGroup.querySelectorAll('.command-item');
      commandItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50 * index);
      });
    }

    startAutoSwitch();
  }, 500);
});

function generateCommandGroups() {
  const commandList = document.querySelector('.command-list');

  const musicCommands = `
    <div class="command-group active" data-group="music">
      <h3 class="command-category-title"><i class="fas fa-music"></i> Music Commands</h3>
      <div class="command-category-list">
        <div class="command-item">
          <div class="command-name"><i class="fas fa-play"></i> play</div>
          <div class="command-description">Play a song from Spotify, YouTube, or SoundCloud</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-list"></i> queue</div>
          <div class="command-description">View the current queue of songs</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-forward"></i> skip</div>
          <div class="command-description">Skip to the next song in the queue</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-backward"></i> previous</div>
          <div class="command-description">Play the previous song</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-music"></i> lyrics</div>
          <div class="command-description">Show lyrics for the current song</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-pause"></i> pause</div>
          <div class="command-description">Pause the current song</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-play"></i> resume</div>
          <div class="command-description">Resume the paused song</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-stop"></i> stop</div>
          <div class="command-description">Stop playback and clear the queue</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-volume-up"></i> volume</div>
          <div class="command-description">Adjust the playback volume</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-random"></i> shuffle</div>
          <div class="command-description">Shuffle the current queue</div>
        </div>
      </div>
    </div>
  `;

  const filterCommands = `
    <div class="command-group" data-group="filters">
      <h3 class="command-category-title"><i class="fas fa-sliders-h"></i> Filter Commands</h3>
      <div class="command-category-list">
        <div class="command-item">
          <div class="command-name"><i class="fas fa-volume-up"></i> filter bassboost</div>
          <div class="command-description">Add bass boost effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-moon"></i> filter nightcore</div>
          <div class="command-description">Add nightcore effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-microphone-slash"></i> filter karaoke</div>
          <div class="command-description">Remove vocals from the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-water"></i> filter vaporwave</div>
          <div class="command-description">Add vaporwave effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-undo"></i> filter reset</div>
          <div class="command-description">Reset all filters</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-drum"></i> filter 8D</div>
          <div class="command-description">Add 8D audio effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-bolt"></i> filter tremolo</div>
          <div class="command-description">Add tremolo effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-wave-square"></i> filter vibrato</div>
          <div class="command-description">Add vibrato effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-robot"></i> filter chipmunk</div>
          <div class="command-description">Add chipmunk effect to the music</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-sliders-h"></i> filter equalizer</div>
          <div class="command-description">Customize equalizer settings</div>
        </div>
      </div>
    </div>
  `;

  const playlistCommands = `
    <div class="command-group" data-group="playlist">
      <h3 class="command-category-title"><i class="fas fa-list"></i> Playlist Commands</h3>
      <div class="command-category-list">
        <div class="command-item">
          <div class="command-name"><i class="fas fa-plus-circle"></i> playlist create</div>
          <div class="command-description">Create a new playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-plus"></i> playlist add</div>
          <div class="command-description">Add a song to a playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-minus"></i> playlist remove</div>
          <div class="command-description">Remove a song from a playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-play-circle"></i> playlist load</div>
          <div class="command-description">Load and play a playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-list-ul"></i> playlist list</div>
          <div class="command-description">View all your playlists</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-info-circle"></i> playlist info</div>
          <div class="command-description">View details of a specific playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-trash-alt"></i> playlist delete</div>
          <div class="command-description">Delete a playlist</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fab fa-spotify"></i> playlist import</div>
          <div class="command-description">Import a playlist from Spotify</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-random"></i> playlist shuffle</div>
          <div class="command-description">Shuffle a playlist before playing</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-share-alt"></i> playlist share</div>
          <div class="command-description">Share a playlist with other users</div>
        </div>
      </div>
    </div>
  `;

  const utilityCommands = `
    <div class="command-group" data-group="utility">
      <h3 class="command-category-title"><i class="fas fa-tools"></i> Utility Commands</h3>
      <div class="command-category-list">
        <div class="command-item">
          <div class="command-name"><i class="fas fa-question-circle"></i> help</div>
          <div class="command-description">Show all available commands</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-tachometer-alt"></i> ping</div>
          <div class="command-description">Check bot's response time</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-link"></i> invite</div>
          <div class="command-description">Get bot invite link</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-headset"></i> support</div>
          <div class="command-description">Get support server link</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-vote-yea"></i> vote</div>
          <div class="command-description">Vote for Candy Bot</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-cog"></i> settings</div>
          <div class="command-description">Configure bot settings for your server</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-language"></i> language</div>
          <div class="command-description">Change the bot's language</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-info-circle"></i> botinfo</div>
          <div class="command-description">View information about the bot</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-server"></i> serverinfo</div>
          <div class="command-description">View information about the server</div>
        </div>
        <div class="command-item">
          <div class="command-name"><i class="fas fa-user"></i> userinfo</div>
          <div class="command-description">View information about a user</div>
        </div>
      </div>
    </div>
  `;

  commandList.innerHTML = musicCommands + filterCommands + playlistCommands + utilityCommands;
}

function generateIconGrid() {
  const iconsContainer = document.querySelector('.icons-container');

  const icons = [
    { name: 'play', icon: 'fas fa-play' },
    { name: 'pause', icon: 'fas fa-pause' },
    { name: 'skip', icon: 'fas fa-forward' },
    { name: 'previous', icon: 'fas fa-backward' },
    { name: 'stop', icon: 'fas fa-stop' },
    { name: 'loop', icon: 'fas fa-redo' },
    { name: 'shuffle', icon: 'fas fa-random' },
    { name: 'volume', icon: 'fas fa-volume-up' },
    { name: 'mute', icon: 'fas fa-volume-mute' },
    { name: 'playlist', icon: 'fas fa-list' },
    { name: 'lyrics', icon: 'fas fa-file-alt' },
    { name: 'filter', icon: 'fas fa-sliders-h' },
    { name: 'spotify', icon: 'fab fa-spotify' },
    { name: 'youtube', icon: 'fab fa-youtube' },
    { name: 'soundcloud', icon: 'fab fa-soundcloud' },
    { name: 'deezer', icon: 'fas fa-music' },
    { name: 'apple', icon: 'fab fa-apple' },
    { name: 'radio', icon: 'fas fa-broadcast-tower' },
    { name: '24/7', icon: 'fas fa-clock' },
    { name: 'queue', icon: 'fas fa-stream' },
    { name: 'search', icon: 'fas fa-search' },
    { name: 'grab', icon: 'fas fa-download' },
    { name: 'vote', icon: 'fas fa-vote-yea' },
    { name: 'premium', icon: 'fas fa-crown' },
    { name: 'support', icon: 'fas fa-headset' },
    { name: 'invite', icon: 'fas fa-user-plus' },
    { name: 'help', icon: 'fas fa-question-circle' },
    { name: 'settings', icon: 'fas fa-cog' },
    { name: 'bassboost', icon: 'fas fa-volume-down' },
    { name: 'nightcore', icon: 'fas fa-moon' },
    { name: 'karaoke', icon: 'fas fa-microphone' },
    { name: 'vaporwave', icon: 'fas fa-water' },
    { name: 'equalizer', icon: 'fas fa-sliders-h' },
    { name: 'volume_up', icon: 'fas fa-volume-up' },
    { name: 'volume_down', icon: 'fas fa-volume-down' },
    { name: 'discord', icon: 'fab fa-discord' },
    { name: 'heart', icon: 'fas fa-heart' },
    { name: 'star', icon: 'fas fa-star' },
    { name: 'fire', icon: 'fas fa-fire' },
    { name: 'bolt', icon: 'fas fa-bolt' },
  ];

  let iconsHTML = '';
  icons.forEach(icon => {
    iconsHTML += `
      <div class="icon-item" data-name="${icon.name}" title="${icon.name}">
        <span><i class="${icon.icon}"></i></span>
      </div>
    `;
  });

  iconsContainer.innerHTML = iconsHTML;

  const iconItems = document.querySelectorAll('.icon-item');
  iconItems.forEach(item => {
    const randomDelay = Math.random() * 2;
    item.style.animationDelay = `${randomDelay}s`;

    item.addEventListener('mouseenter', () => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      item.appendChild(ripple);

      item.classList.add('glow');

      setTimeout(() => {
        ripple.remove();
        item.classList.remove('glow');
      }, 1000);
    });
  });
}

function initAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .support-card');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('animate');
      }
    });
  };

  animateOnScroll();

  window.addEventListener('scroll', animateOnScroll);
}

function handleSpotifyAuth() {
  const callbackElement = document.getElementById('spotify-callback');

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    callbackElement.innerHTML = `<p>Authentication successful You can close this window.</p>`;
    callbackElement.style.display = 'block';

    setTimeout(() => {
      callbackElement.style.display = 'none';
    }, 5000);
  }
}
