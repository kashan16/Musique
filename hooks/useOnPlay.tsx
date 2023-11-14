import { Song } from "@/types";
import useAuthModal from "./useAuthModel";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {

  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
  }

  return onPlay;
};

export default useOnPlay;