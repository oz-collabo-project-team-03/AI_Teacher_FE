import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '../useToast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getEditSchemaByRole } from '@/schemas/editAccountSchemas';
import { useEditAccountMutation } from '@/api/auth/changeProfile/editAccount/editAccount.hooks';
import axios from 'axios';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { EditAccountRequestParams } from '@/api/auth/changeProfile/editAccount/editAccountType';

export const useEditAccountForm = (role: 'student' | 'teacher' | undefined) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(getEditSchemaByRole(role || '')),
    defaultValues: {
      password: '',
      confirmPassword: '',
      phone: '',
      ...(role === 'student' && {
        school: '',
        grade: selectedGrade,
      }),
    },
    mode: 'onSubmit',
  });

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = form;

  const { mutate: editAccountMutation } = useEditAccountMutation({
    onSuccess: (data) => {
      console.log('회원 정보 변경 완료', data);
      navigate('/my-page'), { replace: true };
    },
    onError: (error) => {
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
        '회원 정보 변경에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const onSubmit = () => {
    const formData = form.getValues();

    const editAccountData: EditAccountRequestParams = {
      role: role as 'student' | 'teacher',
      password: formData.password,
      password_confirm: formData.confirmPassword,
      phone: formData.phone,
      ...(role === 'student' && {
        school: formData.school,
        grade: selectedGrade,
      }),
    };

    editAccountMutation(editAccountData);
  };

  return {
    form,
    selectedGrade,
    setSelectedGrade,
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
    getValues,
  };
};
