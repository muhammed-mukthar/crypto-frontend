import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Swap from "../shared/swap";
import { Error, Success } from "../shared/utils";
import swap from "../shared/swap";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connector";
import { disconnect } from "process";
import ContactModal from "./ContactModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { account, activate, deactivate, error } = useWeb3React();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        setIsMobileView(false);
      } else {
        setIsMobileView(true);
      }
    });
    if (window.innerWidth > 800) {
      setIsMobileView(false);
    } else {
      setIsMobileView(true);
    }
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    else setIsLoggedIn(false);
    if (
      localStorage.getItem("role") &&
      localStorage.getItem("role") === "admin"
    )
      setIsAdmin(true);
    else setIsAdmin(false);
  }, []);

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    return account;
  }

  const onFinalizeHandler = async (index) => {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const account = await getAccount();
        alert(account);
      } else {
        Error("Please install Metamaskk");
      }
      const accounts = await Swap.eth.getAccounts();

      alert("finaliseRequest");
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  };

  const connectHandler = async () => {
    if (account) {
      deactivate();
      return;
    }
    await activate(injected);
  };
  const shortAddress = (str) => {
    if (str) {
      if (str.length < 10) return str;
      return `${str.slice(0, 5)}...${str.slice(-5)}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    var isAccountExists = localStorage.setItem("account", account);
    if (!isAccountExists) {
      if (account) localStorage.setItem("account", account);
      if (!account) {
        activate(injected);
      }
    }
  }, [account]);

  return (
    <div className="bg-dark py-0 shadow shadow-black ">
      <div className="max-w-6xl m-auto nav">
        {!isMobileView ? (
          <div className="bg-dark text-white items-center flex justify-between">
            {/* <p className="font-bold text-2xl">Logo</p> */}
            <Link to="/">
              <img src={Logo} className="cursor-pointer " alt="" />
            </Link>
            <div>
              <ul className="flex list-items">
                <li
                  onClick={() => setIsModalOpen(true)}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  AMA
                </li>
                <li
                  onClick={() => navigate("/profile")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Get Premium
                </li>
                <li
                  onClick={() => Success("Coming Soon")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Giveaway
                </li>
                <li
                  onClick={() => Success("Coming Soon")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Referral
                </li>
              </ul>
            </div>
            {!isLoggedIn ? (
              <div>
                <ul className="flex items-center">
                  <li>
                    <CommonButton
                      onClick={() => navigate("/login")}
                      extraClass="mx-1 text-white"
                      text="Signin"
                    />
                  </li>
                  <li>
                    <CommonButton
                      onClick={() => navigate("/register")}
                      extraClass="mx-1 text-white"
                      text="Signup"
                    />
                  </li>
                  <li>
                    <CommonButton
                      onClick={connectHandler}
                      extraClass="mx-1 text-white"
                      text={account ? shortAddress(account) : "Connect Wallet"}
                    />
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <ul className="flex items-center">
                  <li>
                    <CommonButton
                      onClick={() => navigate("/dashboard")}
                      extraClass=" w-full my-0 text-white"
                      text="Dashboard"
                    />
                  </li>
                  <li>
                    <CommonButton
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                      extraClass="mx-1 text-white"
                      text="Logout"
                    />
                  </li>
                  <li>
                    <CommonButton
                      onClick={connectHandler}
                      extraClass="mx-1 text-white"
                      text={account ? shortAddress(account) : "Connect Wallet"}
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="z-10 sticky top-0 bg-black pb-4 text-left text-white ">
            {/* <p className="font-bold text-2xl">Logo</p> */}
            <div className="w-[80%] m-auto">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <img src={Logo} className="cursor-pointer " alt="" />
                </Link>
                <span
                  onClick={() => setIsMenuOpen((p) => !p)}
                  className="cursor-pointer text-2xl"
                >
                  <i className="fa-solid fa-bars"></i>
                </span>
              </div>
              {isMenuOpen && (
                <>
                  <div className="my-2 border-b-2 border-slate-700 pb-2">
                    <ul className="">
                      <li
                        onClick={() => setIsModalOpen(true)}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        AMA
                      </li>
                      <li
                        onClick={() => navigate("/profile")}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Get Premium
                      </li>
                      <li
                        onClick={() => Success("Coming Soon")}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Giveaway
                      </li>
                      <li
                        onClick={() => Success("Coming Soon")}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Referral
                      </li>
                    </ul>
                  </div>
                  <div className="my-4 ">
                    <ul className="">
                      {!isLoggedIn ? (
                        <>
                          <li>
                            <CommonButton
                              onClick={() => navigate("/login")}
                              extraClass=" w-full my-0 text-white"
                              text="Signin"
                            />
                          </li>
                          <li>
                            <CommonButton
                              onClick={() => navigate("/register")}
                              extraClass=" w-full my-0 text-white"
                              text="Signup"
                            />
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <CommonButton
                              onClick={() => navigate("/dashboard")}
                              extraClass=" w-full my-0 text-white"
                              text="Dashboard"
                            />
                          </li>
                          <li>
                            <CommonButton
                              onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                              }}
                              extraClass="mx-1 text-white"
                              text="Logout"
                            />
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <ContactModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Navbar;
