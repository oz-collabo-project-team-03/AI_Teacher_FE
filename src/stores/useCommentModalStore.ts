import { create } from 'zustand';

type PostModal = {
  isModalOpen: boolean;
  postId: string;
  commentCount: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setPostId: (postId: string) => void;
  setCommentCount: (count: number) => void;
};

const useFeedPostStore = create<PostModal>((set) => ({
  isModalOpen: false,
  postId: '',
  commentCount: 0,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setPostId: (postId) => set({ postId }),
  setCommentCount: (count) => set({ commentCount: count }),
}));
export default useFeedPostStore;
