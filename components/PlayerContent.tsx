"use Client"

import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";

interface PlayerContentProps {
    song : Song;
    songUrl : String;
}

const PlayerContent : React.FC<PlayerContentProps> =  ({song , songUrl}) => {
    const Icon = true ? BsPauseFill : BsPlayFill;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div onClick={() => {}} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black"/>
                </div>
            </div>
            <div className="hidden h-full md:flex justify-center items-centerw-full max-w-[722px] gap-x-6"></div>
        </div>
    )

}

export default PlayerContent;