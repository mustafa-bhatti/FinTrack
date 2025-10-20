import React from "react";
import { PiChartPieSliceFill } from "react-icons/pi";
import { HiCurrencyDollar } from "react-icons/hi";
import { IoTimer } from "react-icons/io5";
function Features() {
  return (
    <div
      className="flex flex-col align-center justify-center pt-[90px] pb-[90px]"
      id="features"
    >
      <h2 className="text-center text-3xl mb-[20px] font-semibold">Features</h2>
      <div className="flex align-center justify-center gap-10 ml-[50px] mr-[50px] mt-[50px] mb-[50px]">
        <div className=" flex flex-col gap-4 align-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer bg-gray-100 hover:inset-shadow-sm hover:shadow-xl/20  hover:bg-blue-400 hover:text-white ">
          <div className="flex align-center justify-center">
            <PiChartPieSliceFill
              color="yellow"
              size="100px"
              className="mt-[-50px] bg-gray-300 rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7">
            <h1 className="font-semibold  text-xl">Feature1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              natus tempora reiciendis?
            </p>
          </div>
        </div>
        <div className=" flex flex-col gap-4 align-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer bg-gray-100 hover:inset-shadow-sm hover:shadow-xl/20  hover:bg-blue-400 hover:text-white">
          <div className="flex align-center justify-center ">
            <HiCurrencyDollar
              color="green"
              size="100px"
              className="mt-[-50px] bg-gray-300 rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7">
            {" "}
            <h1 className="font-semibold text-xl">Feature2</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              natus tempora reiciendis?
            </p>
          </div>
        </div>
        <div className=" flex flex-col gap-4 align-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer bg-gray-100 hover:inset-shadow-sm hover:shadow-xl/20 hover:bg-blue-400 hover:text-white">
          <div className="flex align-center justify-center">
            <IoTimer
              color="blue"
              size="100px"
              className="mt-[-50px] bg-gray-300 rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7">
            {" "}
            <h1 className="font-semibold text-xl">Feature3</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              natus tempora reiciendis?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
