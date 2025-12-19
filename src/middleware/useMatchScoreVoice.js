import { useState, useEffect } from 'react';

// Custom hook for match score and voice logic
const useMatchScoreVoice = (cb) => {
  const [isMuted, setIsMuted] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Function to toggle mute
  const handleVolumeToggle = () => {
    setIsMuted((prev) => !prev);
  };

  // Effect to play audio based on match score and mute state
  useEffect(() => {
    if (!isMuted && cb) {
      const score = cb;
      let audioFile = null;

      switch (score) {
        case "Over End":
          audioFile = '/iframe7audio/over.mp3';
          break;
        case "Wicket":
        case "Bowled Out":
        case "Caught & Bowled":
        case "Run Out":
        case "Lbw Out":
        case "Hit Wicket":
        case "Stump Out":
        case "Caught Out":
        case "wicket":
        case "Wicket":
          audioFile = '/iframe7audio/wicket.mp3';
          break;
        case "Wide Ball":
          audioFile = '/iframe7audio/wide.mp3';
          break;
        case '0' || "norun":
          audioFile = '/iframe7audio/norun.mp3';
          break;
        case '1':
          audioFile = '/iframe7audio/1run.mp3';
          break;
        case '2':
          audioFile = '/iframe7audio/2run.mp3';
          break;
        case '3':
          audioFile = '/iframe7audio/3run.mp3';
          break;
        case '4' || "4run":
          audioFile = '/iframe7audio/4run.mp3';
          break;
        case '6' || "6run" || 6:
          audioFile = '/iframe7audio/New6Run.mp3';
          break;
        case "Ball Challu":
          audioFile = '/iframe7audio/ballrunning.mp3';
          break;
        case "over" || "Over":
          audioFile = '/iframe7audio/over.mp3';
          break;
        default:
          audioFile = '/iframe7audio/default.mp3';
      }

      const audio = new Audio(audioFile);
      audio.volume = 1;
      audio.play();
    }
  }, [isMuted, cb]);

  // Effect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMuted,
    handleVolumeToggle,

    isSmallScreen,
  };
};

export default useMatchScoreVoice;
