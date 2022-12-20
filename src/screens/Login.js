import React, { useState } from "react";
import CommonButton from "../components/CommonButton";
import { BASEURL, Error, Success } from "../shared/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../components/FullScreenSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post(`${BASEURL}/user/login`, {
        email,
        phoneNo,
        password,
      });

      // console.log(data);
      // console.log(data.user.walletAddress);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      //   if (!data.user.walletAddress) {
      //     const account = await createAccount();
      //     // console.log(account);
      //     const ok = await updateUserWithWallet(
      //       account.address,
      //       account.privateKey
      //     );
      //     if (!ok) {
      //       localStorage.removeItem("token");
      //       localStorage.removeItem("role");

      //       Error("something went wrong");
      //       return;
      //     }
      //     localStorage.setItem(`user`, JSON.stringify(data.user));
      //     Success("Login successfull");
      //     if (data.user.role === "admin") navigate("/admin/users");
      //     else navigate("/stake");
      //     setIsLoading(false);
      //     return;
      //   }
      //   localStorage.setItem(`user`, JSON.stringify(data.user));
      Success("Login successfull");
      if (data.user.role === "admin") navigate("/admin/all-users");
      else navigate("/dashboard");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
      Error(e.response.data.message);
      setIsLoading(false);
    }
  };

  const updateUserWithWallet = async (walletAddress, privateKey) => {
    try {
      await axios.put(`${BASEURL}/user/update`, {
        email: email,
        walletAddress: walletAddress,
        privateKey: privateKey,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const validate = () => {
    if (!password || !(email || phoneNo)) return true;
    return false;
  };

  const inputClass =
    "border-2 h-12 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2";
  return (
    <div className="bg-dark text-white  min-h-screen flex flex-col justify-center items-center">
      <div className="w-[80%] md:w-[400px] m-auto text-left ">
        <p className="text-2xl md:text-3xl font-bold">Account Login</p>
        {/* inputs div  */}
        <div className="mt-5 pt-1">
          <div className="my-4">
            <label className="text-sm mb-2 text-left" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              className={inputClass}
            />
          </div>

          <div className="my-4">
            <label className="text-sm mb-2 text-left" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className={inputClass}
            />
          </div>
        </div>

        {isLoading && <FullScreenSpinner />}
        <CommonButton
          disable={validate()}
          onClick={handleLogin}
          text="Login"
          bg="bg-blue-500"
        />

        {/* <CommonButton text="Continue with Apple" bg="bg-black" />
        <CommonButton
          color="text-black"
          text="Continue with Google"
          bg="bg-white"
        /> */}
        <div className="flex justify-between">
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link to="/register">Regiser now</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
