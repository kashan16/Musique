import { create } from 'zustand';

interface UploadStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModel = create<UploadStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModel;