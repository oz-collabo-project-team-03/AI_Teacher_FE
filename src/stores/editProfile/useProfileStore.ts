import { create } from 'zustand';
import { MyPageResponseDto } from '@/types/myPageType';
import { EditProfileRequestParams } from '@/types/editProfileType';

type ProfileStore = {
  userInfo: MyPageResponseDto | null;
  setUserInfo: (info: MyPageResponseDto) => void;
  updateProfile: (data: EditProfileRequestParams, imgUrl: string) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
  updateProfile: (data, imageUrl) =>
    set((state) => {
      if (!state.userInfo) return state;

      const updatedInfo = {
        ...state.userInfo,
        ...data,
        profile_image: imageUrl,
      };

      return {
        userInfo: updatedInfo as MyPageResponseDto,
      };
    }),
}));
