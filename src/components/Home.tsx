import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

function Home() {
  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
