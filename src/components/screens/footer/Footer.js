import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error, Success } from "../../../shared/utils";
import ContactModal from "../../ContactModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="bg-black text-white">
      <div className="max-w-[80%] md:max-w-[60%] m-auto py-10 text-left  md:flex flex-wrap justify-around items-start">
        <div>
          <p className="font-semibold mb-4 mt-6">About</p>
          <ul>
            <li onClick={() => navigate("/about")} className="cursor-pointer">
              About
            </li>
            <li onClick={() => setIsModalOpen(true)} className="cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-4 mt-6">Development</p>
          <ul>
            <li className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
              AMA
            </li>
            <li className="cursor-pointer" onClick={() => Error("Coming Soon")}>
              Decentralised Casio
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/profile")}>
              Get Premium
            </li>
            <li
              className="cursor-pointer"
              onClick={() => Success("Coming Soon")}
            >
              Educational PDF
            </li>
            <li
              className="cursor-pointer"
              onClick={() => Success("Coming Soon")}
            >
              Telegram Referral Contest
            </li>
            <li
              className="cursor-pointer"
              onClick={() => Success("Coming Soon")}
            >
              Giveaway
            </li>
            <li
              className="cursor-pointer"
              onClick={() => Success("Coming Soon")}
            >
              Mega Signal
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-4 mt-6"> Support Us</p>
          <div className="flex">
            <p
              className="cursor-pointer m-2 text-3xl"
              onClick={() =>
                window.open("mailto:cryptovipsignal@gmail.com", "_blank")
              }
            >
              <i class="fa-solid fa-envelope"></i>
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-4 mt-6">Comunity</p>
          <div className="flex">
            <p
              className="cursor-pointer m-2 text-3xl"
              onClick={() =>
                window.open("https://twitter.com/CrptoVIPsignal", "_blank")
              }
            >
              <i class="fa-brands fa-twitter"></i>
            </p>
            <p
              className="cursor-pointer m-2 text-3xl"
              onClick={() =>
                window.open("https://t.me/CryptoVIPsignalTA", "_blank")
              }
            >
              <i class="fa-brands fa-telegram"></i>
            </p>
          </div>
        </div>
      </div>
      <p className="text-center pb-4">Powered by Crypto VIP Signal</p>
      <ContactModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Footer;
