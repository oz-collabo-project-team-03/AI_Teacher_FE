import { usePatchSocialStudentInfoMutation } from '@/api/auth/socialLogin/social.hooks';
import {
    GetSocialLoginUserInfoResponse,
    SocialLoginUserInfoRequestParams,
} from '@/api/auth/socialLogin/socialType';
import { signupFormSchema } from '@/schemas/signupValidationSchemas';
import { useTermsStore } from '@/stores/useTermsStore';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { Role } from '@/types/signupType';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../useToast';

export const useUpdateSocialInfo = (
    roleParam: 'student' | 'teacher' | undefined
) => {
    const [selectedGrade, setSelectedGrade] = useState(1);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const isAllTermsAccepted = useTermsStore((state) => state.stack.isAllChecked);

    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            nickname: '',
            phone: '',
            school: '',
            grade: selectedGrade,
            careeraspiration: '',
            interestrade: '',
        },
        mode: 'onChange',
    });

    const {
        mutate: updateSocialInfoMutation,
        isPending,
        error,
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
        updateSocialInfoMutation: handleUpdateSocialInfo,
        setSelectedGrade,
        isPending,
        error,
    };
};
