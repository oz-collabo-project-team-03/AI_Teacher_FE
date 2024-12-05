import { useTermsStore } from '@/stores/useTermsStore';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckBox from '../common/CheckBox';

const ShowThirdPartyTerms = () => {
  const [showThirdPartyTerms, setShowThirdPartyTerms] = useState(false);

  const isThirdPartyChecked = useTermsStore(
    (state) => state.stack.isThirdPartyChecked
  );
  const setThirdPartyChecked = useTermsStore(
    (state) => state.actions.setThirdPartyChecked
  );

  const toggleThirdPartyTerms = () => {
    setShowThirdPartyTerms((prev) => !prev);
  };
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex'>
        <CheckBox
          checked={isThirdPartyChecked}
          onChange={(e) => setThirdPartyChecked(e.target.checked)}
        >
          [필수] 개인정보 제3자 제공에 동의
        </CheckBox>
        {!showThirdPartyTerms ? (
          <button
            className='ml-2 text-sm text-captionColor'
            onClick={toggleThirdPartyTerms}
          >
            더보기
          </button>
        ) : (
          <button
            className='ml-2 text-sm text-captionColor'
            onClick={toggleThirdPartyTerms}
          >
            간략히
          </button>
        )}
      </div>
      <div>
        <div
          className={twMerge(
            'h-[126px] w-full overflow-scroll rounded-[5px] border border-unFocusColor p-[14px]',
            showThirdPartyTerms ? '' : 'hidden'
          )}
        >
          <div className='space-y-4 text-sm text-textMainColor'>
            <h1 className='mb-6 text-xl font-bold'>개인정보 제3자 제공 동의</h1>

            <p className='mb-6 text-mainLogoTextColor'>
              회사는 원칙적으로 정보 주체의 동의 없이 개인정보를 제3자에게
              제공하지 않습니다. 다만, 아래와 같은 경우에는 동의를 받은 후
              개인정보를 제3자에게 제공할 수 있습니다.
            </p>

            <section className='mb-6'>
              <h2 className='mb-4 text-lg font-bold'>1. 개인정보 제공 대상</h2>
              <p className='mb-4 text-mainLogoTextColor'>
                회사는 원활한 서비스 제공과 부가 서비스 이용을 위해 다음과 같은
                제3자에게 개인정보를 제공합니다.
              </p>

              <div className='rounded-lg border border-borderColor bg-commuInputColor/30 p-4'>
                <dl className='space-y-4'>
                  <div>
                    <dt className='font-bold'>제공 받는 자</dt>
                    <dd className='ml-4 mt-1 text-mainLogoTextColor'>
                      수업을 담당하는 선생님
                    </dd>
                  </div>

                  <div>
                    <dt className='font-bold'>제공 목적</dt>
                    <dd className='ml-4 mt-1 text-mainLogoTextColor'>
                      학습 관리 및 학습 진행 상황 확인, 학생별 맞춤 지도 제공
                    </dd>
                  </div>

                  <div>
                    <dt className='font-bold'>제공하는 항목</dt>
                    <dd className='ml-4 mt-1 text-mainLogoTextColor'>
                      이름, 학년, 연락처(필요 시), 이메일 주소 등
                    </dd>
                  </div>

                  <div>
                    <dt className='font-bold'>보유 및 이용 기간</dt>
                    <dd className='ml-4 mt-1 text-mainLogoTextColor'>
                      제휴 계약 종료 시까지 또는 회원 탈퇴 시까지
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className='mb-6'>
              <h2 className='mb-4 text-lg font-bold'>
                2. 제3자 제공에 대한 동의 거부 권리 및 불이익 안내
              </h2>
              <p className='text-mainLogoTextColor'>
                정보 주체는 개인정보 제3자 제공에 대해 동의를 거부할 권리가
                있습니다. 다만, 동의를 거부할 경우 해당 서비스 이용에 제한이
                있을 수 있습니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowThirdPartyTerms;
