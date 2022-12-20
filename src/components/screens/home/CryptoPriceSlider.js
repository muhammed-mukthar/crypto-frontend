import React, { useCallback, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { coinCardResponsive, responsive } from "../../../shared/constants";
// import { BASEURL } from "../../../shared/utils";
// import { useNavigate } from "react-router-dom";
const CryptoPrices = ({ coinsData }) => {
    let percentageChange = (data) => {
        let value = parseFloat(data?.market_cap_change_percentage_24h).toFixed(2);
        return value > 0 ? `+${value}` : value;
    }

    let priceValue = (price)=>{
        let value = parseFloat(price).toFixed(2);
        return value
    }

    // const navigate = useNavigate();
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
            responsive={coinCardResponsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {coinsData &&
                coinsData.map((data, i) => {
                    return (
                        <div key={data?.id}
                            className="cursor-pointer shadow-md shadow-black bg-[#151419] text-left font-medium rounded-[26px] m-2 md:m-4 lg:m-8">
                            {/* <div className="p-0 md:p-6 rounded-md"> */}
                                <div className="bg-[#1f232e] rounded-[20px] p-6 md:p-4 lg:p-8 grid grid-row-4 gap-1">
                                    <img src={data?.image} className="rounded-full w-10" alt="" />
                                    <div className="grid grid-cols-6">
                                        <div className="mt-4 col-span-4">{data?.name}</div>
                                        <div className="mt-2 text-xs col-span-2 align-middle rounded-[16px] bg-[#17af89] px-3 py-2 max-w-fit">
                                            {percentageChange(data)}%
                                        </div>
                                    </div>
                                    <div className="mt-4">{priceValue(data?.current_price)} USD</div>
                                </div>
                            {/* </div> */}
                        </div>
                    );
                })}
        </Carousel>
    );
};

export default CryptoPrices;
