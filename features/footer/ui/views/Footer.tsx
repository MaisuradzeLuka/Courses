import Link from "next/link";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const Footer = () => {
  return (
    <div className="pb-5 pt-20 border-t border-gray-200">
      <footer className="max-w-400 w-full mx-auto ">
        <div className="flex items-start justify-between">
          <LeftSide />
          <RightSide />
        </div>

        <div className="flex items-center justify-between mt-18">
          <p className="body-m font-normal text-gray-500">
            Copyright © 2026 Redberry International
          </p>

          <div className="flex items-center">
            <p className="body-m font-normal text-gray-500 mr-2">
              All Rights Reserved
            </p>

            <Link
              href="#"
              className="body-m font-normal text-brand-500 border-x border-gray-500 px-2"
            >
              Terms and Conditions
            </Link>

            <Link href="#" className="body-m font-normal text-brand-500 ml-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
