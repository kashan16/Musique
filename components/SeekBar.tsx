import { Song } from "@/types";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface SeekbarProps {
  onChange?: (value: number) => void;
  data: Song;
  onPlay : () => void;
  onPause : () => void;
  isPlaying : boolean;
}

const SeekBar: React.FC<SeekbarProps> = ({ data , onChange , onPlay , onPause , isPlaying}) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  let interval : any;

  useEffect(() => {
    const fetchSongDuration = async () => {
      try {
        const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(data.title)}`);
        const result = response.data?.data?.results[0];
        if (result) {
          const lowercaseAuthor = data.author.toLowerCase();
          const lowercasePrimaryArtists = result.primaryArtists.toLowerCase();
          if (lowercasePrimaryArtists.includes(lowercaseAuthor)) {
            setSongDuration(result.duration);
          } else {
            console.warn('Song not found or artist does not match');
          }
        } else {
          console.warn('No results found for the song');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongDuration();
  }, [data.title, data.author]);

  function TimeCurrent() {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
      if (songDuration !== null && isPlaying) {
        // Update progress every second
        intervalRef.current = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + (1 / (songDuration || 0));
            // Check if the new progress is greater than or equal to 1 (100%)
            if (newProgress >= 1) {
              // Song has ended, clear the interval
              clearInterval(intervalRef.current!);
            }
            return newProgress;
          });
        }, 1000);
      }
  
      return () => {
        // Cleanup interval on component unmount
        clearInterval(intervalRef.current!);
      };
    }, []);
    TimeCurrent();
  }

  /* TimeCurrent(); */

  const handleChange = (newValue: number) => {
    // Update the displayed duration when the seek bar value changes
    const newDuration = newValue * (songDuration || 0);
    setSongDuration(newDuration);

    // Call the provided onChange prop
    onChange?.(newValue);
  };


  useEffect(() => {
    if(!isPlaying){
      // If the song is paused, clear the interval
      clearInterval(interval);
    }
  } , [isPlaying , interval]);

  return (
    <div style={{ position: 'relative', width: '256px', marginTop: '-15px' }}>
      <div className="relative flex items-center select-none touch-none h-full" aria-label="progress">
        <div style={{ marginRight: '10px' ,}} className="text-white text-bold transition-all">{formatDuration(progress * (songDuration || 1))}</div>
        <div className="bg-neutral-500 relative grow rounded-full h-[3px]">
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress * 100} sx={{ borderRadius : '8px' , background: 'lightgray', '& .MuiLinearProgress-bar': { backgroundColor: 'limegreen' , borderRadius : '8px' },}}/>
          </Box>
        </div>
        <div style={{ marginLeft: '10px' }} className="text-white text-bold">{formatDuration(songDuration || 0)}</div>
      </div>
    </div>
  );
};

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default SeekBar;