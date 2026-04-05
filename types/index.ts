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

export type CourseType = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
  };
  topic: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
};

export type CourseCatalogMetaType = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type CategoryType = {
  id: number;
  name: string;
  icon?: string;
};
