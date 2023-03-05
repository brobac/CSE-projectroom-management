import { ADMIN_NAVIGAITON_ITEMS } from "@/stores/admin/navItems";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const SideBar = () => {
  return (
    <div className="fixed flex h-screen w-64 flex-col items-center bg-base-200 px-6">
      <div className=" py-10">
        <h1 className="flex flex-col text-center text-xl font-bold text-base-content">
          <span>컴퓨터소프트웨어공학과</span>
          <span>프로젝트실 예약 관리</span>
        </h1>
      </div>
      {ADMIN_NAVIGAITON_ITEMS.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          className={({ isActive }) =>
            twMerge([
              "w-full rounded-lg p-4 text-lg font-bold text-gray-700 transition-colors hover:bg-base-300",
              isActive && "bg-primary text-base-content hover:bg-primary-focus",
            ])
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};
