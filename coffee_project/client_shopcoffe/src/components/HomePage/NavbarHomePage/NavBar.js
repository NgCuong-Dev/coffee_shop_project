import React from "react";
import coffee from "../../../access/img/banner-img.png";

export default function NavBar() {
  return (
    <div
      style={{ backgroundColor: "black", height: "80vh" }}
      className="flex justify-between items-center px-10"
    >
      <div className="text-4xl">
        <h1 className="ml-20 mb-30 font-semibold">
          <span className="text-yellow-200">
            FRESH COFFEE IN <br />
            THE MORNING
          </span>
          <p className="text-xl pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Error commodi earum dolor alias cumque eveniet <br /> ullam animi
            voluptate magni deserunt.
          </p>
        </h1>
        <button className="text-xl px-5 py-2 bg-gradient-to-r hover:bg-gradient-to-bl hover:from-pink-500 hover:to-purple-500 from-purple-500 transition-all to-pink-500 ml-20 rounded-2xl mt-10">
          Get it nows
        </button>
      </div>
      <div className="mr-20">
        <img src={coffee} alt="#" width={350} height={350} />
      </div>
    </div>
  );
}
