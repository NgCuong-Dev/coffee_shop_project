import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCartFromLS,
  setCartFromLS,
  setProfileFromLS,
} from "../../utils/utils";
import QRMomo from "../../access/img/momo.jpg";
import axios from "axios";
import { AppContext } from "../../contexts/app.context";
import { useQuery } from "react-query";
import { getPayment } from "../../apis/product.api";

export const OrderPayment = () => {
  const formRef = useRef(null);
  const { setCart } = useContext(AppContext);

  const navigate = useNavigate();
  const [payment, setPayments] = useState([]);
  const location = useLocation();
  const isPayment = location.state?.paymentMethod;
  const code = location.state?.code;
  const carts = getCartFromLS();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
    tinh: "",
    quan: "",
    xa: "",
    mota: "",
    isPayment: false,
    Sum: 0,
    soDon: 0,
    quantity: 0,
    code: "",
    products: [...carts],
  });
  const [randomCountdown, setRandomCountdown] = useState(180);
  const decrementRandomCountdown = () => {
    if (randomCountdown > 0) {
      setRandomCountdown(randomCountdown - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(decrementRandomCountdown, 1000);
    if (randomCountdown === 0) {
      navigate("/product");
      localStorage.setItem("cart", JSON.stringify([]));
    }
    return () => {
      clearInterval(interval);
      // setCartFromLS([]);
      // setCart([]);
    };
  }, [randomCountdown, navigate]);

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const axiosInstance = axios.create({
    timeout: 4000,
  });
  useEffect(() => {
    fetch('http://localhost:4001/api/v1/payment/get-payment')
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.payments)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy sản phẩm từ API', error)
      })
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formState.email)) {
      alert("Email không hợp lệ. Vui lòng nhập email hợp lệ.");
    } else {
      try {
        console.log(formState);
        const jsonData = JSON.stringify(formState);
        // const response = await axiosInstance.post('https://api-glory365.onrender.com/api/v1/order/create', jsonData, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // if (response.status === 200) {
        //   alert('Đặt hàng thành công')
        //   localStorage.setItem('cart', JSON.stringify([]))
        //   if (formState.isPayment) {
        //     navigate('/order-payment')
        //   } else {
        //     navigate('/gio-hang')
        //     setFormState({
        //       name: '',
        //       email: '',
        //       phone: '',
        //       note: '',
        //       tinh: '',
        //       quan: '',
        //       xa: '',
        //       mota: '',
        //       isPayment: false,
        //       Sum: 0,
        //       soDon: 0,
        //       code: '',
        //       quantity: 0,
        //       products: []
        //     })
        //   }
        // }
      } catch (error) {
        console.error("Lỗi từ phía server:", error);
        alert("Có lỗi xảy ra khi gửi thông tin");
      }
    }
  };
  function calculateTotalPrice(data) {
    let total = 0;
    for (const product of data) {
      const price = parseFloat(product.price);
      const quantity = parseFloat(product.quantity);
      total += price * quantity;
    }
    return total;
  }
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  const totalPrice = calculateTotalPrice(carts);
  // const uniqueCode = carts.length > 0 ? carts[0].code : "";
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const firstItem = carts[0];
  const [listPay, setListPay] = useState([]);
  console.log(listPay);
  const { isLoading } = useQuery({
    queryKey: ["payment", 11],
    queryFn: () => {
      return getPayment();
    },
    onSuccess: (data) => {
      setListPay(data.data.payments);
    },
    cacheTime: 30000,
  });
  return (
    <div className="p-3 pb-10 border-b">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="false"
        action="#"
        className="max-w-[1180px] mx-auto md:grid md:grid-cols-1 gap-x-8"
      >
        <div>
          <h3 className="pt-6 text-center text-[25px] font-semibold">
            PAYMENT
          </h3>
          <h3 className="pt-3 mt-3 mb-1 text-[16px]">
            Thank you. Your order has been received
          </h3>
          {isPayment && (
            <h3
              style={{ color: "red" }}
              className="pt-1 mt-1 mb-1 color-red text-[16px]"
            >
              Please pay later {randomCountdown} second{" "}
            </h3>
          )}
          <div className="md:translate-y-6 mt-1 pt-3 mb-8 w-[80%] flex gap-x-10">
            <table className="text-[12px] table-auto text-left w-full md:mt-auto">
              <thead>
                <tr>
                  <th className="p-2 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                    Code orders
                  </th>
                  <th className="p-2 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                    Day
                  </th>
                  <th className="p-2 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                    Total
                  </th>
                  <th className="p-2 uppercase py-2">Transfer method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-dashed border-r-2 border-r-gray-950 font-bold text-left p-3 bg-slate-100">
                    {/* {firstItem.code} */}
                    {code}
                  </td>
                  <td className="border-dashed border-r-2 border-r-gray-950 font-bold text-left p-3 bg-slate-100">
                    {formattedDate}
                  </td>
                  <td className="border-dashed border-r-2 border-r-gray-950 font-bold text-left p-3 bg-slate-100">
                    {formatCurrency(totalPrice)}
                  </td>
                  <td className="font-bold text-left p-3 bg-slate-100">
                    {isPayment && "Bank transfer"}
                    {!isPayment && "Payment on delivery"}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                setCartFromLS([]);
                setCart([]);

                navigate("/product");
              }}
              className="py-2 px-4 bg-red-400 font-bold text-white rounded-lg"
            >
              Confirm{" "}
            </button>
          </div>
        </div>
        {isPayment && (
          <div>
            <h3 className="pt-1 mt-2 text-[24px] font-semibold">
              Bank transfer information
            </h3>
            <h2 className="pt-1 mt-2 text-[29px] font-bold">DozeCafe</h2>
            {listPay.length !== 0 &&
              listPay.map((item, idex) => (
                <div
                  key={idex}
                  className="md:translate-y-6 pt-5 mb-8 w-full lg:flex gap-x-10"
                >
                  <table className="text-[12px] col-span-2 table-auto text-left w-[70%] md:mt-auto">
                    <thead>
                      <tr>
                        <th className="p-3 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                          {item.bankName}
                        </th>
                        <th className="p-3 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                          Account number
                        </th>
                        <th className="p-3 uppercase border-dashed border-r-2 border-r-gray-950 py-2">
                          Amount of money
                        </th>
                        <th className="p-3 uppercase border-dashed py-2">
                          Transfer content
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold text-left p-3 bg-slate-100 border-dashed border-r-2 border-r-gray-950">
                          Nguyen Thanh Binh
                        </td>
                        <td className="font-bold text-left p-3 bg-slate-100 border-dashed border-r-2 border-r-gray-950">
                          {item.accountNumber}
                        </td>
                        <td className="font-bold text-left p-3 bg-slate-100 border-dashed border-r-2 border-r-gray-950">
                          {formatCurrency(totalPrice)}
                        </td>
                        <td className="font-bold text-left p-3 bg-slate-100">
                          Mua hang {code}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="lg:col-span-1 h-[100px] w-[100px]">
                    <img className="w-full h-full" src={item.image} alt="anh" />
                  </div>
                  {/* <div className="table-auto w-full mt-10 md:mt-auto"></div> */}
                </div>
              ))}
          </div>
        )}
        <div>
          <h3 className="pt-3 mt-3 text-[24px] font-semibold">Order details</h3>
          <div className="md:translate-y-6 pt-5 mb-20">
            <table className="table-auto text-left w-full md:mt-auto">
              <thead>
                <tr>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    Product
                  </th>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    Provisional{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left p-3 bg-slate-100 border-gray-300 border">
                      {item.title} x {item.quantity}
                    </td>
                    <td className="text-left p-3 bg-slate-100 border-gray-300 border">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    Provisional
                  </th>
                  <th className="p-3 border-gray-300 border py-2.5 font-semiboid">
                    {formatCurrency(totalPrice)}
                  </th>
                </tr>
                <tr>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    Delivery
                  </th>
                  <th className="p-3 border-gray-300 border py-2.5 font-semibold">
                    Free Delivery
                  </th>
                </tr>
                <tr>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    Total
                  </th>
                  <th className="p-3 border-gray-300 border py-2.5 font-bold">
                    {formatCurrency(totalPrice)}
                  </th>
                </tr>
              </thead>
            </table>
            <div className="table-auto w-full mt-10 md:mt-auto"></div>
          </div>
        </div>
      </form>
    </div>
  );
};
