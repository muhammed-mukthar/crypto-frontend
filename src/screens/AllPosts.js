import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "../shared/utils";
import FullScreenSpinner from "../components/FullScreenSpinner";

const AllPosts = () => {
  const [latestBanners, setLatestBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadBanners = async () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/banner/all`)
      .then((response) => {
        console.log(response);
        setLatestBanners(response.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadBanners();
  }, []);
  return (
    <div>
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <div className="my-24 text-white max-w-[80%] m-auto">
          <p className="text-left font-semibold text-2xl">Latest Posts</p>
          <div className="flex flex-wrap justify-between">
            {latestBanners &&
              latestBanners.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="my-4 max-w-[320px] shadow-md shadow-black py-2 text-left rounded-md"
                  >
                    {/* <a target={"_blank"} href={`//${image.telegramLink}`}> */}
                    <img
                      src={`${BASEURL}/uploads/${image.imageUrl}`}
                      className="w-[340px] rounded-md"
                      alt=""
                    />
                    <p className="mt-3 text-white px-3 text-lg">
                      {image?.title}
                    </p>
                    <p className="px-3 text-gray-300 text-sm whitespace-pre-line	">
                      {image?.description}
                    </p>
                    {/* </a> */}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
