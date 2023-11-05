import React from "react";

export default function ContactPage() {
  return (
    <div className="text-red-200" style={{ height: "50vh" }}>
      <h1 className="font-extrabold text-3xl pb-4 text-center text-black">
        CONTACT US
      </h1>
      <form
        action=""
        style={{ maxWidth: "800px" }}
        className="grid grid-cols-1 mx-auto"
      >
        <input
          type="text"
          className="mail-text w-full text-xl text-black py-2 mt-6 px-20 border-2 rounded-lg text-center"
          placeholder="Your Mail"
        />
        <input
          type="text"
          className="mail-text w-full text-xl text-black py-2 mt-6  px-20 border-2 rounded-lg text-center"
          placeholder="Your Email"
        />
        <input
          type="text"
          className="mail-text w-full text-xl text-[#2e2e2] py-2 mt-6  px-20 border-2 rounded-lg text-center"
          placeholder="Your Phone"
        />
        <textarea
          type="text"
          className="mail-text w-full text-xl text-[#2e2e2] py-2 mt-6  px-20 border-2 rounded-lg text-center"
          placeholder="Your Messages"
        />
        <input type="text" className="mail-text" />
        <div className="send-bt">
          <button className="bg-slate-600 text-white py-2 px-8 rounded-lg font-medium flex justify-center items-center mx-auto">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
