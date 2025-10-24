import React from "react";
import videoOfAbout from "../assets/about-video.mp4";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col text-center align-center justify-center pt-[90px] pb-[90px] max-md:m-[auto] max-md:pt-[100px] pb-[100px] "
    >
      <h2 className="text-center text-3xl mb-[15px] font-semibold max-md: mb-[0px]">
        About Us
      </h2>
      <div className="flex align-center justify-evenly  max-md:flex-col">
        <div className="w-[40%] flex align-center justify-left mt-[40px] text-left  max-md:w-auto max-md: justify-center max-md:pl-[10px] pr-[10px] md:pl-[10px]">
          <p className="leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            accusantium quas quasi error iste ducimus velit facilis provident
            hic, animi aspernatur aperiam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aperiam aut incidunt veritatis vero
            nisi praesentium, atque tempora temporibus nulla quis fugit
            repellendus ea non ipsum doloremque impedit cupiditate itaque
            voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nulla natus reprehenderit hic beatae, incidunt mollitia iste
            quasi, atque repudiandae porro quisquam tempora, harum autem
            corrupti nihil laudantium. Numquam provident odit incidunt magni
            ipsam.
          </p>
        </div>

        <div className="m-[10px] md:mt-[45px]">
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
