type RedirectProps = {
  variant: "signIn" | "signUp";
  redirectFunction: () => void;
};

const Redirect = ({ variant, redirectFunction }: RedirectProps) => {
  return (
    <>
      <div className="flex justify-stretch items-center gap-2 mt-4">
        <div className="w-full h-px bg-gray-200" />
        <p className="text-gray-400 body-xs">or</p>
        <div className="w-full h-px bg-gray-200" />
      </div>

      <button
        onClick={() => {
          console.log(
            "Redirect button clicked, redirectFunction:",
            redirectFunction,
          );
          redirectFunction();
        }}
        className="flex items-center justify-center gap-2 text-xs text-gray-500 cursor-pointer"
      >
        {variant === "signIn"
          ? "Don't have an account?"
          : "Already have an account?"}
        <span className="body-xs underline underline-offset-4 text-gray-900">
          {variant === "signIn" ? "Sign Up" : "Log In"}
        </span>
      </button>
    </>
  );
};

export default Redirect;
