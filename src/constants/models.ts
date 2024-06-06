export interface User {
  id: string;
  username: string;
  email: string;
  profile: Profile;
  followers: User[];
  following: User[];
  guilds: string[];
  nuts: string[];
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
  NON_BINARY = 'NON_BINARY',
}

export const genders = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
  [Gender.PREFER_NOT_TO_SAY]: 'Prefer not to say',
  [Gender.NON_BINARY]: 'Non-binary',
};

export interface Profile {
  id: string;
  avatar: string;
  displayName: string;
  birthday: Date;
  gender: Gender;
}
