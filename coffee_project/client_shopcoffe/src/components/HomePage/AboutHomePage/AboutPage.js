import React from "react";
import img_about from "../../../access/img/about-img.png";

export default function AboutPage() {
  return (
    <div className="text-black mt-10 px-10">
      <div className="content-contact">
        <h1 className="text-center font-extrabold text-2xl">ABOUT OUT SHOP</h1>
      </div>
      <div className="cus-contact flex mt-10 gap-x-5">
        <div className="title-contact border-none border-transperant  w-1/2">
          <h2 className="text-center text-2xl font-mono pb-5 pt-3">
            Coffee distribution
          </h2>
          <p className="text-xl pl-3 text-left">
            has a more-or-less normal distribution of letters, as opposed to
            using 'Content here, content here', making it look like readable
            English. Many desktop publishing packages and web page editorhas a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editor
          </p>
          <button className=" mt-8 ml-3 text-xl py-2 px-6 text-red-300 border-red-300 hover:text-white hover:bg-red-300 transition-all rounded-lg border-2">
            Read More
          </button>
        </div>
        <div className="img-content w-1/2">
          <img src={img_about} width={800} height={800} alt="" />
        </div>
      </div>
    </div>
  );
}
