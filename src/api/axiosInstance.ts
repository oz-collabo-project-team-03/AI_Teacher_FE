import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

const { VITE_BASE_REQUEST_URL } = import.meta.env;
const cookies = new Cookies();

// 토큰 리프레시를 위한 별도의 Axios 인스턴스 생성 (인터셉터 순환 방지)
const refreshTokenInstance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
});

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  const refreshToken = cookies.get('refreshToken');

  if (!refreshToken) {
    throw new Error('사용 가능한 리프레시 토큰 없음');
  }

  try {
    const response = await refreshTokenInstance.post('auth/token/refresh', {
      refreshToken,
    });

    // 쿠키에 새로운 토큰 업데이트
    cookies.set('accessToken', response.data.accessToken);
    if (response.data.refreshToken) {
      cookies.set('refreshToken', response.data.refreshToken);
    }

    return response.data.accessToken;
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
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
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
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
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
