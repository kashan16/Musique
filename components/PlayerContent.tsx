"use Client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import CustomSlider from "./CustomSlider";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import SeekBar from "./SeekBar";
import ShuffleButton from "./ShuffleButton";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = player.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: player.volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    player.setVolume(player.volume === 0 ? 1 : 0);
  };

  const handleVolumeChange = (value: number) => {
    player.setVolume(value);
    sound?.volume(value);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/lyrics');
  }
  return (
    <div className="h-full col-span-1 grid grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={handleClick} />
          <LikeButton songId={song.id} />
          <ShuffleButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={20} className="text-black" />
        </div>
      </div>
      <div className="hidden md:flex h-full justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward onClick={onPlayPrevious} size={28} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
        <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward onClick={onPlayNext} size={28} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
      </div>
      <div className="hidden md:flex w-full justify-end items-center gap-x-2">
        <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={40} />
        <CustomSlider value={player.volume} onChange={handleVolumeChange} min={0} max={1} step={0.01} />
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <SeekBar onPlay={handlePlay} onPause={handlePlay} isPlaying={isPlaying} data={song} />
      </div>
    </div>
  );
};

export default PlayerContent;
