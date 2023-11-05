import React, { useState } from "react";
import Anh1 from "../../access/img/blog-img1.png";
import { getCartFromLS, setCartFromLS } from "../../utils/utils";
import { AppContext } from "../../contexts/app.context";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct } from "../../apis/product.api";

const ProductDetail = () => {
  return (
    <div>
      <MainProduct></MainProduct>
    </div>
  );
};

const MainProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState();
  console.log(product);
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ["product", 21],
    queryFn: () => {
      return getProduct(slug);
    },
    onSuccess: (data) => {
      setProduct(data.data);
    },
    cacheTime: 30000,
  });

  const [quantity, setQuantity] = React.useState(1);
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  const { setCart } = React.useContext(AppContext);
  const [cartState, _] = React.useState(getCartFromLS());
  const handleAddToCart = () => {
    if (product) {
      const productNew = { ...product, quantity: quantity };
      const updatedCart = [...cartState];
      updatedCart.push(productNew);
      setCartFromLS(updatedCart);
      setCart(updatedCart);
    }
  };

  return (
    <div className="px-3 lg:px-0 max-w-[1180px] mx-auto">
      {/* {showCart && (
        <div className="bg-[#f6f5f8] mt-3 pt-5 pb-5 flex justify-between px-4 gap-x-2">
          <div className="flex items-center">
            {product ? `${product.title} đã được thêm vào giỏ hàng.` : ""}
          </div>
          <Link to="/gio-hang">
            <button className="bg-[#cacaca] w-[200px] h-[40px] rounded-md">
              Xem giỏ hàng
            </button>
          </Link>
        </div>
      )} */}
      {product && (
        <div className="flex pt-7 flex-col md:grid md:grid-cols-2 md:gap-x-10">
          <div className="rounded-xl h-[570px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={product.image}
              alt="ImgBanner"
            />
          </div>
          <div className="lg:px-3">
            <h2 className="text-[19px] mt-10 mb-7 font-semibold uppercase md:mt-0">
              {product.title}
            </h2>
            <div className="flex text-sm pb-4 gap-x-1 text-[21px]">
              {/* {product.priceOld ||
                (product.priceOld > 0 && (
                  <div className="relative">
                    <span className="text-[#FFABAB] font-bold">
                      {formatCurrency(product.priceOld)}
                    </span>
                    <div className="absolute w-full h-[2px] top-[50%] bg-[#FFABAB]"></div>
                  </div>
                ))} */}
              {product.priceOld && (
                <div className="relative">
                  <span className="text-red-400 font-bold">
                    {formatCurrency(product.priceOld)}
                  </span>
                  <div className="absolute w-full h-[2px] top-[50%] bg-red-400"></div>
                </div>
              )}
              <div className="relative">
                <span className="font-bold">
                  {formatCurrency(product.price)}
                </span>
                <div className="absolute w-full h-[2px] bottom-[-1px] bg-black"></div>
              </div>
            </div>
            <p className="text-sm">{product.description}</p>
            <div className="flex gap-x-3 pt-2">
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-[10%] border p-2 focus:border-black rounded-md"
                type="number"
              />
              <button
                onClick={handleAddToCart}
                className="bg-black w-full text-white hover:opacity-80 rounded-md"
              >
                Add to cart
              </button>
            </div>
            <div className="flex flex-col gap-y-3 mt-5">
              {/* <Collapse /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
