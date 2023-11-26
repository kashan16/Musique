import { Song } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface SeekbarProps {
  onChange?: (value: number) => void;
  data: Song;
}

const SeekBar: React.FC<SeekbarProps> = ({ data }) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    let interval : any;

    if (songDuration !== null) {
      // Update progress every second
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (1 / songDuration);
          // Check if the new progress is greater than or equal to 1 (100%)
          if (newProgress >= 1) {
            // Song has ended, clear the interval
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      // Cleanup interval on component unmount
      clearInterval(interval);
    };
  }, [songDuration]);

  const handleChange = (newValue: number) => {
    // Update the displayed duration when the seek bar value changes
    const newDuration = newValue * (songDuration || 0);
    setSongDuration(newDuration);

    // Call the provided onChange prop
  };

  return (
    <div style={{ position: 'relative', width: '256px', marginTop: '-15px' }}>
      <div className="relative flex items-center select-none touch-none h-full" aria-label="progress">
        <div style={{ marginRight: '10px' }} className="text-white text-bold">{formatDuration(0)}</div>
        <div className="bg-neutral-600 relative grow rounded-full h-[3px]">
          <div className="absolute bg-white rounded-full h-full transition-all" style={{ width: `${progress * 100}%` }} />
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
