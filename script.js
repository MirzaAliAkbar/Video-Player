let player;

          function onYouTubeIframeAPIReady() {
            player = new YT.Player('youtube-player', {
              height: '360',
              width: '640',
              playerVars: {
                controls: 1,
                autoplay: 0,
              },
            });
          }
          
          // Add the showContainer function to your script file
          function showContainer(link) {
            if (link.includes('youtube.com')) {
              // Show YouTube container
            } else if (link.endsWith('.mp4')) {
              // Show MP4 container
            }
          }
          
          // Use the showContainer function when a link is entered
          const linkInput = document.querySelector('#link-input');
          linkInput.addEventListener('input', () => {
            const link = linkInput.value;
            showContainer(link);
          });
          
          
          function playVideo() {
            const videoLink = document.getElementById('video-link').value;
            const videoContainer = document.getElementById('video-container');
            const youtubePlayer = document.getElementById('youtube-player');
            const videoPlayer = document.getElementById('video-player');
          
            videoContainer.classList.add('d-none');
            youtubePlayer.innerHTML = '';
          
            if (videoLink.includes('youtube.com') || videoLink.includes('youtu.be')) {
              const videoId = extractYouTubeVideoId(videoLink);
              if (videoId) {
                if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                  loadYouTubeIframeAPI(() => {
                    playYouTubeVideo(videoId);
                  });
                } else {
                  playYouTubeVideo(videoId);
                }
              }
            } else if (videoLink) {
              videoPlayer.innerHTML = '';
              videoPlayer.insertAdjacentHTML('beforeend', `<source src="${videoLink}" type="video/mp4">`);
              videoPlayer.load();
              videoPlayer.play();
              videoContainer.classList.remove('d-none');
              youtubePlayer.classList.add('d-none');
              player.stopVideo();
            }
          }
          
          function extractYouTubeVideoId(url) {
            let videoId = null;
            const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([^\s&?\/]+)/;
          
          const matches = url.match(youtubeRegex);
          if (matches && matches[1]) {
          videoId = matches[1];
          }
          return videoId;
          }
          
          function loadYouTubeIframeAPI(callback) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = callback;
          }
          
          function playYouTubeVideo(videoId) {
          player.loadVideoById(videoId);
          const videoContainer = document.getElementById('video-container');
          const youtubePlayer = document.getElementById('youtube-player');
          const videoPlayer = document.getElementById('video-player');
          youtubePlayer.classList.remove('d-none');
          videoPlayer.pause();
          videoContainer.classList.remove('d-none');
          }
          
          function allowDrop(event) {
          event.preventDefault();
          }
          
          function handleDrop(event) {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          loadAndPlayVideo(file);
          }
          
          function handleFile(event) {
          const file = event.target.files[0];
          loadAndPlayVideo(file);
          }
          
          function loadAndPlayVideo(file) {
          const videoPlayer = document.getElementById('video-player');
          videoPlayer.innerHTML = '';
          videoPlayer.insertAdjacentHTML('beforeend', `<source src="${URL.createObjectURL(file)}" type="video/mp4">`);
          videoPlayer.load();
          videoPlayer.play();
          document.getElementById('video-container').classList.remove('d-none');
          document.getElementById('youtube-player').classList.add('d-none');
          player.stopVideo();
          }