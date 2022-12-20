// import "semantic-ui-css/semantic.min.css";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { BASEURL } from "../../../shared/utils";
import { responsive } from "../../../shared/constants";
import { useNavigate } from "react-router-dom";

const LatestPosts = ({ latestBanners }) => {
  const navigate = useNavigate();
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {latestBanners &&
        latestBanners.map((image, i) => {
          return (
            <div
              key={i}
              onClick={() => navigate("/all-posts")}
              className="my-4 cursor-pointer shadow-md shadow-black py-2 text-left rounded-md m-4"
            >
              <img
                src={`${BASEURL}/uploads/${image.imageUrl}`}
                className="rounded-md"
                alt=""
              />
              <div>
                <p className="mt-3 px-3 text-lg ">{image?.title}</p>
                <p className="px-3 text-gray-300 whitespace-pre-line text-md mt-2">
                  {image?.description?.substring(0, 90)}...
                </p>
              </div>
            </div>
          );
        })}
    </Carousel>
  );
};

export default LatestPosts;
