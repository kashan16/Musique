import { Song } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface LyricsContentProps {
    data : Song;
}

const LyricsContent : React.FC<LyricsContentProps> = ({data}) => {
    const [ Lyrics , setLyrics ] = useState<string | null>(null);
    const [ currentId , setCurrentId ] = useState<string | null>(null);
    useEffect(() => {
        const fetchSongId = async () => {
            try {
                const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(data.title)}`);
                const result = response.data?.data?.results[0];
                if(result){
                    const lowercaseAuthor = data.author.toLowerCase();
                    const lowercasePrimaryArtists = result.primaryArtist.toLowerCase();
                    if(lowercasePrimaryArtists.includes(lowercaseAuthor)){
                        setCurrentId(result.id);
                    }
                    else {
                        console.warn('Song not found or artist does not match');
                    }
                } else {
                    console.warn('Lyrics not found');
                }
            }
            catch (error) {
                console.error('Error fetching data' , error);
            }
        };
        fetchSongId();
    },[ data.title , data.author]);

    useEffect(() => {
        const fetchLyrics = async () => {
            if(currentId){
                try {
                    const response = await axios.get(`https://saavn.me/lyrics?id=${encodeURIComponent(currentId)}`);
                    const result = response.data?.data?.lyrics;
                    if(result){
                        setLyrics(result);
                    }
                    else {
                        console.warn('Lyrics not found');
                    }
                }
                catch(error){
                    console.error('Error fetching lyrics' , error);
                }
            }
        };
        fetchLyrics();
    } , [currentId])
    return (
        <div>{Lyrics ? (<div>
            <h2>{data.title} - {data.author}</h2>
            <p>{Lyrics}</p>
        </div>) : (<p>Loading lyrics...</p>)}</div>
    );
};

export default LyricsContent;