"use client";

import Authorized from "./Authorized";
import Unauthorized from "./Unauthorized";

const CoursesInProgress = ({ token }: { token: string }) => {
  if (!token) return <Unauthorized />;
  if (token) return <Authorized token={token} />;
};

export default CoursesInProgress;
