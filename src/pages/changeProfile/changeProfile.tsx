import EditAccount from '../../components/changeProfile/EditAccount';
import PwCheck from '../../components/changeProfile/PwCheck';
import Header from '../../components/common/Header';
import { useState } from 'react';

const ChangeProfile = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleUserPwVerification = () => {
    setIsVerified(true);
  };

  return (
    <div className='flex h-full w-full flex-col pt-[72px]'>
      <Header title='회원정보 변경' />
      {!isVerified ? (
        <PwCheck onUserPwVerification={handleUserPwVerification} />
      ) : (
        <EditAccount userType='student' />
        // <EditAccount userType='teacher' />
      )}
    </div>
  );
};

export default ChangeProfile;
