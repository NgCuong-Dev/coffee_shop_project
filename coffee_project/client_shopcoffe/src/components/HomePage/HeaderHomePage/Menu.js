import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <ul className="flex space-x-5 font-medium text-l text-slate-100">
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              [
                isPending
                  ? "pending"
                  : " py-1 px-3 w-max h-max pb-1.5 rounded-2xl",
                isActive ? "bg-red-500 " : "hover:bg-red-500 transition-all ",
              ].join(" ")
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              [
                isPending
                  ? "pending"
                  : " py-1 px-3 w-max h-max pb-1.5 rounded-2xl",
                isActive ? "bg-red-500 " : "hover:bg-red-500 transition-all ",
              ].join(" ")
            }
            to={"/about"}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              [
                isPending
                  ? "pending"
                  : " py-1 px-3 w-max h-max pb-1.5 rounded-2xl",
                isActive ? "bg-red-500 " : "hover:bg-red-500 transition-all ",
              ].join(" ")
            }
            to={"/product"}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              [
                isPending
                  ? "pending"
                  : " py-1 px-3 w-max h-max pb-1.5 rounded-2xl",
                isActive ? "bg-red-500 " : "hover:bg-red-500 transition-all ",
              ].join(" ")
            }
            to={"/blog"}
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              [
                isPending
                  ? "pending"
                  : " py-1 px-3 w-max h-max pb-1.5 rounded-2xl",
                isActive ? "bg-red-500 " : "hover:bg-red-500 transition-all ",
              ].join(" ")
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
