import React from "react";
import contact_bg from "../../../access/img/client-bg.png";
export default function InfoPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${contact_bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="text-black w-full"
    >
      <h1 className="text-black text-center mt-20 pt-20 font-extrabold text-3xl mb-10">
        WHAT SYAS CUSTOMERS
      </h1>
      <div className="contact-list container space-y-3">
        <div className="item-contact flex justify-center">
          <div className="img-contact">
            <img
              src="/images/client-img1.png"
              width={150}
              height={150}
              alt=""
            />
          </div>
          <div className="title-contact ml-3">
            <h2 className="text-black font-bold text-2xl">Yoy Moark</h2>
            <div>
              <p>
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' <br /> will uncover many web sites still in
                their infancynow use Lorem Ipsum as their <br /> default model
                text,
              </p>
            </div>
          </div>
        </div>
        <div className="item-contact flex justify-center">
          <div className="img-contact">
            <img
              width={150}
              height={150}
              src="/images/client-img2.png"
              alt=""
            />
          </div>
          <div className="title-contact ml-3">
            <h2 className="text-black font-bold text-2xl">Mihacal</h2>
            <div>
              <p>
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' <br /> will uncover many web sites still in
                their infancynow use Lorem Ipsum as their <br /> default model
                text,
              </p>
            </div>
          </div>
        </div>
        <div className="item-contact flex justify-center">
          <div className="img-contact">
            <img
              src="/images/client-img1.png"
              width={150}
              height={150}
              alt="#"
            />
          </div>
          <div className="title-contact ml-3">
            <h2 className="text-black font-bold text-2xl">Uliya den</h2>
            <div>
              <p>
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' <br /> will uncover many web sites still in
                their infancynow use Lorem Ipsum as their <br /> default model
                text,
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
