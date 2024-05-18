import { User } from "lucide-react"

function Header() {
    return (
        <>
            <div className="p-2 shadow-sm border flex justify-between">
                <div>

                </div>
                <div className="border border-slate-500 rounded-full p-2 text-slate-500">
                    <User />
                </div>
            </div>
        </>
    )
}

export default Header