"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MediaItemProps{
    data : Song;
    onClick ?: (id : string) => void;
}

const MediaItem : React.FC<MediaItemProps> = ({data , onClick}) => {
    const [ isHovered , setIsHovered ] = useState(false);
    const URL = useLoadImage(data);
    const [ imageUrl , SetImageUrl ] = useState<string>("");

    useEffect(() => {
        const FetchImageUrl = async () => {
            try {
                const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(data.title)}`);
                const result = response.data?.data?.results[0];
                if (result) {
                    const lowercaseAuthor = data.author.toLowerCase();
                    const lowercasePrimaryArtists = result.primaryArtists.toLowerCase();
                    if (lowercasePrimaryArtists.includes(lowercaseAuthor)) {
                        const imageUrl = result.image.link;
                        SetImageUrl(imageUrl);
                    }
                }
            }
            catch(error) {
                console.error('Error Fetching Data' , error);
            }
        }
        FetchImageUrl();
    } , [data.title , data.author]);

    const handleClick = () => {
        if(onClick){
            return onClick(data.id);
        }

        //TODO : default turn on player
    }

    return (
        <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image 
                    fill
                    src = {imageUrl || URL}
                    alt =  "Media Item"
                    className = "object-cover"/>
            </div>  
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>          
        </div>
    )

}

export default MediaItem;