import { Button, Form } from "react-bootstrap";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useState } from "react";
import { toast } from "react-toastify";
import { postNewAdmin } from "../../helpers/axiosHelper";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const handleOnChange = (e) => {
    //password rules //regex

    // 2. must include uppercase
    // 3. must include lowercase
    // 4. must include number
    const { name, value } = e.target;
    setPasswordValidationError("");
    if (name === "password") {
      value.length < 6 &&
        setPasswordValidationError("Must be longer than 6 chars");

      !/[A-Z]/.test(value) &&
        setPasswordValidationError("must include uppercase");
      !/[a-z]/.test(value) &&
        setPasswordValidationError("must include lowercase");
      !/[0-9]/.test(value) && setPasswordValidationError("must include number");
    }

    if (name === "confirmPassword") {
      form.password !== value &&
        setPasswordValidationError("Password do not match");
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      toast.error("Password do not match");
      return;
    }

    const userPening = postNewAdmin(rest);

    toast.promise(userPening, {
      pending: "Please wait...",
    });

    const { status, message } = await userPening;
    toast[status](message);
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "John",
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "Wick",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "John@email.com",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "040000000",
    },
    {
      label: "Address",
      name: "address",
      placeholder: "1 george st Sydney",
    },
    {
      label: "Password",
      name: "password",
      required: true,
      // type: "password",
      placeholder: "xxxxxxx",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      placeholder: "xxxxxxxxx",
      type: "password",
    },
  ];

  return (
    <div>
      <div className="text-center">Tech Gare Admin cms</div>
      <hr />
      <Form
        onSubmit={handleOnSubmit}
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
      >
        <h3>Admin signup only</h3>
        <hr />
        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="">
          {passwordValidationError && (
            <div className="text-danger fw-bold p-3">
              {passwordValidationError}
            </div>
          )}
        </div>

        <div className="d-grid">
          <Button type="submit" disabled={passwordValidationError}>
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
