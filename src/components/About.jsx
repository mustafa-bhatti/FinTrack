import React from "react";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col text-center align-center justify-center pt-[90px] pb-[90px]"
    >
      <h2 className="text-center text-3xl mb-[20px] font-semibold">About Us</h2>
      <div className="flex align-center justify-center">
        <div className="w-[50%]">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            accusantium quas quasi error iste ducimus velit facilis provident
            hic, animi aspernatur aperiam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aperiam aut incidunt veritatis vero
            nisi praesentium, atque tempora temporibus nulla quis fugit
            repellendus ea non ipsum doloremque impedit cupiditate itaque
            voluptatibus.
          </p>
        </div>
        <div>
          <video src="/public/about-video.mp4"></video>
        </div>
      </div>
    </div>
  );
}

export default About;
