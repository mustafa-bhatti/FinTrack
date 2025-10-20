import React from "react";
import videoOfAbout from "../assets/about-video.mp4";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col text-center align-center justify-center pt-[90px] pb-[90px]"
    >
      <h2 className="text-center text-3xl mb-[20px] font-semibold">About Us</h2>
      <div className="flex align-center justify-evenly">
        <div className="w-[40%] flex align-center justify-left mt-[40px] text-left">
          <p>
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

        <div>
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
