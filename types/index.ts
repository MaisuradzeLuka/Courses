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

export type EnrollmentType = {
  id: number;
  progress: number;
  completedAt: string | null;

  schedule: {
    location: string | null;

    sessionType: {
      id: number;
      name: string;
      priceModifier: string;
    };

    timeSlot: {
      id: number;
      label: string;
    };

    weeklySchedule: {
      id: number;
      label: string;
    };
  };

  totalPrice: string;
};

export type SingleCourseType = {
  data: {
    id: number;
    title: string;
    description: string;
    image: string;
    basePrice: string;

    durationWeeks: number;
    isFeatured: boolean;
    isRated: boolean;

    enrollment: EnrollmentType | null;

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

    reviews: {
      userId: number;
      rating: number;
    }[];
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
  avatar?: string;
};
