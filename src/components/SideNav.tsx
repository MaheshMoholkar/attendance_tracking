import { GraduationCap, Hand, LayoutIcon, Settings, User } from "lucide-react"

function SideNav() {

    const menuList=[
        {
            id:1,
            name:"Dashboard",
            icon:LayoutIcon,
            path:"/dashboard"
        },
        {
            id:2,
            name:"Students",
            icon:GraduationCap,
            path:"/dashboard/students"
        },
        {
            id:3,
            name:"Attendance",
            icon:Hand,
            path:"/dashboard/attendance"
        },
        {
            id:4,
            name:"Settings",
            icon:Settings,
            path:"/dashboard/settings"
        },
    ]
    return (
        <>
            <div className="border shadow-md h-screen p-5">
                <div className="flex">
                    <img src="./src/assets/logo.svg" 
                        alt="logo" 
                        height={40} 
                        width={40}
                    />
                    <p className="flex items-center font-bold ml-6 text-slate-700 text-lg leading-tight">
                        Attendance Management
                    </p>
                </div>
                <hr className="my-5"/>
                {menuList.map((menu, index)=>(
                    <h2 className="flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-blue-600  hover:text-white cursor-pointer rounded-lg my-2" key={index}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                ))}
                <div className="flex gap-2 items-center bottom-5 fixed">
                    <h2 className="flex items-center text-md p-4 text-slate-500 hover:bg-blue-600  hover:text-white cursor-pointer rounded-lg my-2">
                        <User />
                        <p className="ml-3">Mahesh Moholkar</p>
                    </h2>
                </div>
            </div>
        </>
    )
}

export default SideNav