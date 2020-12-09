/* Play an animation on each click */
    let iconSkipForward = document.querySelector('.bodymovinanim');

    let animationSkipForward = bodymovin.loadAnimation({
            container: iconSkipForward,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            // path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/skip-forward.json"
            path: "assets/pissenlits.json"
    });

      iconSkipForward.addEventListener('click', function() {
      animationSkipForward.playSegments([0,60], true);
    });