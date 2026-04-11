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
        className="object-cover object-center rounded-4xl"
      />

      <div className="z-10 absolute flex max-w-3/4 flex-col gap-10">
        <div>
          <h3 className="text-5xl font-bold text-gray-50">{title}</h3>
          {description ? (
            <p className="body-xl font-light! text-gray-50 mt-3">
              {description}
            </p>
          ) : null}
        </div>
        <Link
          href={link}
          className="py-5 px-6 bg-brand-500 rounded-lg text-white w-fit text-xl font-medium! cursor-pointer disabled:bg-brand-300"
        >
          {btnLabel}
        </Link>
      </div>
    </div>
  );
};

export default Item;
