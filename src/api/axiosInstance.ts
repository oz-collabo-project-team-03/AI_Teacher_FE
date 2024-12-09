import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

type ErrorResponse = {
  message?: string;
};

const { VITE_BASE_REQUEST_URL } = import.meta.env;
const cookies = new Cookies();

// 토큰 리프레시를 위한 별도의 Axios 인스턴스 생성 (인터셉터 순환 방지)
const refreshTokenInstance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
});

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const response = await refreshTokenInstance.post('/auth/token/refresh');

    cookies.set('accessToken', response.data.accessToken, { path: '/' });
  } catch (error) {
    // 토큰 갱신 실패 시 처리 (사용자 로그아웃 등)
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    throw error;
  }
};

// 인터셉터 생성 함수
export const createAxiosInterceptor = (axiosInstance: AxiosInstance) => {
  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = cookies.get('accessToken');

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      // 폼 데이터를 보낼 때만 Content-Type을 "multipart/form-data"로 설정
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      // 만료된 토큰으로 인한 오류인지 확인
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();

          // 인증 헤더 업데이트
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
          }

          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 토큰 재발급 실패 시 로그인 페이지로
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // 에러 일괄 처리
      const handleError = (status: number, defaultMessage: string) => {
        const errorMessages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          401: '인증에 실패했습니다.',
          403: '접근 권한이 없습니다.',
          404: '요청한 리소스를 찾을 수 없습니다.',
          500: '서버 내부 오류가 발생했습니다.',
        };

        const message =
          error.response?.data?.message ||
          errorMessages[status] ||
          defaultMessage;

        // 토스트나 알림으로 에러 표시 가능
        console.error(`${status} Error:`, message);

        return Promise.reject({
          status,
          message,
          originalError: error,
        });
      };
      switch (error.response?.status) {
        case 400:
          return handleError(400, '잘못된 요청입니다.');
        case 401:
          return handleError(401, '인증에 실패했습니다.');
        case 403:
          return handleError(403, '접근 권한이 없습니다.');
        case 404:
          return handleError(404, '리소스를 찾을 수 없습니다.');
        case 500:
          return handleError(500, '서버 내부 오류');
        default:
          return Promise.reject(error);
      }
    }
  );

  return axiosInstance;
};

// 인터셉터가 적용된 메인 axios 인스턴스 생성
const axiosInstance = createAxiosInterceptor(
  axios.create({
    baseURL: VITE_BASE_REQUEST_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
);

export default axiosInstance;
