import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Anh1 from "../../access/img/blog-img1.png";
import { getCartFromLS, setCartFromLS } from "../../utils/utils";

const Cart = () => {
  const [cartState, setCartState] = useState(getCartFromLS());
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  function removeItem(index) {
    const updatedCarts = [...cartState];
    updatedCarts.splice(index, 1);
    setCartFromLS(updatedCarts);
    setCartState(updatedCarts); // Cập nhật trạng thái của giỏ hàng sau khi xóa
  }
  function calculateTotalPrice(data) {
    let total = 0;
    for (const product of data) {
      const price = parseFloat(product.price);
      const quantity = parseFloat(product.quantity);
      total += price * quantity;
    }
    return total;
  }
  function updateQuantity(index, quantity) {
    const updatedCarts = [...cartState];
    updatedCarts[index].quantity = quantity;
    setCartFromLS(updatedCarts); // Cập nhật giỏ hàng trong localStorage
    setCartState(updatedCarts); // Cập nhật trạng thái của giỏ hàng
  }

  const totalPrice = calculateTotalPrice(cartState);
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="p-3 pb-10 border-b max-w-[1180px] mx-auto">
        <div className="md:hidden w-full flex flex-col gap-y-5">
          {cartState.map((item, index) => (
            <div className="border rounded-md" key={index}>
              <div className="flex justify-center py-2">
                <div
                  onClick={() => removeItem(index)}
                  className=" hover:border-black cursor-pointer  rounded-full flex items-center justify-center w-[30px] h-[30px] border"
                >
                  x
                </div>
              </div>
              <div className="flex justify-between border-t py-2 px-2">
                <div>Hình ảnh</div>
                <div className=" rounded-lg overflow-hidden w-[60px] h-[60px]">
                  <img src={item.image} alt="" />
                </div>
              </div>
              <div className="flex justify-between border-t py-2 px-2">
                <div>Sản phẩm</div>
                <div>{item.title}</div>
              </div>
              <div className="flex justify-between border-t py-2 px-2">
                <div>Giá</div>
                <div>{formatCurrency(item.price)}</div>
              </div>
              <div className="flex justify-between border-t py-2 px-2">
                <div>Số lượng</div>
                <input
                  className="w-[50px] pl-4 py-2 border rounded-full"
                  value={item.quantity}
                  type="number"
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue) && newValue > 1) {
                      updateQuantity(index, newValue);
                    }
                  }}
                />
              </div>
              <div className="flex justify-between border-t py-2 px-2">
                <div>Tạm tính</div>
                <div>{formatCurrency(item.price * item.quantity)}</div>
              </div>
              <div className="flex justify-center py-2 px-3">
                <button
                  disabled={true}
                  // onClick={() => setCartFromLS(cartState)}
                  className="bg-[#e9e6ed] disabled:cursor-not-allowed disabled:bg-slate-100 hover:bg-gray-300 w-full transition-all cursor-pointer  rounded-full flex items-center justify-center  h-[35px] border"
                >
                  Cập nhật giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-gray-300 border py-2.5 font-bold"></th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Image
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Product
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Price{" "}
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">
                  Quantity
                </th>
                <th className="border-gray-300 border py-2.5 font-bold">Sum</th>
              </tr>
            </thead>
            <tbody>
              {cartState.map((item, index) => (
                <Row
                  data={item}
                  key={index}
                  index={index}
                  removeItem={() => removeItem(index)}
                  updateQuantity={updateQuantity}
                ></Row>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-end mt-2 border-gray-300 border">
            <div className=" flex justify-center py-2 px-3">
              <button
                disabled={false}
                onClick={() => setCartFromLS(cartState)}
                className="bg-[#e9e6ed] px-4 disabled:cursor-not-allowed disabled:bg-slate-100 hover-bg-gray-300 w-full transition-all cursor-pointer  rounded-full flex items-center justify-center  h-[35px] border"
              >
                Update cart
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] md:ml-auto">
          <h2 className="py-6 text-[29px] font-semibold">Add shopping cart</h2>
          <div className="border rounded-md">
            <div className="flex justify-between border-t py-2 px-2">
              <div>Provisional</div>
              <div>{formatCurrency(totalPrice)}</div>
            </div>
            <div className="flex justify-between border-t py-2 px-2">
              <div>Delivery</div>
              <div className="flex flex-col items-end text-sm">
                <div>Free delivery</div>
              </div>
            </div>
            <div className="flex justify-between border-t py-2 px-2">
              <div>Sum</div>
              <div>{formatCurrency(totalPrice)}</div>
            </div>
          </div>
          <div className="flex mt-3 justify-center py-2 ">
            <button
              disabled={false}
              onClick={() => navigate("/payment")}
              className="bg-[#e9e6ed] disabled:cursor-not-allowed disabled:bg-slate-100 hover-bg-gray-300 w-full transition-all cursor-pointer  rounded-full flex items-center justify-center  h-[35px] border"
            >
              <Link to="/payment">Proceed to payment</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Row = ({ data, removeItem, updateQuantity, index }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  function formatCurrency(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  return (
    <tr>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        <div
          onClick={removeItem}
          className=" hover:border-black cursor-pointer  rounded-full flex items-center justify-center w-[30px] h-[30px] border"
        >
          x
        </div>
      </td>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        <div className=" rounded-lg overflow-hidden w-[60px] h-[60px]">
          <img src={data.image} alt="" />
        </div>
      </td>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        {data.title}
      </td>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        {formatCurrency(data.price)}
      </td>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        {" "}
        <input
          className="w-[50px] bg-white pl-4 py-2 border rounded-full"
          value={quantity}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue > 0) {
              setQuantity(newValue);
              updateQuantity(index, newValue);
            }
          }}
          type="number"
        />
      </td>
      <td className="text-center p-5 bg-slate-100 border-gray-300 border">
        {formatCurrency(data.price * quantity)}
      </td>
    </tr>
  );
};

export default Cart;
