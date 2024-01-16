import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { UpdatePasswordForm } from "../../components/admin-profile/UpdatePasswordForm";

const MyProfile = () => {
  return (
    <AdminLayout title="My Profile">
      <div>
        <h3>Update user profile</h3>
      </div>

      <div className="mt-5">
        <h3>Update user password</h3>
        <UpdatePasswordForm />
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
