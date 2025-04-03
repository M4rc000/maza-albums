$(window).on("load", function () {
      Swal.fire({
        title: "Hello 🙌",
        text: "Welcome to Maza's album 😍",
        imageUrl: "./assets/images/welcome/welcome.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Let's go"
      }).then((result) =>{
        if (result.isConfirmed) {
            random_autoplay_audio()
        }
      });

    function random_autoplay_audio(){
        // Select all audio elements
        const audioPlayers = $(".audio-player");
        
        // Generate a random index to pick an audio element
        const randomIndex = Math.floor(Math.random() * audioPlayers.length);
        
        // Randomly set the autoplay attribute to the selected audio element
        audioPlayers[randomIndex].setAttribute("autoplay", "true");
    
        // Attempt to play the audio (if autoplay works)
        audioPlayers[randomIndex].play().catch(error => {
            console.error("Autoplay failed:", error);
        });
    }
});