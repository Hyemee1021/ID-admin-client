import React, { useState } from "react";
import { CustomInpute } from "../custom-inpute/CustomInpute";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updatePassword } from "../../helpers/axiosHelper";

const initialState = {
  confirmPassword: "",
  newPassword: "",
  oldPassword: "",
};
export const UpdatePasswordForm = () => {
  const [form, setForm] = useState({});

  const handleOnPasswordForm = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.newPassword) {
      return toast.error("passwords dont match");
    }

    const pending = updatePassword(rest);

    toast.promise(pending, {
      pending: "please, wait",
    });

    const { status, message } = await pending;
    toast[status](message);

    status === "success" && setForm(initialState);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //apply password strength validation-homework

    setForm({
      ...form,
      [name]: value,
    });
  };
  const inputs = [
    {
      label: "Current Password",
      name: "oldPassword",
      required: true,
      placeholder: "345564",
    },

    {
      label: "New Password",
      name: "newPassword",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
    },
  ];
  return (
    <div>
      {" "}
      <Form
        onSubmit={handleOnPasswordForm}
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
      >
        <div>Update your password</div>
        <hr />
        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button type="submit" variant="warning">
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
