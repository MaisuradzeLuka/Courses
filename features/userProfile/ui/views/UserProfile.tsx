"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "../components/UserAvatar";
import UserForm from "../components/UserForm";
import { UserType } from "@/types";
import { useAuthModal } from "@/hooks/useAuthModal";

const UserProfile = ({
  avatar,
  profileComplete,
  username,
  email,
  fullName,
  age,
  mobileNumber,
}: UserType) => {
  const { profileOpen, setShowProfile } = useAuthModal();

  return (
    <Dialog open={profileOpen} onOpenChange={setShowProfile}>
      <DialogTrigger>
        <UserAvatar
          avatarUrl={avatar}
          ping={profileComplete ? "/ping-complete.png" : "/ping.png"}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="heading-2">Profile</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <UserAvatar
            avatarUrl={avatar}
            ping={profileComplete ? "/ping-complete.png" : "/ping.png"}
          />

          <div>
            <h4 className="heading-4 mb-1">{username}</h4>
            <p
              className={`${profileComplete ? "text-success" : "text-warning"}`}
            >
              {profileComplete ? "Profile is Complete" : "Incomplete Profile"}
            </p>
          </div>
        </div>

        <UserForm
          email={email}
          fullname={fullName}
          age={age}
          avatar={avatar}
          mobile={mobileNumber}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
