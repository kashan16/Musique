"use client";

import { Song } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface LyricsContentProps {
    song : Song;
    songUrl : string;
}

const LyricsContent : React.FC<LyricsContentProps> = ({song , songUrl}) => {
    const [ Id ,SetId ] = useState<string>("");
    const [ Lyrics , SetLyrics ] = useState<string>("");
    useEffect(() => {
        const FetchId = async () => {
          try {
            const response = await axios.get(
              `https://saavn.me/search/songs?query=${encodeURIComponent(song.title)}`
            );
            const result = response.data?.data?.results[0];
            if (result) {
              const lowercaseAuthor = song.author.toLowerCase();
              const lowercasePrimaryArtists = result.primaryArtists.toLowerCase();
              if (lowercasePrimaryArtists.includes(lowercaseAuthor)) {
                SetId(result.id);
              } else {
                console.warn("Not Found");
              }
            }
          } catch (error) {
            console.error("Error", error);
          }
        };
        FetchId();
        const FetchLyrics = async () => {
          try {
            const Response = await axios.get(`https://saavn.me/lyrics?id=${encodeURIComponent(Id)}`);
            const Result = Response.data?.data?.lyrics;
            if (Result) {
              SetLyrics(Result);
            }
          } catch (error) {
            console.error("Error", error);
          }
        };
        FetchLyrics();
      }, [song.title, song.author, Id]);
    return (
        <div>
            <div className="items-center justify-center">
                <h3>{song.title} By {song.author}</h3>
                <p>{Lyrics}</p>
            </div>
        </div>
    )
}

export default LyricsContent;