import { useCallback, useState } from 'react';

interface UseTermsCheckResult {
  isAllChecked: boolean;
  isPrivacyChecked: boolean;
  isThirdPartyChecked: boolean;
  handlePrivacyCheck: (checked: boolean) => void;
  handleThirdPartyCheck: (checked: boolean) => void;
  handleAllCheck: (checked: boolean) => void;
}

export const useTermsCheck = (): UseTermsCheckResult => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isThirdPartyChecked, setIsThirdPartyChecked] = useState(false);

  const handleAllCheck = useCallback(() => {
    const newChecked = !isAllChecked;
    setIsAllChecked(newChecked);
    setIsPrivacyChecked(newChecked);
    setIsThirdPartyChecked(newChecked);
  }, [isAllChecked]);

  const handleTermCheck = useCallback(
    (
      setterFunction: React.Dispatch<React.SetStateAction<boolean>>,
      otherTermChecked: boolean
    ) =>
      (checked: boolean) => {
        setterFunction(checked);
        setIsAllChecked(checked && otherTermChecked);
      },
    []
  );

  const handlePrivacyCheck = useCallback(
    handleTermCheck(setIsPrivacyChecked, isThirdPartyChecked),
    [isThirdPartyChecked]
  );

  const handleThirdPartyCheck = useCallback(
    handleTermCheck(setIsThirdPartyChecked, isPrivacyChecked),
    [isPrivacyChecked]
  );

  return {
    isAllChecked,
    isPrivacyChecked,
    isThirdPartyChecked,
    handleAllCheck,
    handlePrivacyCheck,
    handleThirdPartyCheck,
  };
};
