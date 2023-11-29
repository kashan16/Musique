"use client";

import Header from "@/components/Header";
import useGetSongByid from "@/hooks/useGetSongByid";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import LyricsContent from "./components/LyricsContent";

const Lyrics = () => {
    const player = usePlayer();
    const { song } = useGetSongByid(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId){
        return null;
    }

    return (
        <div>
            <Header>
                <LyricsContent 
                key = {songUrl}
                song = {song}
                songUrl = {songUrl}/>
            </Header>
        </div>
    )
}

export default Lyrics;