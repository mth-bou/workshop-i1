/****************************************/
/********** Scripts  *************/
/****************************************/
/* Description :                        */
/*  - Script pour playlist vidéo        */
/* Responsabilité :                     */
/*  - Equipe DIGITALE CM-CIC/AM         */
/****************************************/
/****************************************/

// A refacto avec du filter/map quand polyfill dispo
var $videoContainer = document.querySelector('.px-video-container');
var $videoPlaylist = $videoContainer.querySelector('.video-playList');

if ($videoContainer && $videoPlaylist) {
  var $videoPlayer = $videoContainer.querySelector('video');
  var $playListLinks = $videoPlaylist.querySelectorAll('a');

  var videoPlaylist = {
    onClick: function () {
      for (var i = 0; i < $playListLinks.length; i++) {

        // On boucle sur tous les éléments du sommaire
        $playListLinks[i].addEventListener('click', function (e) {

          // On stoppe le comportement par défaut des liens et la propagation
          e.preventDefault();
          e.stopPropagation();

          // On enlève la classe 'active' de l'élément par défaut et on la met sur l'élément cliqué
          this.parentElement.parentElement.querySelector('.active').classList.remove('active');
          this.parentElement.classList.add('active');

          // On récupère l'url cliqué et on la passe au player
          var url = this.href;
          $videoPlayer.src = url;
          $videoPlayer.play();
        })
      }

    },
    onEnd: function () {

      $videoPlayer.addEventListener('ended', function (e) {
        for (var i = 0; i < $playListLinks.length; i++) {

          var currentVideoUrl = $playListLinks[i].href;
          var currentVideoEnded = currentVideoUrl.indexOf(e.target.currentSrc);

          // Si la vidéo qui se termine à la même url que la vidéo active 
          if (currentVideoEnded === 0) {

            var nextVideo = $playListLinks[i].parentElement.nextElementSibling;

            // On regarde s'il y a une autre vidéo après
            if (nextVideo !== null) {
              $playListLinks[i].parentElement.classList.remove('active');
              nextVideo.classList.add('active');

              // on récupère la vidéo de la prochaine et on lance le player
              var nextVideoURL = nextVideo.querySelector('a').href;
              $videoPlayer.src = nextVideoURL;
              $videoPlayer.play();
            }
          }
        }

      });
    },
    init: function () {
      this.onClick();
      this.onEnd();
    }
  }

  videoPlaylist.init();
}