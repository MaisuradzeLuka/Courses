import Image from "next/image";

type Props = {
  avatarUrl: string | null;
  ping: string;
};

const UserAvatar = ({ avatarUrl, ping }: Props) => {
  return (
    <div className="w-14 h-14 relative flex items-center justify-center bg-brand-50 rounded-full">
      <Image
        src={avatarUrl || "/User.png"}
        width={54}
        height={54}
        alt="user avatar"
        className={`${avatarUrl ? "w-full h-full rounded-full object-cover" : ""}`}
      />

      <Image
        src={ping}
        width={15}
        height={15}
        alt="avatar ping"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default UserAvatar;
