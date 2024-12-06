import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { socialLoginAPI } from './socialAPI';

export const socialLoginQueries = createQueryKeyStore({
    login: {
        redirectToProvider: (provider: string) => ({
            queryKey: ['login', provider],
            queryFn: () => socialLoginAPI.getRedirectToSocialLogin(provider),
        }),

        // callback: (provider: string, code: string) => ({
        //   queryKey: ['login', 'callback', provider, code],
        //   queryFn: () => socialLoginAPI.getSocialLoginCallBack(provider, code),
        // }),
    },
});
