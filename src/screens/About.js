import React from "react";

const About = () => {
  return (
    <div className="text-white text-left m-auto max-w-[80%]">
      <p className="font-semibold text-4xl mb-4">About</p>
      <p className="my-2">
        Crypto VIP started the journey in 2015 intending to help and educate
        people about Bitcoin and the crypto market. The Crypto VIP team gives
        educational posts and regular updates on the market. The 2017 bull run
        bring a lot of new users to crypto and the Crypto VIP community achieved
        the first 50,000 members.
      </p>
      <p className="my-2">
        The majority of the telegram channels and communities collapsed during
        the bear market of 2018-2019 but the Crypto VIP team become stronger and
        never stopped working. The community keeps growing and learning about
        the market. Its becomes one of the biggest communities with more than
        315,000 members.
      </p>
      <p className="my-2">
        Crypto VIP technical analysis team gives daily market updates with great
        consistency in market predictions. The team shares quality educational
        content regularly to educate the community about new trends. The team is
        always available to support the community.
      </p>
      <p className="my-2">
        The Crypto VIP team did AMAs with top-tier projects and provide huge
        giveaways regularly. Many big names like CZ (Binance CEO), Johnny Lyu
        (Kucoin CEO), and the list goes on.
      </p>
      <p className="my-2">
        The Crypto VIP team's goal is to reach 500,000 members by year-end.
        Crypto market awareness is at a very low level and it's our
        responsibility to educate people about crypto. Be a part of our
        community and win together.
      </p>

      <div className="mt-10">
        {/* <p className="mt-10 text-xl">Socials</p> */}
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
  );
};

export default About;
