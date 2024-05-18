import Header from "./Header"
import SideNav from "./SideNav"
import Student from "./Student"

function Home() {
    return (
        <div>
            <div className="md:w-64 fixed hidden md:block">
                <SideNav />
            </div>
            <div className="md:ml-64">
                <Header />
                <Student></Student>
            </div>
        </div>
    )
}

export default Home