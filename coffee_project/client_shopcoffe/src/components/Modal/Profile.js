import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/app.context";
// import { Staff } from "./CreateStaff";
// import { useMutation, useQueryClient } from "react-query";
// import { updateProfile, updateStaff } from "~/apis/product.api";
// import { toast } from "react-toastify";
// import { setProfileFromLS } from "~/utils/auth";
// import { AppContext } from "~/contexts/app.context";
const ProfileModal = ({ isOpen, onClose, data }) => {
  const { setProfile } = useContext(AppContext);

  const modalRef = useRef(null);
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  const initialFromState = {
    name: "",
    username: "",
    password: "",
    email: "",
    isStaff: true,
    isAdmin: false,
  };
  const [formState, setFormState] = useState(initialFromState);
  useEffect(() => {
    setFormState(data);
  }, [data]);

  const handleChange = (name) => (event) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      onClick={handleModalClick}
      className={` ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed bg-[#02020246] ::bg-[#ffffff46] top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] transition-all`}
    >
      <div
        ref={modalRef}
        className="relative z-100 w-full left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-md max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow ::bg-gray-700">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center ::hover:bg-gray-600 ::hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ::text-white">
              Thông tin cá nhân
            </h3>
            {/* {data?.avatar.length !== 0 && (
              <div className="relative mb-4 group w-[200px] h-[200px] mx-auto overflow-hidden rounded-full">
                <img src={data?.avatar[0]} alt="avatar" />
              </div>
            )} */}
            <form
              className="space-y-6"
              action="#"
              autoComplete="false"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 ::text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ::bg-gray-600 ::border-gray-500 ::placeholder-gray-400 ::text-white"
                  placeholder="Email"
                  disabled
                  value={
                    formState?.email !== "" ? formState?.email : data?.email
                  }
                  onChange={handleChange("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 ::text-white"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ::bg-gray-600 ::border-gray-500 ::placeholder-gray-400 ::text-white"
                  placeholder="Tên"
                  value={formState?.name !== "" ? formState?.name : data?.name}
                  onChange={handleChange("name")}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 ::text-white"
                >
                  User name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ::bg-gray-600 ::border-gray-500 ::placeholder-gray-400 ::text-white"
                  placeholder="Không có username"
                  value={
                    formState?.username !== ""
                      ? formState?.username
                      : data?.username
                  }
                  onChange={handleChange("username")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ::bg-blue-600 ::hover:bg-blue-700 ::focus:ring-blue-800"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
