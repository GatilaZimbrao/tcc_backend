export enum ROLES {
  user = "user",
  admin = "admin",
}

export type Role = keyof typeof ROLES;
