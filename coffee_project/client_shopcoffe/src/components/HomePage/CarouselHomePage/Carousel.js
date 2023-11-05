import React from "react";
import icon from "../../../access/img/bulit-icon.png";
import { Card } from "antd";
import { data } from "./DataCarousel.js";
const { Meta } = Card;

export default function Carousel() {
  return (
    <div>
      <h1 className=" italic font-extrabold text-center text-2xl text-black">
        OUR COFFEE OFFER
        <img className="mx-auto mt-3" src={icon} alt="icon" />
      </h1>
      <div className="grid grid-cols-4 text-center gap-6 mt-10">
        {data.map((item, index) => {
          return (
            <div className="text-black">
              <Card
                key={item.id}
                className="hover:shadow-lg hover:-translate-y-1 transition-all"
                hoverable
                style={{
                  width: 250,
                  borderRadius: "20px",
                }}
                cover={<img alt="example" src={item.img} />}
              >
                <Meta title={item.title} description={item.content} />
              </Card>
              <button className="px-10 py-2 mt-4 text-red-400 hover:bg-red-400 transition duration-300 ease-in-out  rounded-lg hover:text-white border-2 border-red-200">
                Read More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
