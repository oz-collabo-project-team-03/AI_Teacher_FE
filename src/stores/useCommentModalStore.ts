import { create } from 'zustand';

type PostModal = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const useFeedPostStore = create<PostModal>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
}));
export default useFeedPostStore;
