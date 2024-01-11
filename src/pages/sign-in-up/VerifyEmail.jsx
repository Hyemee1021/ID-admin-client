import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { postVerifyEmail } from "../../helpers/axiosHelper";
const VerifyEmail = () => {
  //grab query string form url
  const [searchParams] = useSearchParams();

  const [showSpinner, setShowSpinner] = useState(true);

  const [resp, setresp] = useState({});

  const associate = searchParams.get("e");
  const token = searchParams.get("c");
  console.log(associate, token);

  useEffect(() => {
    userEmailVerification();
  }, []);

  const userEmailVerification = async () => {
    const response = await postVerifyEmail({ associate, token });

    setShowSpinner(false);

    setresp(response);
  };
  return (
    <div>
      <div className="text-center">Verify your email</div>
      <hr />

      <div className="text-center mt-5">
        {showSpinner && <Spinner variant="primary" animation="border" />}
      </div>
      {resp.message && (
        <Alert
          className="w-50 m-auto"
          variant={resp.status === "success" ? "success" : "danger"}
        >
          {resp.message}
        </Alert>
      )}
    </div>
  );
};

export default VerifyEmail;
