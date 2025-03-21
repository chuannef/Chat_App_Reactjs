import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-base-200">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/80 to-secondary/80 h-32 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="size-32 rounded-full border-4 border-base-100 overflow-hidden bg-base-300">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-2 right-2
                    bg-base-100 text-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer shadow-md
                    transition-all duration-200 border border-base-300
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="size-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="pt-20 px-6 pb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{authUser?.fullName}</h1>
              <p className="text-base-content/60 mt-1 text-sm">
                {isUpdatingProfile ? "Updating profile..." : "Member"}
              </p>
            </div>

            {/* User information cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Email card */}
              <div className="bg-base-200/50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Email Address</h3>
                </div>
                <p className="ml-11 text-base-content/80">{authUser?.email}</p>
              </div>

              {/* Joined date card */}
              <div className="bg-base-200/50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Calendar className="size-5 text-secondary" />
                  </div>
                  <h3 className="font-medium">Member Since</h3>
                </div>
                <p className="ml-11 text-base-content/80">
                  {formatDate(authUser?.createdAt)}
                </p>
              </div>
            </div>

            {/* Account status */}
            <div className="bg-base-200/50 p-4 rounded-xl mt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-success/10 p-2 rounded-lg">
                  <Shield className="size-5 text-success" />
                </div>
                <h3 className="font-medium">Account Status</h3>
              </div>
              <div className="ml-11 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span className="text-success">Active</span>
              </div>
            </div>

            {/* Profile actions */}
            <div className="mt-8 flex justify-center">
              <label
                htmlFor="avatar-upload"
                className={`
                  btn btn-primary btn-outline gap-2
                  ${isUpdatingProfile ? "loading" : ""}
                `}
                disabled={isUpdatingProfile}
              >
                <Camera className="size-4" />
                {isUpdatingProfile ? "Uploading..." : "Update Profile Picture"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;