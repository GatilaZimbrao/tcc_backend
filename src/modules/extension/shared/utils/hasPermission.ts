import { User } from "@prisma/client";
import { Role } from "modules/auth/domain/models/RoleModel";

export function hasPermission(user: User, roles: Role[]): boolean {
  return roles.includes(user.role as Role);
}
