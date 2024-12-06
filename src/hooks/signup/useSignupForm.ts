import { usePostSignupMutation } from '@/api/auth/signup/signup.hooks';
import { usePatchSocialStudentInfoMutation } from '@/api/auth/socialLogin/social.hooks';
import {
  GetSocialLoginUserInfoResponse,
  SocialLoginUserInfoRequestParams,
} from '@/api/auth/socialLogin/socialType';
import { useToast } from '@/hooks/useToast';
import { signupFormSchema } from '@/schemas/signupValidationSchemas';
import { useTermsStore } from '@/stores/useTermsStore';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { Role, SignupRequestParams } from '@/types/signupType';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const STEP = {
  ACCOUNT_INFO: 1,
  PERSONAL_INFO: 2,
};

export const useSignupForm = (roleParam: 'student' | 'teacher' | undefined) => {
  const [step, setStep] = useState(STEP.ACCOUNT_INFO);
  const [selectedGrade, setSelectedGrade] = useState(1);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const isAllTermsAccepted = useTermsStore((state) => state.stack.isAllChecked);

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      phone: '',
      school: '',
      grade: selectedGrade,
      careeraspiration: '',
      organization_type: '',
      organization_name: '',
      position: '',
      interestrade: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const {
    mutate: signupMutation,
    isPending: signupIsPending,
    error: signupIsError,
  } = usePostSignupMutation({
    onSuccess: (data) => {
      console.log('회원가입 완료', data);
      navigate('/signup-complete', { replace: true });
    },
    onError(error) {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
      console.error('회원가입 실패', error.message);
    },
  });

  const {
    mutate: updateSocialInfoMutation,
    isPending: updateSocialInfoIsPending,
    error: updateSocialInfoIsError,
  } = usePatchSocialStudentInfoMutation({
    onSuccess: (data: GetSocialLoginUserInfoResponse) => {
      showToast(data.message);
      navigate('/signup-complete', { replace: true });
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
          apiError?.response?.data?.message ||
          '회원정보 저장에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleSignup = async () => {
    const formData = form.getValues();

    const signupData: SignupRequestParams = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      nickname: formData.nickname,
      phone: formData.phone,
      is_privacy_accepted: isAllTermsAccepted,
      role: roleParam,

      ...(roleParam === 'student' && {
        school: formData.school,
        grade: selectedGrade,
        career_aspiration: formData.careeraspiration,
        interests: formData.interestrade,
      }),

      ...(roleParam === 'teacher' && {
        organization_type: formData.organization_type,
        organization_name: formData.organization_name,
        position: formData.position,
      }),
    } as SignupRequestParams;

    if (step === STEP.ACCOUNT_INFO) {
      if (
          form.formState.errors.email ||
          form.formState.errors.password ||
          form.formState.errors.confirmPassword
      ) {
        return;
      }

      const code = formData.code;
      if (!code) {
        showToast('인증번호를 입력해주세요');
        return;
      }
      setStep(STEP.PERSONAL_INFO);
    } else if (step === STEP.PERSONAL_INFO) {
      if (roleParam === 'student') {
        if (
            !formData.nickname ||
            !formData.phone ||
            !formData.school ||
            !formData.careeraspiration ||
            !formData.interestrade
        ) {
          showToast('모든 필드를 입력해주세요.');
          return;
        }
      } else if (roleParam === 'teacher') {
        if (
            !formData.nickname ||
            !formData.phone ||
            !formData.organization_type ||
            !formData.organization_name ||
            !formData.position
        ) {
          showToast('모든 필드를 입력해주세요.');
          return;
        }
      }

      signupMutation(signupData);
    }
  };

  const handleUpdateSocialInfo = async () => {
    const formData = form.getValues();
    const socialInfoData: SocialLoginUserInfoRequestParams = {
      nickname: formData.nickname,
      school: formData.school,
      grade: formData.grade,
      career_aspiration: formData.careeraspiration,
      interests: formData.interestrade,
      is_privacy_accepted: isAllTermsAccepted,
      role: roleParam as Role,
    };
    updateSocialInfoMutation(socialInfoData);
  };

  return {
    form,
    step,
    setStep,
    selectedGrade,
    updateSocialInfoIsPending,
    updateSocialInfoIsError,
    setSelectedGrade,
    handleSignup,
    register,
    formState: { errors },
    getValues,
    updateSocialInfoMutation: handleUpdateSocialInfo,
  };
};
