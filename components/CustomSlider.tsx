import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const CustomSlider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange?.(newValue as number);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative flex items-center select-none touch-none w-20">
    <Tooltip title={`${Math.round((value || 1) * 100)}%`} open={isHovered} placement="top">
      <Slider value={value} min={min} max={max} step={step} onChange={handleChange} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
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

export default CustomSlider;
