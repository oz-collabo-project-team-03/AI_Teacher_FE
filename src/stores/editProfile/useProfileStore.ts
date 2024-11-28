import { create } from 'zustand';
import { MyPageResponseData } from '@/types/myPageType';
import { EditProfileRequestData } from '@/types/editProfileType';

type ProfileStore = {
  userInfo: MyPageResponseData | null;
  setUserInfo: (info: MyPageResponseData) => void;
  updateProfile: (data: Partial<EditProfileRequestData>) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
  updateProfile: (data) =>
    set((state) => {
      if (!state.userInfo) return state;

      const updatedInfo = {
        ...state.userInfo,
        ...data,
        post_count: state.userInfo.post_count,
        like_count: state.userInfo.like_count,
        comment_count: state.userInfo.comment_count,
        posts: state.userInfo.posts,
      };

      return {
        userInfo: updatedInfo as MyPageResponseData,
      };
    }),
}));
