import { useEffect, useState } from 'react';
import EditAccount from '../../components/changeProfile/EditAccount';
import VerifyPassword from '../../components/changeProfile/VerifyPassword';
import Header from '../../components/common/Header';

const ChangeProfile = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    return () => setIsVerified(false);
  }, []);

  const handleUserVerifyPassword = () => {
    setIsVerified(true);
  };

  return (
    <div className='flex h-full w-full flex-col pt-[72px]'>
      <Header title='회원정보 변경' />
      {!isVerified ? (
        <VerifyPassword onUserVerifyPassword={handleUserVerifyPassword} />
      ) : (
        <EditAccount userType='student' />
        // <EditAccount userType='teacher' />
      )}
    </div>
  );
};

export default ChangeProfile;
