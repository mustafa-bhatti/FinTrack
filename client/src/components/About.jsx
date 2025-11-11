import React from "react";
import videoOfAbout from "../assets/about-video.mp4";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col text-center align-center justify-center pt-[90px] pb-[90px] max-md:m-[auto] max-md:pt-[100px] pb-[100px] "
    >
      <h2 className="text-center text-3xl mb-[15px] font-semibold max-md: mb-[0px]">
        About Fintrack
      </h2>
      <div className="flex align-center justify-evenly  max-md:flex-col">
        <div className="w-[40%] flex align-center justify-left mt-[40px] text-left  max-md:w-auto max-md: justify-center max-md:pl-[10px] pr-[10px] md:pl-[10px]">
          <div className="leading-8 text-gray-700">
            <h3 className="text-green-600 font-bold text-xl mb-4">Your Complete Financial Management Solution</h3>
            
            <p className="mb-4">
              <span className="text-green-600 font-semibold">FinTrack</span> is a comprehensive personal finance platform designed to give you complete control over your financial life. Our mission is to make financial management accessible, intuitive, and empowering for everyone.
            </p>

            <h4 className="font-semibold text-gray-800 mb-2">🎯 Key Features:</h4>
            <ul className="mb-4 space-y-1 text-sm">
              <li>• <strong>Real-time Transaction Tracking</strong> - Monitor income and expenses instantly</li>
              <li>• <strong>Visual Analytics</strong> - Interactive charts and reports for better insights</li>
              <li>• <strong>Secure Authentication</strong> - JWT-based security with email verification</li>
            </ul>
          </div>
        </div>

        <div className="m-2.5 md:mt-[45px]">
          <video
            loop
            autoPlay
            muted
            playsInline
            className="w-[450px] rounded-xl shadow-lg"
          >
            <source src={videoOfAbout} />
          </video>
        </div>
      </div>
    </div>
  );
}

export default About;
