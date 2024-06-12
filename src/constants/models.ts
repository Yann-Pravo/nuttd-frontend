interface LocationNuttd {
  city: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  region: string;
  regionName: string;
  zip: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile: Profile;
  followers: User[];
  following: User[];
  guilds: { id: string; name: string }[];
  nuts: string[];
  location: LocationNuttd;
}

interface GuildUser extends Pick<User, 'id' | 'nuts'> {
  profile: Pick<Profile, 'displayName'>;
  nutsMonthlyCount: number;
}

interface Nut {
  id: string;
  date: Date;
  comment?: string;
}

export interface Guild {
  id: string;
  isPrivate: boolean;
  name: string;
  users: GuildUser[];
  nuts: (Nut & {
    displayName: string;
    location: Pick<LocationNuttd, 'city' | 'country'>;
  })[];
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
