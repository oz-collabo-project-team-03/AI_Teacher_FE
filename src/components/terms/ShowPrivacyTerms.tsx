import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckBox from '../common/CheckBox';

type ShowPrivacyTermsProps = {
  handlePrivacyCheck: (checked: boolean) => void;
  isPrivacyChecked: boolean;
};

const ShowPrivacyTerms = ({
  handlePrivacyCheck,
  isPrivacyChecked,
}: ShowPrivacyTermsProps) => {
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);

  const togglePrivacyTerms = () => {
    setShowPrivacyTerms((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex'>
        <CheckBox
          checked={isPrivacyChecked}
          onChange={(e) => handlePrivacyCheck(e.target.checked)}
        >
          [필수] 개인정보 수집 및 이용동의
        </CheckBox>
        <button
          className='ml-2 text-sm text-captionColor'
          onClick={togglePrivacyTerms}
        >
          더보기
        </button>
      </div>
      <div>
        <div
          className={twMerge(
            'h-[126px] w-full overflow-scroll rounded-[5px] border border-unFocusColor p-[14px]',
            showPrivacyTerms ? '' : 'hidden'
          )}
        >
          <div className='space-y-4 text-sm text-textMainColor'>
            <h2 className='mb-6 text-xl font-bold'>
              개인정보 수집 및 이용 동의
            </h2>

            <p className='mb-6 text-mainLogoTextColor'>
              '수행쌤'(이하 '회사')은 정보 주체의 개인정보를 안전하게 보호하며,
              원활한 서비스 제공을 위해 필요한 범위 내에서 개인정보를 수집 및
              이용하고 있습니다. 아래 내용을 확인하신 후, 동의 여부를
              결정해주시기 바랍니다.
            </p>

            <section className='mb-6'>
              <h2 className='mb-4 text-lg font-bold'>
                1. 개인정보 수집 및 이용 목적
              </h2>
              <p className='mb-4 text-mainLogoTextColor'>
                회사는 다음의 목적을 위하여 개인정보를 수집 및 이용합니다.
                수집된 개인정보는 명시한 목적 외의 용도로는 사용되지 않으며,
                이용 목적이 변경될 경우 사전에 동의를 구할 예정입니다.
              </p>
              <div className='ml-4'>
                <div className='mb-4'>
                  <h3 className='mb-2 font-bold'>회원 관리 및 본인 인증</h3>
                  <ul className='ml-6 list-disc text-mainLogoTextColor'>
                    <li>
                      회원 식별, 가입 의사 확인, 본인 인증, 서비스 이용 자격
                      관리
                    </li>
                  </ul>
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-bold'>서비스 제공 및 개선</h3>
                  <ul className='ml-6 list-disc text-mainLogoTextColor'>
                    <li>
                      콘텐츠 제공, 맞춤형 서비스 제공, 서비스 개선 및 분석
                    </li>
                  </ul>
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-bold'>고객 상담 및 민원 처리</h3>
                  <ul className='ml-6 list-disc text-mainLogoTextColor'>
                    <li>문의 사항 및 불만 처리, 서비스 관련 공지 전달 등</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className='mb-6'>
              <h2 className='mb-4 text-lg font-bold'>
                2. 수집하는 개인정보 항목
              </h2>
              <p className='mb-4 text-mainLogoTextColor'>
                회사는 회원가입, 서비스 이용 등을 위하여 아래와 같은 개인정보를
                수집합니다.
              </p>
              <div className='ml-4'>
                <div className='mb-4'>
                  <h3 className='mb-2 font-bold'>필수 항목</h3>
                  <p className='text-mainLogoTextColor'>
                    이름, 연락처(휴대전화번호), 이메일 주소
                  </p>
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-bold text-gray-800'>선택 항목</h3>
                  <p className='text-mainLogoTextColor'>생년월일, 성별 등</p>
                </div>
              </div>
            </section>

            <section className='mb-6'>
              <h2 className='mb-4 text-lg font-bold'>
                3. 개인정보 보유 및 이용 기간
              </h2>
              <p className='text-mainLogoTextColor'>
                회사는 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를
                지체 없이 파기합니다. 단, 관련 법령에 따라 일정 기간 동안
                보관해야 할 경우에는 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowPrivacyTerms;
