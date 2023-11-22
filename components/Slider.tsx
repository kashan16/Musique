// Slider.tsx

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange, min = 0, max = 1, step = 0.01 }) => {

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
            <RadixSlider.Root className="relative flex items-center select-none touch-none w-12" value={[value]} min={min} max={max} step={step} onValueChange={handleChange} aria-label="Volume">
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
                <RadixSlider.Range className="absolute bg-white rounded-full h-full transition-all" style={{ transform: `scaleX(${value})` }}/>
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
};

export default Slider;
