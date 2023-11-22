"use client"

import usePlayer from "@/hooks/usePlayer";
import { useState } from "react";
import { BiShuffle } from "react-icons/bi";

interface ShuffleButtonProps {
    songId : string;
}

const ShuffleButton : React.FC<ShuffleButtonProps> = ({
songId }) => {
    const Icon = BiShuffle;
    const player = usePlayer();
    const [ isShuffle , setIsShuffle ] = useState(false);

    const handleShuffle = () => {
        if(player.ids.length === 0){
            return;
        }
        setIsShuffle(!isShuffle);
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        function getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNumber : number = getRandomInt(1,10);
        //making sure that the index never goes out of bounds
        let nextSongIndex = (currentIndex + randomNumber)%player.ids.length;

        if(nextSongIndex < 0){
            nextSongIndex += player.ids.length;
        }
        player.setId(player.ids[nextSongIndex]);

    }
    return (
        <button onClick={handleShuffle} className="hover:opacity-75 transition" style={{ color: isShuffle ? '#66ff99' : 'white' }}>
            <Icon size={25}/>
        </button>
    )
}

export default ShuffleButton;