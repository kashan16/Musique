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
            const response = await axios.get(`https://saavn.me/search/songs?query=${encodeURIComponent(song.title)}`);
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
      <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <div className="p-4">
          <h1 className="text-white text-3xl font-semibold mb-4">Lyrics</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-black text-xl font-semibold mb-2">{song.title}</h3>
            <p className="text-gray-800">{song.author}</p>
            <hr className="my-4" />
            <p className="text-gray-700">{Lyrics}</p>
          </div>
        </div>
      </div>
    )
}

export default LyricsContent;