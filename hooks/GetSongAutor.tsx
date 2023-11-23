import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const GetSongAuthor = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return '';
  }

  const { data: songAuthor } = supabaseClient
  .storage
  .from('songs')
  .getPublicUrl(song.author);

  if(!songAuthor){
    console.log("Error fetching song author")
    return '';
  }

  return songAuthor.publicUrl;
};

export default GetSongAuthor;