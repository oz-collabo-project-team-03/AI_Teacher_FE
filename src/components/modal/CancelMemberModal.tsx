import Button from '../common/Button';
import { useCancelMemberMutation } from '@/api/auth/cancleMember/cancelMember.hooks';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

type CancelMemberModalProps = {
  onClose: () => void;
};

const CancelMemberModal = ({ onClose }: CancelMemberModalProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: cancelMember } = useCancelMemberMutation({
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      showToast(`회원 탈퇴에 실패하였습니다. ${error.message}`);
    },
  });

  const handleCancelMembership = () => {
    cancelMember();
  };

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-2'>
      <div className='w-full max-w-[390px] rounded-[16px] border border-inputBorderColor bg-white p-[8px]'>
        <div className='flex flex-col items-center gap-4 py-[40px]'>
          <p className='text-[18px] font-normal text-textMainColor'>
            정말 탈퇴하시겠습니까?
          </p>
          <p className='text-center text-[14px] text-captionColor'>
            계정 탈퇴 후 30일 동안 계정 복구가 가능합니다.
            <br />
            30일이 지나면 모든 데이터가 영구적으로 삭제됩니다.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='cancel' onClick={onClose}>
            취소
          </Button>
          <Button variant='active' onClick={handleCancelMembership}>
            탈퇴하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelMemberModal;
