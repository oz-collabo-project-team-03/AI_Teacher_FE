import {
  GetSocialLoginUserInfoResponse,
  SocialStudentInfoRequestParams,
  SocialTeacherInfoRequestParams,
} from '@/api/social/socialType';
import {
  usePatchSocialStudentInfoMutation,
  usePatchSocialTeacherInfoMutation,
} from '@/api/social/social.hooks';

import { ApiError } from '@/types/apiErrorType';
import { SignupRequestParams } from '@/types/signupType';
import axios from 'axios';
import { signupFormSchema } from '@/schemas/signupValidationSchemas';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostSignupMutation } from '@/api/auth/signup/signup.hooks';
import { useState } from 'react';
import { useTermsStore } from '@/stores/useTermsStore';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';

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
    onSuccess: () => {
   
      navigate(`/signup-complete?role=${roleParam}`, { replace: true });
    },
    onError(error) {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        
      }
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.originalError.response?.data?.detail ||
        '회원정보 저장에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  /** 학생 정보입력 */
  const {
    mutate: updateSocialStudentInfoMutation,
    isPending: updateSocialInfoIsPending,
    error: updateSocialInfoIsError,
  } = usePatchSocialStudentInfoMutation({
    onSuccess: (data: GetSocialLoginUserInfoResponse) => {
      showToast(data.message);

      navigate('/signup-complete?role=student', {
        replace: true,
        state: { study_group: data.study_group },
      });
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        
      }
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.originalError.response?.data?.message ||
        '회원정보 저장에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  /** 선생님 정보입력 */
  const {
    mutate: updateSocialTeacherInfoMutation,
    isPending: updateSocialTeacherIsPending,
    error: updateSocialTeacherIsError,
  } = usePatchSocialTeacherInfoMutation({
    onSuccess: (data: GetSocialLoginUserInfoResponse) => {
      showToast(data.message);
      navigate('/signup-complete?role=teacher', {
        replace: true,
        state: { isFirstLogin: data.first_login },
      });
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        
      }
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.originalError.response?.data?.message ||
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

    const socialInfoData =
      roleParam === 'student'
        ? ({
            role: roleParam,
            is_privacy_accepted: isAllTermsAccepted,
            nickname: formData.nickname,
            school: formData.school,
            grade: formData.grade,
            career_aspiration: formData.careeraspiration,
            interests: formData.interestrade,
          } as SocialStudentInfoRequestParams)
        : ({
            role: roleParam,
            is_privacy_accepted: isAllTermsAccepted,
            nickname: formData.nickname,
            organization_name: formData.organization_name,
            organization_type: formData.organization_type,
            position: formData.position,
          } as SocialTeacherInfoRequestParams);

    if (roleParam === 'student') {
      // 학생 뮤테이션에는 학생 타입만 전달
      updateSocialStudentInfoMutation(
        socialInfoData as SocialStudentInfoRequestParams
      );
    } else {
      // 선생님 뮤테이션에는 선생님 타입만 전달
      updateSocialTeacherInfoMutation(
        socialInfoData as SocialTeacherInfoRequestParams
      );
    }
  };

  return {
    form,
    step,
    setStep,
    selectedGrade,
    updateSocialInfoIsPending,
    updateSocialInfoIsError,
    updateSocialTeacherIsPending,
    updateSocialTeacherIsError,
    signupIsPending,
    signupIsError,
    setSelectedGrade,
    handleSignup,
    register,
    formState: { errors },
    getValues,
    updateSocialStudentInfoMutation: handleUpdateSocialInfo,
  };
};
