"use client"

import { Songs } from "@/types";

interface SongItemProps {
    data : Songs;
    onClick : (id : string) => void;
};

const SongItem : React.FC<SongItemProps> = ({data,onClick}) => {
    return (
        <div>
            Song Item
        </div>
    );
}

export default SongItem;
