import { create } from 'zustand';

// 용어 약관의 상태 타입 정의
type TermsType = {
  isAllTermsAccepted: boolean;
};

// 전체 스토어의 상태 타입 정의
type TermsState = {
  stack: TermsType;
  setAllTermsAccepted: (accepted: boolean) => void;
  resetTerms: () => void;
};

export const useTermsStore = create<TermsState>((set) => ({
  // 초기 상태 정의
  stack: {
    isAllTermsAccepted: false,
  },
  // 약관 동의 상태 설정 메서드
  setAllTermsAccepted: (accepted: boolean) =>
    set((state) => ({
      stack: {
        ...state.stack,
        isAllTermsAccepted: accepted,
      },
    })),
  // 약관 동의 상태 초기화 메서드
  resetTerms: () =>
    set((state) => ({
      stack: {
        ...state.stack,
        isAllTermsAccepted: false,
      },
    })),
}));
