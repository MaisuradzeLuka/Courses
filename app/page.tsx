import SignIn from "@/features/auth/ui/views/SignIn";
import SignUp from "@/features/auth/ui/views/SignUp";

export default function Home() {
  return (
    <div className=" p-4">
      <SignIn />
      <SignUp />
    </div>
  );
}
