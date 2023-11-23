import * as RadixSlider from "@radix-ui/react-slider";

interface SeekbarProps {
    value ?: number;
    onChange ?: (value: number) => void;
    duration?: number;
}

const SeekBar : React.FC<SeekbarProps> = ({ value = 0 , onChange , duration = 0}) => {
    
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]); 
    };
    return (
        <RadixSlider.Root className="relative flex items-center select-none touch-none  h-full w-[256px]" value={[value]} onValueChange={handleChange} aria-label="Volume">
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
            <RadixSlider.Range className="absolute bg-white rounded-full h-full transition-all" style={{ transform: `scaleX(${value})` }}/>
        </RadixSlider.Track>
    </RadixSlider.Root>
);
}

export default SeekBar;