import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../../contexts/app.context";
import ProfileModal from "../../Modal/Profile";
import { getProfileFromLS } from "../../../utils/utils";

export default function UserMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, profile, cart, reset } =
    React.useContext(AppContext);
  console.log(profile);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex font-semibold items-center">
      <button
        onClick={() => navigate("/cart")}
        type="button"
        className="relative mr-3 inline-flex items-center p-2 text-sm font-medium text-center text-white  rounded-lg "
      >
        <FaCartArrowDown className="w-[20px] h-[20px]" />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 ">
          {cart?.length}
        </div>
      </button>
      {isAuthenticated && (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className="py-2 px-4 mr-2 font-bold rounded-xl text-white"
          >
            {profile?.name || getProfileFromLS()?.name}
          </button>
          <button
            onClick={reset}
            className="py-2 px-4 bg-[#ff4d4f] font-bold text-white rounded-xl hover:bg-[#ec474a]"
          >
            Log out
          </button>
        </>
      )}
      {!isAuthenticated && (
        <>
          <NavLink to={"/login"}>
            <button className="py-2 px-4 mr-2 font-bold bg-white text-black rounded-xl hover:bg-slate-100">
              Sign in
            </button>
          </NavLink>
          <NavLink to={"/register"}>
            <button className="py-2 px-4 bg-[#ff4d4f] font-bold text-white rounded-xl hover:bg-[#ec474a]">
              Sign up
            </button>
          </NavLink>
        </>
      )}
      <div></div>
      <ProfileModal
        data={profile}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
