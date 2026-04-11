"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { AuthModalProvider } from "@/hooks/useAuthModal";
import { EnrolledCoursesSheetProvider } from "@/features/sidebar/context/EnrolledCoursesSheetContext";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthModalProvider>
        <EnrolledCoursesSheetProvider>{children}</EnrolledCoursesSheetProvider>
      </AuthModalProvider>
    </QueryClientProvider>
  );
}
