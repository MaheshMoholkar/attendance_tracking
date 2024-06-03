import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

function Home() {
  return (
    <div>
      <div className="md:w-64 fixed h-screen hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64 p-3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
