import React from "react";
import Delivery from "../assets/img/delivery.png";
import HeroBg from "../assets/img/heroBg.png";
import I1 from "../assets/img/i1.png";
import { heroImgData } from "../utils/dataHelper";

const HomeContainer = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-2 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden  drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide">
          We are delivering in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Baner
          </span>
        </p>
        <p
          className="text-base text-center md:text-left md:w-[80%]"
          style={{ color: "var(--text-color)" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod,
          reprehenderit accusantium eos odio atque maxime commodi id amet,
          delectus impedit perspiciatis unde eum fuga veniam et quae mollitia
          debitis omnis?
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-300 to-orange-600 w-full md:w-auto px-4 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 cursor-pointer"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="ml-auto h-[370px] w-full lg:w-auto lg:h-[580px]"
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroImgData &&
            heroImgData.map((item) => (
              <div
                key={item.id}
                className="lg:w-[190px] min-w-[150px] lg:min-w-[190px] p-4 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                style={{ backgroundColor: "var(--card-overlay)" }}
              >
                <img
                  src={item.imgSrc}
                  className="w-20 lg:w-40 -mt-14 lg:-mt-20"
                  alt={item.name}
                />
                <p
                  className="text-base lg:text-lg font-semibold mt-2"
                  style={{ color: "var(--heading-color)" }}
                >
                  {item.name}
                </p>
                <p
                  className="text-md font-semibold my-1.5"
                  style={{ color: "var(--text-color)" }}
                >
                  Rs. {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
