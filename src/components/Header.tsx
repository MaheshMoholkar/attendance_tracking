import { LogOut, User } from "lucide-react";

function Header() {
  return (
    <>
      <div className="p-2 shadow-sm border flex justify-between bg-white rounded-lg border-slate-600">
        <div className="flex items-center ml-3 text-xl font-semibold text-slate-600">
          Dr. D. Y. Patil Institute Of Technology
        </div>
        <div className="flex items-center gap-3 mr-3">
          <div className="border border-slate-500 rounded-full p-2 text-slate-500">
            <User />
          </div>
          <div className="p-2 text-red-700">
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
