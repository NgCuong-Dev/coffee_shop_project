import React from "react";
import NavBar from "../components/HomePage/NavbarHomePage/NavBar.js";
import Carousel from "../components/HomePage/CarouselHomePage/Carousel.js";
import AboutPage from "../components/HomePage/AboutHomePage/AboutPage.js";
import ContactPage from "../components/HomePage/ContactPage/ContactPage.js";
import InfoPage from "../components/HomePage/InfoPage/InfoPage.js";
import MapPage from "../components/HomePage/MapPage/MapPage.js";
import BlogPage from "../components/HomePage/BlogPage/BlogPage.js";

export default function HomePage() {
  return (
    <div className="text-white">
      <NavBar />
      <div className="flex mt-4 justify-center ">
        <Carousel />
      </div>
      <AboutPage />
      <BlogPage />
      <InfoPage />
      <div className="mt-20" style={{ height: "80vh" }}>
        <ContactPage />
      </div>
      <MapPage />
    </div>
  );
}
