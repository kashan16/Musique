import { Song } from "@/types";
import * as RadixSlider from "@radix-ui/react-slider";
import axios from "axios";
import { useEffect, useState } from "react";

interface SeekbarProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number;
  data: Song;
}

const SeekBar: React.FC<SeekbarProps> = ({ value = 0, onChange, duration = 0, data }) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);

 useEffect(() => {
  const fetchSongDuration = async () => {
    try {
      const response = await axios.get(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(`recording:${data.title} AND artist:${data.author}`)}&fmt=json`);
      const recording = response.data.recordings[0]; // Assuming the first result is the most relevant
      console.log('Recording:', recording); // Add this line to check the structure of the recording object
      const durationInSeconds = recording ? Math.round(recording.length / 1000) : null;
      console.log('Duration:', durationInSeconds); // Add this line to check the duration value
      setSongDuration(durationInSeconds);
    } catch (error) {
      console.error('Error fetching song duration:', error);
    }
  };
  fetchSongDuration();
}, [data.author, data.title]);


  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <div style={{ position: 'relative', width: '256px' }}>
      <RadixSlider.Root className="relative flex items-center select-none touch-none h-full" value={[value]} onValueChange={handleChange} aria-label="Volume">
        {songDuration !== null && <div>
          {formatDuration(songDuration)}
        </div>}
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="absolute bg-white rounded-full h-full transition-all" style={{ transform: `scaleX(${value})` }} />
        </RadixSlider.Track>
      </RadixSlider.Root>
    </div>
  );
};

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default SeekBar;
