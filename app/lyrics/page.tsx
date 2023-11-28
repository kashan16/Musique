import Header from "@/components/Header";
import { Song } from "@/types";
import LyricsContent from "./component/lyricsContent";

export const revalidate = 0;

interface LyricsProps {
    song: Song;
}

const Lyrics: React.FC<LyricsProps> = ({ song }) => {
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Lyrics
                    </h1>
                </div>
            </Header>
            
            {/* Render LyricsContent component with the song data */}
            <LyricsContent data={song} />
        </div>
    );
}

export default Lyrics;
