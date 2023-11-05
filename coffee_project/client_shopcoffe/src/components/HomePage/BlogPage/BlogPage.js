import React from "react";
import { Card } from "antd";
const { Meta } = Card;

export default function BlogPage() {
  return (
    <div>
      <h1 className="font-extrabold text-center mt-20 text-black text-2xl">
        OUR BLOG
      </h1>
      <div className="list-blog flex justify-center space-x-6 mt-20 mx-auto">
        <div className="left-blog ">
          <Card
            hoverable
            className="hover:shadow-lg hover:-translate-y-1 transition-transform"
            style={{
              width: 500,
            }}
            cover={<img alt="example" src="./images/blog-img1.png" />}
          >
            <Meta
              title="PREP TECHNIQUES COFFEE"
              description="distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a moredistracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more"
            />
          </Card>
          <div className="flex justify-center pt-4">
            <button className="py-2 px-8 border-2 border-red-300 rounded-lg text-red-400 hover:bg-red-400 transition-all hover:text-white">
              Read More
            </button>
          </div>
        </div>
        <div className="right-blog">
          <Card
            hoverable
            className="hover:shadow-lg hover:-translate-y-1 transition-transform"
            style={{
              width: 500,
            }}
            cover={
              <img alt="PREP TECHNIQUES COFFEE" src="./images/blog-img2.png" />
            }
          >
            <Meta
              title="Europe Street beat"
              description="distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a moredistracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more"
            />
          </Card>
          <div className="flex justify-center pt-4">
            <button className="py-2 px-8 border-2 border-red-300 rounded-lg text-red-400 hover:bg-red-400 transition-all hover:text-white">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
