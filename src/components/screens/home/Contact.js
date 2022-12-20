import React from "react";
import Group from "../../../assets/images/group.png";
import Headset from "../../../assets/images/headset.png";
import QrCode from "../../../assets/images/qrcode.png";
import Request from "../../../assets/images/request.png";
import CommonButton from "../../CommonButton";
import About from "../../../assets/images/about.png";
const Contact = () => {
  const Data = [
    {
      title: "24/7 Support",
      description:
        "Got a problem? Just get in touch. Our support team is available 24/7.",
      image: Headset,
    },
    {
      title: "Community",
      description:
        "CVS is global, Join the biggest crypto community in the world",
      image: Group,
    },
    {
      title: "Submit request",
      description:
        "Got a problem? Just get in touch. Our support team is available 24/7.",
      image: Request,
    },
  ];

  return (
    <div className="max-w-[80%] m-auto my-24">
      <div className="md:flex justify-between">
        {Data &&
          Data.map((data, i) => {
            return (
              <div
                key={i}
                className="text-white text-center flex items-center justify-center flex-col mt-10 md:m-auto"
              >
                <img src={data.image} className="items-center" alt="" />
                <p className="text-md my-4">{data.title}</p>
                <p className="text-sm md:max-w-[60%] m-auto">
                  {data.description}
                </p>
              </div>
            );
          })}
      </div>
      <div className="text-white flex items-center justify-center flex-col">
        <p className="mt-20 mb-10 text-xl">Start your crypto journey now</p>
        <img src={QrCode} />
        <CommonButton
          text="Join Now"
          onClick={() =>
            window.open("https://t.me/CryptoVIPsignalTA", "_blank")
          }
        />
      </div>
      <div className="my-20 md:flex items-center justify-between text-white">
        <div className="md:w-2/4 text-left">
          <p className="my-4  text-xl">About CVS</p>
          <p className="text-sm">
            Crypto VIP technical analysis team gives daily market updates with
            great consistency in market predictions. The team shares quality
            educational content regularly to educate the community about new
            trends. The team is always available to support the community.
          </p>
        </div>
        <div className="md:w-2/4 mt-10 md:m-auto flex justify-center">
          <img src={About} className="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
