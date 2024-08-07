export interface AuthsTokenData {
  token: string;
  lastSignInAt: string;
}

export interface AuthsSignIn {
  email: string;
  password: string;
}

export interface AuthsSignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
