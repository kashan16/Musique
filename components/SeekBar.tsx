import { Song } from "@/types";
import * as RadixSlider from "@radix-ui/react-slider";
import { useState } from "react";

interface SeekbarProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number;
  data: Song;
}

const SeekBar: React.FC<SeekbarProps> = ({ value = 0, onChange, duration = 0, data }) => {
  const [songDuration, setSongDuration] = useState<number | null>(null);

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
