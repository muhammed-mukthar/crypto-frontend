import axios from "axios";
import React, { useState } from "react";
import CommonButton from "../components/CommonButton";
import { BASEURL, Error, Success } from "../shared/utils";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import Spinner from "../components/Spinner";
import FullScreenSpinner from "../components/FullScreenSpinner";

const Register = () => {
  const [isCountryModelOpen, setIsCountryModelOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [PANNumber, setPANNumber] = useState("");
  const [panResponse, setPanResponse] = useState("");
  const [tandc, setTandc] = useState(false);
  const validate = () => {
    console.log(country, name, phoneNo, password, email);
    if (!name || !password || !phoneNo || !email) return true;
    return false;
  };

  const handleVerifyPAN = async () => {
    setIsLoading(true);
    axios
      .post(`${BASEURL}/user/pan`, {
        panNumber: PANNumber,
      })
      .then((response) => {
        console.log(response);
        setPanResponse(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (
      !/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
        email
      )
    ) {
      Error("Invalid Email Id");
      return;
    }

    setIsLoading(true);
    axios
      .post(`${BASEURL}/user/`, {
        name,
        email,
        phoneNo,
        password,
        referralCode,
        PANNumber,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
        Success("You've been registered successfully");
        setName("");
        setEmail("");
        setPhoneNo("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data.message);
        Error(e.response.data.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const inputClass =
    " border-2 h-12 w-full rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2 ";
  return (
    <div className="bg-dark text-white min-h-screen flex flex-col justify-center items-center">
      <div className="w-[80%] md:w-[900px] py-10 m-auto text-left ">
        <p className="text-2xl  md:text-3xl font-bold">Welcome Crypto Signal</p>

        {/* inputs div  */}
        <div className="mt-5 pt-1 flex flex-wrap">
          <div className="m-3 my-2 w-[400px]">
            <label className="text-sm mb-2" htmlFor="country">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>{" "}
          <div className="m-3 my-2 w-[400px]">
            <label className="text-sm mb-2" htmlFor="country">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>{" "}
          <div className="m-3 my-2 w-[400px]">
            <label className="text-sm mb-2" htmlFor="country">
              Phone Number{" "}
            </label>
            <input
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className={inputClass}
            />
          </div>{" "}
          <div className="m-3 my-2 w-[400px]">
            <label className="text-sm mb-2" htmlFor="country">
              Password{" "}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {isLoading && <FullScreenSpinner />}
        <div className="m-3 my-2 md:w-[400px]">
          <CommonButton
            onClick={handleRegistration}
            text="Register"
            bg="bg-blue-500"
            disable={validate()}
          />

          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link to="/login">Login?</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
