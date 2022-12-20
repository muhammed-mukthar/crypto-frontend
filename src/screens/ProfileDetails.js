import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import FullScreenSpinner from "../components/FullScreenSpinner";
import Spinner from "../components/Spinner";
import swap from "../shared/swap";
import { BASEURL, Success } from "../shared/utils";
import web3 from "web3";
const ProfileDetails = () => {
  const { account, library } = useWeb3React();
  const [subsAmount, setSubsAmount] = useState("");
  const [profileDetails, setProfileDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();
  const handleLoadProfile = () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/user/profile`)
      .then((response) => setProfileDetails(response.data.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const handleSubsAmount = () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/common/subscriptionAmount`)
      .then((response) => setSubsAmount(response.data.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };
  const handleLoadWallet = () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/common/walletAddress`)
      .then((response) => setWallet(response.data.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleLoadProfile();
    handleSubsAmount();
    handleLoadWallet();
  }, []);

  const buySubscription = async () => {
    axios
      .post(`${BASEURL}/user/buy`)
      .then((response) => console.log(response.data.data))
      .catch((e) => console.log(e));
  };

  const handleSwap = async () => {
    setIsLoading(true);
    const amount = subsAmount;
    const amountToSend = web3.utils.toWei(amount, "ether");

    library.eth
      .sendTransaction({
        from: account,
        to: wallet,
        value: amountToSend,
      })
      .then(async () => {
        await buySubscription();
        setProfileDetails((prev) => ({ ...prev, isSubscribed: true }));
        Success("Transaction Successful");
        navigate("/profile");
        setIsLoading(false);
      })
      .catch((e) => Error("Oops! Something went wrong"));
    // swap.methods
    //   .sendMoney("subscribe", wallet)
    //   .send({
    //     from: account,
    //     value: web3.utils.toWei(subsAmount, "ether"),
    //   })
    //   .then(async () => {
    //     await buySubscription();
    //     Success("Transaction Successful");
    //     navigate("/profile");
    //   })
    //   .catch((e) => Error("Oops! Something went wrong"))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-dark min-h-[400px] md:min-h-[70vh] mt-2 flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-[90%] md:max-w-[700px]">
          <p className="text-xl md:text-4xl text-white mb-5">Your Profile</p>
          {profileDetails?.isSubscribed == false && (
            <CommonButton onClick={handleSwap} text="Buy Subscription" />
          )}
          <div className="p-4 md:p-10 px-4 md:px-8 text-gray-300 m-auto shadow-md shadow-black">
            <div className=" flex-wrap my-2 flex items-center justify-between">
              <p>Name</p>
              <p>{profileDetails.name}</p>
            </div>
            <hr className="my-2 border-b-2 border-gray-600" />
            <div className=" flex-wrap my-2 flex items-center justify-between">
              <p>Email</p>
              <p>{profileDetails.email}</p>
            </div>
            <hr className="my-2 border-b-2 border-gray-600" />
            <div className=" flex-wrap my-2 flex items-center justify-between">
              <p>Phone Number</p>
              <p>{profileDetails.phoneNo}</p>
            </div>
            <hr className="my-2 border-b-2 border-gray-600" />
            <div className=" flex-wrap my-2 flex items-center justify-between">
              <p>Prime</p>
              <p>
                {profileDetails?.isSubscribed
                  ? "Activated"
                  : "Not a prime user"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
