export type UserType = {
  age: number | null;
  avatar: string | null;
  email: string;
  fullName: string | null;
  id: number;
  mobileNumber: string | null;
  profileComplete: boolean;
  username: string;
};

export type AuthType = {
  data: {
    token: string;
    user: UserType;
  };
};
