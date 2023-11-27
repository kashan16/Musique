import * as RadixSlider from "@radix-ui/react-slider";
import { useState } from "react";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange, min = 0, max = 1, step = 0.01 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-20"
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleChange}
      aria-label="Volume"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RadixSlider.Track className="bg-neutral-300 relative grow rounded-full h-[4px]" />
      {isHovered && (
        <RadixSlider.Thumb
          className="SliderThumb"
          aria-label="Volume"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#4CAF50",
            borderRadius: "50%",
            boxShadow: "0px 0px 5px 0px #4CAF50",
          }}
        />
      )}
      <RadixSlider.Range
        className="absolute bg-green-500 rounded-full h-full transition-all"
        style={{ transform: `scaleX(${value})` }}
      />
    </RadixSlider.Root>
  );
};

export default Slider;
