import { Song } from "@/types";
import * as RadixSlider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";

interface SeekbarProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number;
  data: Song;
}

const SeekBar: React.FC<SeekbarProps> = ({ value = 0, onChange, data }) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchSongDuration = async () => {
      try {
        // Fetch song duration and update state
        const duration = await getSongDuration(data);
        setSongDuration(duration);
      } catch (error) {
        console.error('Error fetching song duration:', error);
      }
    };

    fetchSongDuration();
  }, [data]);

  const handleChange = (newValue: number[]) => {
    // Update the displayed duration when the seek bar value changes
    const newDuration = newValue[0] * (songDuration || 0);
    setSongDuration(newDuration);

    // Call the provided onChange prop
    onChange?.(newValue[0]);
  };

  return (
  <div style={{ position: 'relative', width: '256px' , marginTop: '-10px'}}>
  <RadixSlider.Root className="relative flex items-center select-none touch-none h-full" value={[value]} onValueChange={handleChange} aria-label="Volume" max={1}>
  <div style={{ marginRight: '10px' }} className="text-white text-sm">0:00</div>
    <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
      <RadixSlider.Range className="absolute bg-white rounded-full h-full transition-all" style={{ transform: `scaleX(${songDuration})` }} />
    </RadixSlider.Track>
    <div style={{ marginLeft: '10px' }} className="text-white text-sm">{formatDuration(songDuration || 137)}</div>
  </RadixSlider.Root>
</div>
  );
};

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getSongDuration = async (data: Song): Promise<number> => {
  return 137;
};

export default SeekBar;
