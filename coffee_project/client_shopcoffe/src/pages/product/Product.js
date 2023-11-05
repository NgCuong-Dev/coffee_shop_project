import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Link } from "react-router-dom";
import Anh1 from "../../access/img/blog-img1.png";
import Anh2 from "../../access/img/blog-img2.png";
import { getCartFromLS, setCartFromLS } from "../../utils/utils";
import { AppContext } from "../../contexts/app.context";
import {
  getAllCategory,
  getAllProduct,
  getPayment,
  getProductByCategory,
} from "../../apis/product.api";

export default function Product() {
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState([]);
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ["category", 19],
    queryFn: () => {
      return getAllCategory({
        page: 1,
      });
    },
    onSuccess: (data) => {
      setStaff(data.data);
    },
    cacheTime: 30000,
  });
  const mutation = useMutation((slug) => {
    return getProductByCategory({
      limit: 8,
      slugCategory: slug,
    });
  });
  const handleSelectSlug = (slug) => {
    mutation.mutate(slug, {
      onSuccess: (data) => {
        setData(data.data[0].products);
      },
    });
  };
  return (
    <div className="pb-10 border-b">
      <div className="px-5 pt-10 md:px-3 lg:px-3 grid grid-cols-5 gap-x-8 md:max-w-[1180px] mx-auto">
        <div className="col-span-5 pl-5 lg:col-span-1">
          <div className="mb-6">
            <h3 className="uppercase text-[14.6px] font-semibold mb-5">
              Category
            </h3>
            <ul className="flex flex-col gap-y-3 text-[13.6px] text-[rgba(0,0,0,0.79)]">
              {staff?.length !== 0 &&
                staff?.map((itemLi, indexLi) => (
                  <li
                    key={indexLi}
                    onClick={() => handleSelectSlug(itemLi.slugCategory)}
                    className="uppercase cursor-pointer"
                  >
                    {itemLi.nameCategory}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <ProductLinkItem data={data} />
      </div>
    </div>
  );
}

const ProductLinkItem = ({ data }) => {
  const { setCart } = React.useContext(AppContext);
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    setStaff(data);
  }, [data]);
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ["product", 20],
    queryFn: () => {
      return getAllProduct();
    },
    onSuccess: (data) => {
      setStaff(data.data.Products);
    },
    cacheTime: 30000,
  });

  // const [cart, setCart] = useState(getCartFromLS())
  const [showProductButton, setShowProductButton] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(staff?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = staff?.slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  const [cartState, _] = React.useState(getCartFromLS());

  const handleAddToCart = (product) => {
    if (product) {
      const productNew = { ...product, quantity: 1 };
      const updatedCart = [...cartState];
      updatedCart.push(productNew);
      setCartFromLS(updatedCart);
      setCart(updatedCart);
    }
  };
  return (
    <div className="col-span-5 gap-y-4 gap-x-6 lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-5 gap-y-4 gap-x-6 lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentData.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product.slug}`}>
              <div className="rounded-xl h-[200px]  overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt="ImgBanner"
                />
              </div>
            </Link>
            <h3 className="uppercase text-sm line-clamp-1 font-semibold text-center pt-3">
              {product.title}
            </h3>
            <p className="text-[14px] text-center mt-2">
              {formatCurrency(product.price)}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="text-[#515151] leading-3 my-5 text-sm transition-all duration-200 bg-[#ebe9eb] hover-bg-[#dfdcde] rounded-full py-2 pb-3 px-3"
              >
                Add to cart
              </button>
            </div>
            {showProductButton[product._id] && (
              <div className="pb-3 flex justify-center">
                <Link to="/gio-hang">
                  <a className="text-[#515151] leading-3 my-1 text-sm transition-all duration-100 bg-[#ebe9eb] hover-bg-[#dfdcde] rounded-full py-1 pb-2 px-3">
                    Xem sản phẩm
                  </a>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <nav
        aria-label="Page navigation example"
        className="col-span-5 px-auto w-max mx-auto text-center mt-3 flex justify-center"
      >
        <ul className="flex items-center -space-x-px h-6 md:h-10 text-base">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center gap-x-1 justify-center px-2 md:px-4 h-6 md:h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700  "
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="leading-4">Previous</span>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={
                currentPage === index + 1
                  ? "z-10 flex items-center justify-center px-4 h-10 leading-tight  border   bg-gray-100 border-gray-300 text-gray-700 "
                  : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center gap-x-1 justify-center px-4 h-6 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            <span className="leading-4">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </ul>
      </nav>
    </div>
  );
};
