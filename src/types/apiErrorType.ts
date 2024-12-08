export type ApiError = {
  originalError: {
    response?: {
      data?: {
        message?: string;
        detail?: string;
      };
    };
  };
};

export type ApiErrorResponseDto = {
  response?: {
    data?: {
      message?: string;
      detail?: string;
    };
  };
};
