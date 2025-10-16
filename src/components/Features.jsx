import React from "react";

function Features() {
  return (
    <div
      className="flex flex-col align-center justify-center pt-[90px] pb-[90px] "
      id="features"
    >
      <h2 className="text-center text-3xl mb-[20px] font-semibold">Features</h2>
      <div className="flex align-center justify-center gap-10 ml-[50px] mr-[50px]">
        <div className="bg-white flex flex-col gap-4 align-center justify-center text-center pt-[70px] pb-[70px] pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer hover:inset-shadow-sm hover:shadow-xl/20">
          <div className="flex align-center justify-center">
            <img src="" alt="cardImg" />
          </div>
          <h1 className="font-semibold  text-xl">Feature1</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            natus tempora reiciendis?
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 align-center justify-center text-center pt-[50px] pb-[50px] pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer hover:inset-shadow-sm hover:shadow-xl/20">
          <div className="flex align-center justify-center ">
            <img src="" alt="cardImg" />
          </div>
          <h1 className="font-semibold text-xl">Feature2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            natus tempora reiciendis?
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 align-center justify-center text-center pt-[50px] pb-[50px] pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer hover:inset-shadow-sm hover:shadow-xl/20">
          <div className="flex align-center justify-center">
            <img src="" alt="cardImg" />
          </div>
          <h1 className="font-semibold text-xl">Feature3</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            natus tempora reiciendis?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
