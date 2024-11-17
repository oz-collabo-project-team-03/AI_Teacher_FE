import EditAccount from '../../components/changeProfile/EditAccount';
import PwCheck from '../../components/changeProfile/PwCheck';
import Header from '../../components/common/Header';
import { useState } from 'react';

const ChangeProfile = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    setIsVerified(true);
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <Header title='회원정보 변경' />
      {!isVerified ? (
        <PwCheck onVerify={handleVerification} />
      ) : (
        <EditAccount userType='student' />
        // <EditAccount userType='teacher' />
      )}
    </div>
  );
};

export default ChangeProfile;
