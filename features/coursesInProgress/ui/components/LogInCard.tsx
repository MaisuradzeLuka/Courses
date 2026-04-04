import Card from "@/components/shared/Card";
import SignIn from "@/features/auth/ui/views/SignIn";
import { CiLock } from "react-icons/ci";

const LogInCard = () => {
  return (
    <Card styles="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px]! h-[105%]! flex flex-col items-center bg-white py-7 border border-gray-300">
      <span className="p-5 bg-brand-100 rounded-full">
        <CiLock className="text-4xl text-brand-500" />
      </span>

      <p className="body-s mt-3 mb-6">
        Sign in to track your learning progress
      </p>

      <SignIn styles="bg-brand-500 text-gray-50 border-none px-[18px] py-[9px]" />
    </Card>
  );
};

export default LogInCard;
