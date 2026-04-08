import { Button } from "@/components/ui/button";
import { usePostEnrollment } from "../../api";
import { SubmitEvent } from "react";

type Props = {
  basePrice: number;
  priceModifier: number;
  token: string | null;
  courseId: number;
  scheduleId: number | null;
};

const Form = ({
  basePrice,
  priceModifier,
  token,
  courseId,
  scheduleId,
}: Props) => {
  const mutation = usePostEnrollment();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!scheduleId) return;

    if (!token) return;
    await mutation.mutateAsync({ token, courseId, scheduleId });
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 bg-gray-50 p-10 rounded-xl border border-gray-100 mt-8 mb-3"
      >
        <div className="flex justify-between">
          <h3 className="heading-4 text-gray-400">Total Price</h3>
          <span className="heading-2 text-gray-800">
            ${basePrice + priceModifier}
          </span>
        </div>

        <div className="flex justify-between mt-4">
          <h3 className="body-s text-gray-400">Base Price</h3>
          <span className="body-s text-gray-800">+ ${basePrice}</span>
        </div>

        <div className="flex justify-between">
          <h3 className="body-s text-gray-400">Session Type</h3>
          <span className="body-s text-gray-800">+ ${priceModifier}</span>
        </div>

        <Button
          type="submit"
          disabled={false}
          className="heading-4 w-full py-6 bg-brand-500 text-gray-50 disabled:bg-brand-50 disabled:text-brand-200 mt-4 cursor-pointer"
        >
          Enroll Now
        </Button>
      </form>
    </>
  );
};

export default Form;
