import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTradeMobileMenuOpen, setIsTradeMobileMenuOpen] = useState(false);
  const [isProfileMobileMenuOpen, setIsProfileMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);
  const [user, setUser] = useState({});

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

  const center = "mx-1 px-2 font-normal cursor-pointer";
  const left = "mx-2 font-normal cursor-pointer";
  const mobile = "m-2 font-normal cursor-pointer";
  const hover =
    "font-normal cursor-pointer p-3 hover:bg-gray-400 hover:bg-opacity-10 text-md grid grid-flow-col justify-start items-center gap-2";

  const isActiveMenu = (url) => {
    return location.pathname?.toLowerCase() == url.toLowerCase();
  };

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
                  onClick={() => navigate("/admin/all-users")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Users
                </li>
                <li
                  onClick={() => navigate("/admin/all-queries")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Queries
                </li>
                <li
                  onClick={() => navigate("/admin/all-banners")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Create Post
                </li>
                <li
                  onClick={() => navigate("/admin/add-category")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Add Category
                </li>
                <li
                  onClick={() => navigate("/admin/subscription-price")}
                  className="mx-2 font-semibold cursor-pointer"
                >
                  Subs. Price
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
                </ul>
              </div>
            ) : (
              <div>
                <ul className="flex items-center">
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
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin/all-users");
                        }}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Users
                      </li>
                      <li
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin/all-queries");
                        }}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Queries
                      </li>
                      <li
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin/all-banners");
                        }}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Create Post
                      </li>
                      <li
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin/add-category");
                        }}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Add Category
                      </li>
                      <li
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin/subscription-price");
                        }}
                        className="my-2 font-semibold cursor-pointer"
                      >
                        Subs. Price
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
    </div>
  );
};

export default AdminNavbar;
