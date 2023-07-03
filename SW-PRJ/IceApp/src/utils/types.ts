export interface LoginResponse {
  status: string;
  data: {
    token?: string;
    username?: string;
    message?: string;
  };
}
export interface AuthState {
  token: string | null;
  isSignout: boolean;
  username: string | null;
  isLoading: boolean;
  mess: {
    type: string;
    message: string;
  } | null;
}
export interface RegisterResponse {
  status: string;
  data: any;
}

export interface RegisterRequest {
  phoneNumber: string;
  password: string;
}

export interface AuthContextProps {
  signIn: (data: {phoneNumber: string; password: string}) => Promise<void>;
  signOut: () => void;
  signUp: (data: {
    phoneNumber: string;
    username: string;
    password: string;
  }) => Promise<void>;
}
