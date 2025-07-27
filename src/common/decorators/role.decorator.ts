import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from '@prisma/client';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: RoleTypes[]) => SetMetadata(ROLE_KEY, roles);
