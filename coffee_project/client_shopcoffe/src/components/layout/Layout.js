import React from "react";
import Header from "../HomePage/HeaderHomePage/Header.js";
import Footer from "../HomePage/FooterHomePage/Footer.js";

export default function layout({ Component }) {
  return (
    <div>
      <Header />
      <Component />
      <Footer />
    </div>
  );
}
