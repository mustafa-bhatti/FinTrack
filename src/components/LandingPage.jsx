import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Features from "./Features";
import Hero from "./Hero";
import Footer from "./Footer";
import About from "./About";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
    </>
  );
}

export default LandingPage;
