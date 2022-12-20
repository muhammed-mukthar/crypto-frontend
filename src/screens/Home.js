import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Navbar from "../components/Navbar";
import Card1 from "../assets/images/card1.png";
import Card2 from "../assets/images/card2.png";
import Card3 from "../assets/images/card3.png";
import AmazonLogo from "../assets/brands/amazon.png";
import BinanceLogo from "../assets/brands/binance.png";
import BitgoLogo from "../assets/brands/bitgo.png";
import CcssLogo from "../assets/brands/ccss.png";
import CloudflareLogo from "../assets/brands/cloudflare.png";
import SecureLogo from "../assets/brands/secure.png";
import Heading from "../components/Heading";
import TelegramCards from "../components/screens/home/TelegramCards";
import Contact from "../components/screens/home/Contact";
import Footer from "../components/screens/footer/Footer";
import Banner1 from "../assets/images/ama.png";
import Banner2 from "../assets/images/Gaming.png";
import Banner3 from "../assets/images/Educational.png";
import Banner4 from "../assets/images/Giveaway.png";
import axios from "axios";
import {
  BASECOINGEKO,
  BASEURL,
  Success,
  TELEGRAM_BASE_URL,
  TELEGRAM_FILE_URL,
} from "../shared/utils";
import swap from "../shared/swap";
import TelegramPosts from "../components/screens/home/TelegramSlider";
import { responsive } from "../shared/constants";
import LatestPosts from "../components/screens/home/LatestPostsSlider";
import ContactModal from "../components/ContactModal";
import SignalPosts from "../components/screens/home/SignalPosts";
import Logo1 from "../assets/logo/airdao.png";
import Logo2 from "../assets/logo/arcs.png";
import Logo3 from "../assets/logo/binance.png";
import Logo5 from "../assets/logo/bluzelle.png";
import Logo6 from "../assets/logo/digibyte.png";
import Logo7 from "../assets/logo/ghost.png";
import Logo8 from "../assets/logo/eidoo.png";
import Logo9 from "../assets/logo/KuCoin.png";
import Logo10 from "../assets/logo/lto.png";
import Logo11 from "../assets/logo/navacoin.png";
import Logo12 from "../assets/logo/pivx.png";
import Logo13 from "../assets/logo/polygon.png";
import Logo14 from "../assets/logo/zillika.png";
import CryptoPrices from "../components/screens/home/CryptoPriceSlider";

const cardImages = [Card1, Card2, Card3];
const cardTelegram = [BinanceLogo, BitgoLogo, SecureLogo];
const Banners = [Banner1, Banner2, Banner3, Banner4, Banner2, Banner3];
const BrandsLogo = [
  AmazonLogo,
  BinanceLogo,
  BitgoLogo,
  CcssLogo,
  CloudflareLogo,
  SecureLogo,
  AmazonLogo,
  BinanceLogo,
  BitgoLogo,
  CcssLogo,
];
const Logos = [
  Logo1,
  Logo2,
  Logo3,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
  Logo10,
  Logo11,
  Logo12,
  Logo13,
  Logo14,
];
const Home = () => {
  const navigate = useNavigate();
  const [latestBanners, setLatestBanners] = useState([]);
  const [coinstList, setCoinstList] = useState([])
  const [telegramBanners, setTelegramBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadBanners = async () => {
    axios
      .get(`${BASEURL}/banner/all`)
      .then((response) => {
        setLatestBanners(response.data.data);
      })
      .catch((e) => {});

    axios
      .get(`${TELEGRAM_BASE_URL}/getUpdates`)
      .then(async (res) => {
        let results = res.data.result;
        results.map((obj) => {
          if (obj?.channel_post?.photo) {
            let photo = obj.channel_post.photo[2];
            axios
              .get(`${TELEGRAM_BASE_URL}/getFile?file_id=${photo?.file_id}`)
              .then((res) => {
                let file = res?.data?.result;
                setTelegramBanners((prev) => [
                  ...prev,
                  { file, caption: obj.channel_post.caption },
                ]);
              })
              .catch((err) => { });
          }
        });
      })
      .catch((err) => { });
  };

  const loadCoinsList = async () => {
    axios
      .get(`${BASECOINGEKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`)
      .then((response) => {
        setCoinstList(response.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    loadBanners();
    loadCoinsList();
  }, []);

  return (
    <div>
      <Navbar />
      {/* hero section  */}
      <div className="min-h-[70vh] text-white flex items-center justify-center">
        <div className="max-w-[80%] text-left">
          <h1 className="font-bold text-3xl">
            It's time to preserve your capital and make a fortune with
            cryptocurrency
          </h1>
          <p className="mt-4">Join the world's largest crypto community</p>
          <CommonButton
            text="Join Now"
            onClick={() =>
              window.open("https://t.me/CryptoVIPsignalTA", "_blank")
            }
          />
        </div>
      </div>
      <hr />
      {/* card section  */}
      <div className="my-20 flex-wrap justify-between max-w-[80%] m-auto">
        {telegramBanners?.length && <TelegramPosts images={telegramBanners} />}
      </div>

      {/* signal post  */}
      <div className="my-24 text-white max-w-[80%] m-auto square">
        <div className="justify-between">
          {coinstList?.length ? <CryptoPrices coinsData={coinstList} />:<div></div>}
        </div>
      </div>

      {/* signal post  */}
      <div className="my-24 text-white max-w-[80%] m-auto">
        <div className="justify-between">
          <SignalPosts banners={Banners} />
        </div>
      </div>

      {/* latest post section  */}
      <div className="my-24 text-white max-w-[80%] m-auto">
        <div className="flex items-center justify-between">
          <p className="text-left font-semibold text-2xl">Latest Posts</p>
          <CommonButton
            onClick={() => navigate("/all-posts")}
            text="See More "
          />
        </div>
        <div className="justify-between">
          <LatestPosts latestBanners={latestBanners} />
        </div>
      </div>

      {/* brands section  */}
      <Heading text="CVS works with the leading crypto exchanges & projects" />

      <div className="my-12 md:p-4 bg-white rounded-2xl max-w-[80%] m-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <div className="m-4 md:my-8 flex flex-wrap justify-between items-center">
              {Logos &&
                Logos.slice(0, 6).map((image, index) => {
                  return (
                    <img
                      src={image}
                      key={index}
                      className="m-2 max-w-[100px]"
                      alt=""
                    />
                  );
                })}
            </div>
            <div className="m-4 md:my-8 flex flex-wrap justify-between items-center">
              {Logos &&
                Logos.slice(-6).map((image, index) => {
                  return (
                    <img
                      src={image}
                      key={index}
                      className="m-2 max-w-[100px]"
                      alt=""
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <CommonButton
        onClick={() => setIsModalOpen(true)}
        text="Book an AMA"
        extraClass="mb-10 text-white"
      />

      <TelegramCards />
      <Contact />
      <Footer />
      <ContactModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Home;
