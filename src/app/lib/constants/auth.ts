export const usernameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA]{2,8}$/;
export const idRegex = /^[a-zA-Z0-9]{4,20}$/;
export const passwordRegex = /^[a-zA-Z0-9]{4,20}$/;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = "7d";
export const ID_EXISTS_MSG =
  'duplicate key value violates unique constraint "users_userId_key"';
export const NICKNAME_EXISTS_MSG =
  'duplicate key value violates unique constraint "users_nickname_key"';
