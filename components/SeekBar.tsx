import { Song } from "@/types";
import * as RadixSlider from "@radix-ui/react-slider";
import axios from "axios";
import { useEffect, useState } from "react";

interface SeekbarProps {
  value?: number;
  onChange?: (value: number) => void;
  data: Song;
}

const SeekBar: React.FC<SeekbarProps> = ({ value = 0, onChange, data }) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchSongDuration = async () => {
      try {
        const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(data.title)}`);
        const result = response.data?.data?.results[0];

        if (result && result.primaryArtists.includes(data.author)) {
          setSongDuration(result.duration);
        } else {
          console.warn('Song not found or artist does not match');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongDuration();
  }, [data.title, data.author]);
  
  const handleChange = (newValue: number[]) => {
    // Update the displayed duration when the seek bar value changes
    const newDuration = newValue[0] * (songDuration || 0);
    setSongDuration(newDuration);

    // Call the provided onChange prop
    onChange?.(newValue[0]);
  };

  return (
    <div style={{ position: 'relative', width: '256px', marginTop: '-10px' }}>
      <RadixSlider.Root className="relative flex items-center select-none touch-none h-full" value={[value]} onValueChange={handleChange} aria-label="Volume" max={1}>
        <div style={{ marginRight: '10px' }} className="text-white text-sm">{formatDuration(0)}</div>
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="absolute bg-white rounded-full h-full transition-all" style={{ transform: `scaleX(${songDuration || 0})` }} />
        </RadixSlider.Track>
        <div style={{ marginLeft: '10px' }} className="text-white text-sm">{formatDuration(songDuration)}</div>
      </RadixSlider.Root>
    </div>
  );
};

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default SeekBar;
