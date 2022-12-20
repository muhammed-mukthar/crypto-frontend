import React, { useEffect, useState } from "react";
import CommonButton from "../components/CommonButton";
import { BASEURL, Error, Success } from "../shared/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../components/FullScreenSpinner";

const SubscriptionPrice = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");

  const handleSubsAmount = () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/common/subscriptionAmount`)
      .then((response) => setSubscriptionPrice(response.data.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    handleSubsAmount();
  }, []);

  const saveSubscriptionPrice = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post(`${BASEURL}/common/`, {
        name: "subscriptionAmount",
        value: amount,
      });
      Success("Success");
      setSubscriptionPrice(amount);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      Error(e.response.data.message);
      setIsLoading(false);
    }
  };

  const inputClass =
    "border-2 h-12 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2";
  return (
    <div className="bg-dark text-white  min-h-screen flex flex-col justify-center items-center">
      <div className="w-[80%] md:w-[400px] m-auto text-left ">
        {subscriptionPrice && (
          <p className="font-bold text-lg">
            Subscription Price - {subscriptionPrice} BNB
          </p>
        )}
        <div className="mt-4 pt-1">
          <label className="text-sm mb-2 text-left" htmlFor="email">
            Subscription Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            className={inputClass}
          />
        </div>

        {isLoading && <FullScreenSpinner />}
        <CommonButton
          disable={!amount}
          onClick={saveSubscriptionPrice}
          text="Save"
          bg="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default SubscriptionPrice;
