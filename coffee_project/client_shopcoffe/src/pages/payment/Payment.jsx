import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartFromLS } from "../../utils/utils";
import axios from "axios";
export const Payment = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const carts = getCartFromLS();
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
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
  const host = "https://provinces.open-api.vn/api/?depth=3";
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const handlePaymentMethodChange = (event) => {
    const isPayment = event.target.value === "1";
    setFormState((prev) => ({ ...prev, isPayment }));
  };
  const handleInput = (event) => {
    const { name, value } = event.currentTarget;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  useEffect(() => {
    axios
      .get(host)
      .then((response) => {
        setCityList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách tỉnh/thành phố: ", error);
      });
  }, []);
  useEffect(() => {
    if (formState.tinh) {
      const selectedCity = cityList.find((c) => c.name === formState.tinh);
      if (selectedCity) {
        const districts = selectedCity.districts;
        setDistrictList(districts);
      }
    } else {
      setDistrictList([]);
    }
  }, [formState.tinh, cityList]);
  function calculateTotalPrice(data) {
    let total = 0;
    for (const product of data) {
      const price = parseFloat(product.price);
      const quantity = parseFloat(product.quantity);
      total += price * quantity;
    }
    return total;
  }
  function calculateTotalQuantity(data) {
    const totalQuantity = data.filter((item) => item.quantity !== undefined);
    const count = totalQuantity.length;
    return count;
  }
  function SumQuantity(data) {
    let sumQuantity = 0;
    for (const item of data) {
      sumQuantity += item.quantity;
    }
    return sumQuantity;
  }
  const totalPrice = calculateTotalPrice(carts);
  const generateRandomOrderCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  useEffect(() => {
    if (formState.quan) {
      const selectedDistrict = districtList.find(
        (d) => d.name === formState.quan
      );
      if (selectedDistrict) {
        const wards = selectedDistrict.wards;
        setWardList(wards);
        const total = calculateTotalPrice(carts);
        const totalQuantity = calculateTotalQuantity(carts);
        const randomOrderCode = generateRandomOrderCode(6);
        const sumQuantity = SumQuantity(carts);
        setFormState((prev) => ({
          ...prev,
          Sum: total,
          soDon: totalQuantity,
          quantity: sumQuantity,
          code: randomOrderCode,
        }));
        // const updatedCarts = carts.map((item: any) => ({ ...item, code: formState.code }))
      }
    } else {
      setWardList([]);
    }
  }, [formState.quan, districtList, carts]);
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const cityOptions = cityList.map((item) => (
    <option key={item.code} value={item.name}>
      {item.name}
    </option>
  ));
  const districtOptions = districtList.map((item) => (
    <option key={item.code} value={item.name}>
      {item.name}
    </option>
  ));

  const wardOptions = wardList.map((item) => (
    <option key={item.code} value={item.name}>
      {item.name}
    </option>
  ));
  const axiosInstance = axios.create({
    timeout: 4000,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formState.email)) {
      alert("Email không hợp lệ. Vui lòng nhập email hợp lệ.");
    } else {
      try {
        const jsonData = JSON.stringify(formState);
        const response = await axiosInstance.post(
          "http://localhost:4001/api/v1/order/create",
          jsonData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          if (formState.isPayment) {
            alert("Đặt hàng thành công");
            navigate("/order-payment", {
              state: {
                paymentMethod: response.data.orders.isPayment,
                code: response.data.orders.code,
              },
            });
            const updatedCarts = [...carts];
            for (const item of updatedCarts) {
              item.code = formState.code;
            }
            localStorage.setItem("cart", JSON.stringify(updatedCarts));
          } else {
            alert("Đặt hàng thành công");
            navigate("/order-payment", {
              state: {
                paymentMethod: response.data.orders.isPayment,
                code: response.data.orders.code,
              },
            });
            localStorage.setItem("cart", JSON.stringify([]));
            setFormState({
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
              code: "",
              quantity: 0,
              products: [],
            });
          }
        }
      } catch (error) {
        console.error("Lỗi từ phía server:", error);
        alert("Có lỗi xảy ra khi gửi thông tin");
      }
    }
  };
  return (
    <div className="p-3 pb-10 border-b">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="false"
        action="#"
        className="max-w-[1180px] mx-auto md:grid md:grid-cols-2 gap-x-8"
      >
        <div>
          <h3 className="py-6 text-[29px] font-semibold">
            Billing Information
          </h3>
          <div>
            <div className="mt-3">
              <label
                htmlFor="name"
                className="block mb-1 text-sm text-gray-900"
              >
                Full name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={formState?.name}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div
                style={{ marginRight: "1em" }}
                className="grid grid-cols-1 mt-3"
              >
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm text-gray-900"
                >
                  Phone number
                </label>
                <input
                  required
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={handleInput}
                  value={formState?.phone}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                  placeholder="Phone number"
                />
              </div>
              <div className="mt-3grid grid-cols-1 mt-3">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm text-gray-900"
                >
                  Email
                </label>
                <input
                  required
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInput}
                  value={formState?.email}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                  placeholder="Email"
                />
              </div>
            </div>
            <div className=" grid grid-cols-2 mt-3">
              <div
                style={{ marginRight: "1em" }}
                className="grid grid-cols-1 mt-3"
              >
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm text-gray-900"
                >
                  Province/City
                </label>
                <select
                  name="tinh"
                  value={formState?.tinh}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                >
                  <option value="">Select province/city</option>
                  {cityOptions}
                </select>
              </div>
              <div className="mt-3grid grid-cols-1 mt-3">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm text-gray-900"
                >
                  District
                </label>
                <select
                  value={formState?.quan}
                  name="quan"
                  id="quan"
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                >
                  <option value="">Select District</option>
                  {districtOptions}
                </select>
              </div>
            </div>
            <div className=" grid grid-cols-2 mt-3">
              <div
                style={{ marginRight: "1em" }}
                className="grid grid-cols-1 mt-3"
              >
                <label
                  htmlFor="xa"
                  className="block mb-1 text-sm text-gray-900"
                >
                  Wards
                </label>
                <select
                  value={formState?.xa}
                  name="xa"
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                >
                  <option value="">Select Wards</option>
                  {wardOptions}
                </select>
              </div>
              <div className="mt-3grid grid-cols-1 mt-3">
                <label
                  htmlFor="mota"
                  className="block mb-1 text-sm text-gray-900"
                >
                  Address
                </label>
                <input
                  required
                  type="text"
                  name="mota"
                  id="mota"
                  onChange={handleInput}
                  value={formState?.mota}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                  placeholder="Exp: Số 20, ngõ 90, tổ 30, thôn...."
                />
              </div>
            </div>
            <div className="mt-3">
              <label
                htmlFor="note"
                className="block mb-1 text-sm text-gray-900"
              >
                Note
              </label>
              <input
                required
                type="text"
                name="note"
                id="note"
                onChange={handleInput}
                value={formState?.note}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                placeholder="Note"
              />
            </div>
          </div>
        </div>
        <div className="md:translate-y-16">
          <table className="table-auto w-full mt-10 md:mt-auto">
            <thead>
              <tr>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Product
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Provisional
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={index}>
                  <td className="text-center p-5 bg-slate-100 border-gray-300 border">
                    {item.title} x {item.quantity}
                  </td>
                  <td className="text-center p-5 bg-slate-100 border-gray-300 border">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Provisional
                </th>
                <th className="border-gray-300 border py-2.5 font-semiboid">
                  {formatCurrency(totalPrice)}
                </th>
              </tr>
              <tr>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Delivery
                </th>
                <th className="border-gray-300 border py-2.5 font-semibold">
                  Free delivery
                </th>
              </tr>
              <tr>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Total
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  {formatCurrency(totalPrice)}
                </th>
              </tr>
            </thead>
          </table>
          <div className="table-auto w-full mt-10 md:mt-auto"></div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="mt-2 w-full">
            <label
              htmlFor="paymentMethod"
              className="block mb-1 text-sm text-gray-900"
            >
              Payments
            </label>
            <select
              id="paymentMethod"
              onChange={handlePaymentMethodChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
            >
              <option value="0">Payment on delivery</option>
              <option value="1">Paying through bank</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-10 mt-5">
          <div className="mt-2 h-[40px] w-full hover:bg-white hover:text-black bg-black text-white rounded-full border-[1px] hover:border-black">
            <button
              type="submit"
              className="h-[40px] uppercase rounded-full px-5 text-[14px] w-full "
            >
              Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
