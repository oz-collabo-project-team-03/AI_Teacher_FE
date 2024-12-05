import { create } from 'zustand';

// 용어 약관의 상태 타입 정의
type TermsType = {
  isAllChecked: boolean;
  isPrivacyChecked: boolean;
  isThirdPartyChecked: boolean;
};

// 전체 스토어의 상태 타입 정의
type TermsState = {
  stack: TermsType;
} & TermsActions;

// 액션들의 타입 정의
type TermsActions = {
  actions: {
    setAllChecked: (checked: boolean) => void;
    setPrivacyChecked: (checked: boolean) => void;
    setThirdPartyChecked: (checked: boolean) => void;
    resetTerms: () => void;
  };
};

export const useTermsStore = create<TermsState>((set) => ({
  // 초기 상태 정의
  stack: {
    isAllChecked: false,
    isPrivacyChecked: false,
    isThirdPartyChecked: false,
  },

  // 액션들
  actions: {
    // 전체 동의 상태 설정 메서드
    setAllChecked: (checked: boolean) =>
      set((state) => ({
        stack: {
          ...state.stack,
          isAllChecked: checked,
          isPrivacyChecked: checked,
          isThirdPartyChecked: checked,
        },
      })),

    // 개인정보 약관 동의 상태 설정 메서드
    setPrivacyChecked: (checked: boolean) =>
      set((state) => ({
        stack: {
          ...state.stack,
          isPrivacyChecked: checked,
          isAllChecked: checked && state.stack.isThirdPartyChecked,
        },
      })),

    // 제3자 정보 제공 약관 동의 상태 설정 메서드
    setThirdPartyChecked: (checked: boolean) =>
      set((state) => ({
        stack: {
          ...state.stack,
          isThirdPartyChecked: checked,
          isAllChecked: state.stack.isPrivacyChecked && checked,
        },
      })),

    // 약관 동의 상태 초기화 메서드
    resetTerms: () =>
      set((state) => ({
        stack: {
          ...state.stack,
          isAllChecked: false,
          isPrivacyChecked: false,
          isThirdPartyChecked: false,
        },
      })),
  },
}));
