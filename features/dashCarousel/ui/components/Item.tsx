import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string;
  title: string;
  description: string;
  btnLabel: string;
  link: string;
};

const Item = ({ imageUrl, btnLabel, description, link, title }: Props) => {
  return (
    <div className="relative w-full h-105 rounded-4xl p-12">
      <Image
        src={imageUrl}
        fill
        alt="carousel item"
        className="object-cover rounded-4xl"
      />

      <div className="z-10 absolute">
        <h3 className="text-5xl font-bold text-gray-50">{title}</h3>

        <p className="body-xl font-light! text-gray-50 mt-3 mb-10 max-w-3/4">
          {description}
        </p>
        <Link
          href={link}
          className="py-5 px-6 bg-brand-500 rounded-lg text-white mt-4 text-xl font-medium! cursor-pointer disabled:bg-brand-300"
        >
          {btnLabel}
        </Link>
      </div>
    </div>
  );
};

export default Item;
