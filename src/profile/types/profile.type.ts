import { UserType } from '@app/user/types/user.type';

export type profileType = UserType & { following: boolean };