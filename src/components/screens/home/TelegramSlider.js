import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { TELEGRAM_FILE_URL } from "../../../shared/utils";
import { responsive } from "../../../shared/constants";

const Simple = ({ images }) => {
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
      {images &&
        images.map((image, index) => {
          let srcImg = `${TELEGRAM_FILE_URL}/${image?.file?.file_path}`;
          return (
            <div className="my-4 m-4">
              key={index}
              <img
                draggable={false}
                style={{ maxWidth: "100%", height: "auto", maxHeight: "170px" }}
                src={srcImg}
                alt="something"
                className="w-[340px] rounded-md"
              />
              <div>
                <p className="px-3 text-gray-300 text-md mt-2">
                  {image?.caption}
                </p>
              </div>
            </div>
          );
        })}
    </Carousel>
  );
};

export default Simple;
