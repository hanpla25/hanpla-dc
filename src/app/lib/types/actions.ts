export type PostActionType = {
  success: boolean;
  msg?: string;
};

export type AuthActionType = {
  success: boolean;
  filed?: string;
  inputs?: {
    nickname?: string;
    id?: string;
    password?: string;
  };
  msg?: string;
};
