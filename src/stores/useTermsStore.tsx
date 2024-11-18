import { create } from 'zustand';

type TermsState = {
  isAllTermsAccepted: boolean;
  setAllTermsAccepted: (accepted: boolean) => void;
  resetTerms: () => void;
};

export const useTermsStore = create<TermsState>((set) => ({
  isAllTermsAccepted: false,
  setAllTermsAccepted: (accepted: boolean) =>
    set({ isAllTermsAccepted: accepted }),
  resetTerms: () => set({ isAllTermsAccepted: false }),
}));
