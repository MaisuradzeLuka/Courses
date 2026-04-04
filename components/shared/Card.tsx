import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  styles?: string;
};

const Card = ({ children, styles }: Props) => {
  return (
    <div className={`w-full h-auto bg-white rounded-xl p-5 ${styles}`}>
      {children}
    </div>
  );
};

export default Card;
