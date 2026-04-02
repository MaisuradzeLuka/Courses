type Props = {
  currentStep: number;
  totalSteps: number;
};

const FormProgress = ({ currentStep, totalSteps }: Props) => {
  return (
    <div className="flex gap-2 mb-4 my-5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-full transition-all ${
            i <= currentStep ? "bg-brand-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default FormProgress;
