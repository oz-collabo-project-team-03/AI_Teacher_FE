export type LoginRequsetData = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: {
    access_token: string;
    token_type: string;
    expired_in: number;
    role: string;
    message: string;
  };
};
