// import "semantic-ui-css/semantic.min.css";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { BASEURL } from "../../../shared/utils";
import { responsive } from "../../../shared/constants";
import { useNavigate } from "react-router-dom";
import Banner1 from "../../../assets/images/ama.png";
import Banner2 from "../../../assets/images/Gaming.png";
import Banner3 from "../../../assets/images/Educational.png";
import Banner4 from "../../../assets/images/Giveaway.png";
const SignalPosts = () => {
  const banners = [Banner1, Banner2, Banner3, Banner4];

  const navigate = useNavigate();
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
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
      {banners &&
        banners.map((image, i) => {
          return (
            <div
              key={i}
              className="my-4 cursor-pointer shadow-md shadow-black text-left
             rounded-md m-4"
            >
              <img src={image} className="rounded-md" alt="" />
            </div>
          );
        })}
    </Carousel>
  );
};

export default SignalPosts;
