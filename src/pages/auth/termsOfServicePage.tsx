import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import ShowPrivacyTerms from '@/components/terms/ShowPrivacyTerms';
import ShowThirdPartyTerms from '@/components/terms/ShowThirdPartyTerms';
import { useToast } from '@/hooks/useToast';
import { useTermsStore } from '@/stores/useTermsStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 이용약관 페이지라는 뜻
const TermsOfServicePage = () => {
  //동의 상태
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isThirdPartyChecked, setIsThirdPartyChecked] = useState(false);

  const { showToast } = useToast();

  const setAllTermsAccepted = useTermsStore(
    (state) => state.setAllTermsAccepted
  );

  const navigate = useNavigate();

  const handleAllCheck = () => {
    const newChecked = !isAllChecked;
    setIsAllChecked(newChecked);
    setIsPrivacyChecked(newChecked);
    setIsThirdPartyChecked(newChecked);
  };

  const handlePrivacyCheck = (checked: boolean) => {
    setIsPrivacyChecked(checked);
    setIsAllChecked(checked && isThirdPartyChecked);
  };

  const handleThirdPartyCheck = (checked: boolean) => {
    setIsThirdPartyChecked(checked);
    setIsAllChecked(isPrivacyChecked && checked);
  };

  const handleProceed = () => {
    if (!isAllChecked) {
      showToast('필수 이용약관에 동의해주세요');
    } else {
      navigate(`/role-selection`);
    }
  };

  // 상태 변경 감지용 useEffect
  useEffect(() => {
    setAllTermsAccepted(isPrivacyChecked && isThirdPartyChecked);
  }, [isPrivacyChecked, isThirdPartyChecked, setAllTermsAccepted]);

  return (
    <div className='flex h-lvh w-full flex-col items-center px-[28px] pb-[30px] text-textMainColor'>
      <div className='w-full flex-grow'>
        <div className='flex flex-col py-[25px]'>
          <h1 className='mb-1 text-2xl font-semibold'>수행쌤</h1>
          <h1 className='text-2xl font-semibold'>이용약관 동의</h1>
          <p className='text-sm text-captionColor'>
            원활한 서비스 제공을 위해 약관 동의가 필요합니다.
          </p>
        </div>

        <div className='flex flex-col'>
          <CheckBox checked={isAllChecked} onChange={handleAllCheck}>
            전체 동의합니다
          </CheckBox>
          <div className='ml-[26px] pb-[30px] text-sm text-captionColor'>
            <p>선택 시, 아래의 모든 필수 및 선택 항목에 동의가 적용됩니다. </p>
            <p>또는 필수 항목은 개별적으로도 동의할 수 있습니다. </p>
          </div>

          <div className='mb-[38px] flex flex-col gap-[30px] border-t border-captionColor pt-[30px]'>
            <ShowPrivacyTerms
              handlePrivacyCheck={handlePrivacyCheck}
              isPrivacyChecked={isPrivacyChecked}
            />

            <ShowThirdPartyTerms
              handleThirdPartyCheck={handleThirdPartyCheck}
              isThirdPartyChecked={isThirdPartyChecked}
            />
          </div>
        </div>
      </div>
      <Button variant='active' onClick={handleProceed}>
        다음
      </Button>
    </div>
  );
};
export default TermsOfServicePage;
