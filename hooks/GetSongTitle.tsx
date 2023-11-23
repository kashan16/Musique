import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const GetSongTitle = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return '';
  }

  const { data: songTitle } = supabaseClient
  .storage
  .from('songs')
  .getPublicUrl(song.title);

  if(!songTitle){
    console.log("Error fetching song title")
    return '';
  }

  return songTitle.publicUrl;
};

export default GetSongTitle;