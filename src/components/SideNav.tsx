import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];
  return (
    <>
      <div className="border shadow-md h-side-bar-h p-3 bg-slate-600 m-2 rounded-lg">
        <div className="flex border rounded-lg p-5 bg-white">
          <img src="./src/assets/erp-logo.png" alt="logo" />
        </div>
        <hr className="my-5" />
        {menuList.map((menu, index) => (
          <Link
            to={menu.path}
            className={`flex items-center gap-3 text-lg p-3 hover:text-slate-600 hover:bg-white  cursor-pointer rounded-lg my-2 transition-colors duration-300 ${
              location.pathname == menu.path
                ? "bg-white text-slate-600"
                : "text-white"
            }`}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
    </>
  );
}

export default SideNav;
