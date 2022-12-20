import React from "react";
import Heading from "../../Heading";
import AmazonLogo from "../../../assets/brands/amazon.png";
import BinanceLogo from "../../../assets/brands/binance.png";
import BitgoLogo from "../../../assets/brands/bitgo.png";
import CcssLogo from "../../../assets/brands/ccss.png";
import CloudflareLogo from "../../../assets/brands/cloudflare.png";
import SecureLogo from "../../../assets/brands/secure.png";
import CommunityImage from "../../../assets/images/community.png";

const channels = [
  {
    title: "Trading Crypto Guide",
    address: "https://t.me/TCGFORYOU",
  },
  {
    title: "The Crypto express",
    address: "https://t.me/TheCryptoExpress",
  },
  {
    title: "Yoyow",
    address: "https://t.me/realyoyowduyuru",
  },
];

const TelegramCards = () => {
  const BrandsLogo = [
    BinanceLogo,
    BitgoLogo,
    CloudflareLogo,
    BinanceLogo,
    BitgoLogo,
  ];
  return (
    <div>
      <Heading text="Telegram partners channel links" />
      <div className="my-12  max-w-[80%] m-auto">
        <div className="m-4 my-10 flex-col flex sm:flex-row justify-between items-center">
          {channels &&
            channels.map((data, index) => {
              return (
                <div className="text-white md:my-2 my-6">
                  <p className="text-xl">{data.title}</p>
                  <p
                    className="mt-4 cursor-pointer"
                    onClick={() => window.open(data.address, "_blank")}
                  >
                    <i className="fa-brands text-3xl fa-telegram"></i>
                  </p>
                </div>
              );
            })}
        </div>
        <div className="md:flex my-20 justify-between items-center">
          <div className="md:w-2/4">
            <p className="md:text-left max-w-[80%] m-auto text-4xl text-white">
              Learn & grow with CVS community{" "}
            </p>
          </div>
          <div className="md:w-2/4 mt-10 md:m-auto">
            <img src={CommunityImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramCards;
