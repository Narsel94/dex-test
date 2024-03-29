export type RequestGenericType = string | FormData;

export type TSignInRequest = {
  login: string;
  password: string;
};

export type TSignInResponse = {
  name: string;
  avatarUrl: string;
  token: string;
};

export type TSignUpResponse = TSignInResponse;

export type TSignUpRequest = {
  login: string;
  password: string;
  userName: string;
};

export type TUpdateUser = {
  userName?: string ;
  avatarUrl?: string | File;
}

export type TUpdateUserRequest = {
  userName?: string ;
  avatarUrl?: string;
}

export type TCustomError = {
  isCustomError: boolean, 
  status: number;
}
