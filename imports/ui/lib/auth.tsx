export type AuthInfo = { name: string; password: string };

export const handleAuth = (authInfo: AuthInfo) => {
  console.log(authInfo);
};
