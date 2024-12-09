import { create } from 'zustand';

type PostModal = {
  isModalOpen: boolean;
  postId: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setPostId: (postId: string) => void;
};

const useFeedPostStore = create<PostModal>((set) => ({
  isModalOpen: false,
  postId: '',
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setPostId: (postId) => set({ postId }),
}));
export default useFeedPostStore;
