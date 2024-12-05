import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { cancelMemberAPI } from './cancelAPI';
import { CancelMemberResponseDto } from './cancelType';

export const useCancelMemberMutation = (
  options?: UseMutationOptions<CancelMemberResponseDto, Error>
) => {
  return useMutation({
    mutationFn: cancelMemberAPI,
    ...options,
  });
};
