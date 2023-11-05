import React from "react";
import footer_bg from "../../../access/img/footer-bg.png";
import {
  FaInstagram,
  FaGoogleDrive,
  FaGitlab,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div
      className="mt-4"
      style={{
        height: "80vh",
        backgroundImage: `url(${footer_bg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="foot-content text-white text-center translate-y-20 space-y-10 ">
        <h2 className="mx-auto text-center text-3xl font-bold ">Address</h2>
        <p className="text-xl pb-10">
          here, content here', making it look like readable English. Many
          desktop publishing <br /> packages and web page editors now use
        </p>
        <span className="text-xl flex flex-col">
          <a href="Tel:0839170198"> Mr.Cường:+84 839170198</a>
          <a href="Email:Cuongtc981@gmail.com"> Email:Cuongtc981@gmail.com</a>
        </span>
        <div
          className="flex justify-between items-center px-10"
          style={{ height: "80px", width: "100%", background: "#d07d6b" }}
        >
          <div className="footer-content">
            <p>2023 All Rights Reserved. Design by Free Html Templates</p>
          </div>
          <div className="foot-icon flex space-x-4 text-2xl">
            <span className="border-2 px-2 py-2 rounded-full text-blue-500 bg-white">
              <FaFacebook />
            </span>
            <span className="border-2 px-2 py-2 rounded-full text-black bg-gradient-to-r from-red-500  to-cyan-200">
              <FaGoogleDrive />
            </span>
            <span className="border-2 px-2 py-2 rounded-full text-red-600 bg-gradient-to-r from-white to-slate-400">
              <FaInstagram />
            </span>
            <span className="border-2 px-2 py-2 rounded-full text-orange-500 bg-gradient-to-r from-teal-400 to-blak to-white">
              <FaGitlab />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
