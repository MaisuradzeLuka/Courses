import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { VscMail } from "react-icons/vsc";
import { PiPhone } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

export const socLinks = [
  { icon: FaFacebookF, link: "#", id: "facebook" },
  { icon: FaTwitter, link: "#", id: "twitter" },
  { icon: AiFillInstagram, link: "#", id: "instagram" },
  { icon: FaLinkedinIn, link: "#", id: "linkedin" },
  { icon: FaYoutube, link: "#", id: "youtube" },
];

export const navLinks = [
  {
    title: "Explore",
    id: "explore",
    links: [
      {
        label: "Enrolled Courses",
        id: "enrolledCourses",
        link: "#",
        icon: null,
      },
      { label: "Browse Courses", id: "browseCourses", link: "#", icon: null },
    ],
  },
  {
    title: "Account",
    id: "account",
    links: [{ label: "My Profile", id: "myProfile", link: "#", icon: null }],
  },
  {
    title: "Contact",
    id: "contact",
    links: [
      { label: "contact@company.com", id: "email", link: "#", icon: VscMail },
      { label: "(+995) 555 111 222", id: "mobile", link: "#", icon: PiPhone },
      {
        label: "Aghmashenebeli St.115",
        id: "adress",
        link: "#",
        icon: SlLocationPin,
      },
    ],
  },
];
