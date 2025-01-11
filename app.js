(function() {
      const debugOutput = document.getElementById('debug-output');
      const versionElement = document.getElementById('version');
      const pointsElement = document.getElementById('points');
      const referralPointsElement = document.getElementById('referral-points');
      const tgUsernameElement = document.getElementById('tg-username');
      const subscribeButton = document.querySelector('.subscribe');
      const likeButton = document.querySelector('.like');
      const checkinButton = document.querySelector('.checkin');
      const inviteButton = document.querySelector('.invite');
      const appVersion = 'v1.0';
      let points = 0;
      let referralPoints = 0;
      let lastLikeTime = 0;
      let lastCheckinTime = 0;
      const likeCooldown = 60000; // 1 minute in milliseconds
      const checkinCooldown = 60000; // 1 minute in milliseconds

      function logToDebug(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const messageElement = document.createElement('div');
        messageElement.className = `debug-message ${type}`;
        messageElement.textContent = `[${timestamp}] ${message}`;
        debugOutput.appendChild(messageElement);
        debugOutput.scrollTop = debugOutput.scrollHeight;
      }

      function addPoints(amount) {
        points += amount;
        pointsElement.textContent = points;
        logToDebug(`Added ${amount} points. Total: ${points}`);
      }

      // Initialize version
      versionElement.textContent = appVersion;
      logToDebug(`Application started. Version: ${appVersion}`);

      // Get Telegram username
      try {
        if (window.Telegram && Telegram.WebApp) {
          const username = Telegram.WebApp.initDataUnsafe.user?.username;
          tgUsernameElement.textContent = username || 'unknown';
          logToDebug(`Telegram username: ${username || 'not available'}`);
        } else {
          logToDebug('Telegram WebApp not detected, running in standalone mode');
        }
      } catch (error) {
        logToDebug(`Error getting Telegram username: ${error.message}`, 'error');
      }

      subscribeButton.addEventListener('click', () => {
        try {
          logToDebug('Opening Telegram channel for subscription...');
          window.open('https://t.me/testetest1dfsd', '_blank');
          logToDebug('Telegram channel opened successfully');

          if (!subscribeButton.classList.contains('disabled')) {
            addPoints(100);
            subscribeButton.classList.add('disabled');
            subscribeButton.disabled = true;
            logToDebug('Subscribe button disabled and points added');
          } else {
            logToDebug('Channel opened, but no additional points awarded (already subscribed)');
          }
        } catch (error) {
          logToDebug(`Error opening Telegram channel: ${error.message}`, 'error');
        }
      });

      likeButton.addEventListener('click', () => {
        const currentTime = Date.now();
        const timeSinceLastLike = currentTime - lastLikeTime;

        if (timeSinceLastLike < likeCooldown) {
          const remainingTime = Math.ceil((likeCooldown - timeSinceLastLike) / 1000);
          logToDebug(`Please wait ${remainingTime} seconds before liking again`, 'warning');
          return;
        }

        try {
          logToDebug('Opening Telegram channel for latest post...');
          window.open('https://t.me/testetest1dfsd', '_blank');
          logToDebug('Telegram channel opened successfully');

          addPoints(20);
          lastLikeTime = currentTime;
          likeButton.classList.add('disabled');
          likeButton.disabled = true;
          logToDebug('Like button disabled and points added');

          setTimeout(() => {
            likeButton.classList.remove('disabled');
            likeButton.disabled = false;
            logToDebug('Like button cooldown ended');
          }, likeCooldown);
        } catch (error) {
          logToDebug(`Error opening Telegram channel: ${error.message}`, 'error');
        }
      });

      checkinButton.addEventListener('click', () => {
        const currentTime = Date.now();
        const timeSinceLastCheckin = currentTime - lastCheckinTime;

        if (timeSinceLastCheckin < checkinCooldown) {
          const remainingTime = Math.ceil((checkinCooldown - timeSinceLastCheckin) / 1000);
          logToDebug(`Please wait ${remainingTime} seconds before checking in again`, 'warning');
          return;
        }

        try {
          addPoints(5);
          lastCheckinTime = currentTime;
          checkinButton.classList.add('disabled');
          checkinButton.disabled = true;
          logToDebug('Daily Check-in completed. Points added.');

          setTimeout(() => {
            checkinButton.classList.remove('disabled');
            checkinButton.disabled = false;
            logToDebug('Daily Check-in cooldown ended');
          }, checkinCooldown);
        } catch (error) {
          logToDebug(`Error during daily check-in: ${error.message}`, 'error');
        }
      });

      inviteButton.addEventListener('click', () => {
        try {
          const message = `Join me in SUN CITY MINIAPP! Let's play together! ${window.location.href}`;
          const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
          window.open(url, '_blank');
          logToDebug('Invite friend link opened');
        } catch (error) {
          logToDebug(`Error opening invite link: ${error.message}`, 'error');
        }
      });
    })();
