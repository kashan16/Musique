import { Song } from "@/types";
import { Tooltip } from "@mui/material";
import Slider from '@mui/material/Slider';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface SeekbarProps {
  onChange?: (value: number) => void;
  data: Song;
  onPlay : () => void;
  onPause : () => void;
  isPlaying : boolean;
}

const SeekBar: React.FC<SeekbarProps> = ({ data , onChange , onPlay , onPause , isPlaying}) => {
  const [songDuration, setSongDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [songUrl , setSongUrl ] = useState<string | null>("");
  let interval : any;

  useEffect(() => {
    const fetchSongUrl = async () => {
      try {
        const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(data.title)}`);
        const result = response.data?.data?.results[0];
        if (result) {
          const lowercaseAuthor = data.author.toLowerCase();
          const lowercasePrimaryArtists = result.primaryArtists.toLowerCase();
          if (lowercasePrimaryArtists.includes(lowercaseAuthor)) {
            const lastDownloadLink = result.downloadUrl.slice(-1)[0].link;
            setSongUrl(lastDownloadLink);
          }
        }
      } catch (error) {
        console.error('Error fetching song URL:', error);
      }
    };
  
    fetchSongUrl(); 
  
  }, [data.title, data.author]);
  

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
  }

  TimeCurrent();

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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ position: 'relative', width: '256px', marginTop: '-15px' }}>
      <Tooltip  title={`${formatDuration(songDuration || 0)} (${Math.round((progress || 1) * 100)}%)`} open={isHovered} placement="top">
      <Slider value={progress} min={0} max={songDuration} step={1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        sx={{
          color: '#4CAF50',
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px 0px #4CAF50',
            visibility : isHovered ? 'visible' : 'hidden',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#d4d4d4',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#4CAF50',
          },
        }}
      />
      </Tooltip>
    </div>
  );
};

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default SeekBar;