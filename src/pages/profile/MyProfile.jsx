import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { UpdatePasswordFrm } from "../../components/admin-profile/UpdatePasswordFrm";

const MyProfile = () => {
  return (
    <AdminLayout title="My Profile">
      <div>
        <h3>Update User Profile</h3>
        <hr />
      </div>

      <div className="mt-5">
        <h3>Update User Password</h3>
        <hr />
        <UpdatePasswordFrm />
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
