import { create } from 'zustand';

//FeedPostContent에 좋아요 상태의 타입
type FeedPostStore = {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  toggleHeart: () => void;
  addComment: () => void;
};

//FeedPostContent에 좋아요 상태
const useFeedPostStore = create<FeedPostStore>((set) => ({
  isLiked: false,
  likeCount: 13,
  commentCount: 13,
  toggleHeart: () =>
    set((state) => {
      const newLikeCount = state.isLiked
        ? Math.max(state.likeCount - 1, 0)
        : Math.max(state.likeCount + 1, 0);
      return { isLiked: !state.isLiked, likeCount: newLikeCount };
    }),
  addComment: () =>
    set((state) => ({
      commentCount: state.commentCount + 1,
    })),
}));

export default useFeedPostStore;
