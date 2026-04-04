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

const UserProfile = () => {
  const user: UserType = JSON.parse(localStorage.getItem("user") || "");

  const isProfileComplete = user.profileComplete;

  return (
    <Dialog>
      <DialogTrigger>
        <UserAvatar
          avatarUrl={user.avatar}
          ping={isProfileComplete ? "/ping-complete.png" : "/ping.png"}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="heading-2">Profile</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <UserAvatar
            avatarUrl={user.avatar}
            ping={isProfileComplete ? "/ping-complete.png" : "/ping.png"}
          />

          <div>
            <h4 className="heading-4 mb-1">{user.username}</h4>
            <p
              className={`${isProfileComplete ? "text-success" : "text-warning"}`}
            >
              {user.profileComplete
                ? "Profile is Complete"
                : "Incomplete Profile"}
            </p>
          </div>
        </div>

        <UserForm
          email={user.email}
          fullname={user.fullName}
          age={user.age}
          avatar={user.avatar}
          mobile={user.mobileNumber}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
