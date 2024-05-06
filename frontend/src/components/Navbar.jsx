import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import UserDropdown from "./UserDropdown"
import ResponsiveNav from "./ResponsiveNav"

export default function Navbar() {

    const {form} = useParams()
    const navigate = useNavigate()
    const [isVisible,setVisible] = useState(false)
    const {section} = useParams()

    const setCookie = (cookieName,value,daysToLive) => {
        const date = new Date()
        date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
        let expires = "expires=" + date.toUTCString()
        document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }
    
    const deleteCookie = (cookieName) => {
        setCookie(cookieName,null,0)
    }
    
    const getCookie = (cookieName) => {

        const cDecoded = decodeURIComponent(document.cookie)
        const cArray = cDecoded.split("; ")
        let result;
    
        cArray.forEach(cookie => {
            if(cookie.indexOf(cookieName) == 0){
                result = cookie.substring(cookieName.length + 1)
            }
        })
    
        return result
    }

    const handleLogout = () => {
        deleteCookie("token")
        deleteCookie("user")
        navigate("/")
    }

    return (
        <>
            <nav className={`border-black sticky font-Poppins top-0 z-30 bg-white w-full border-b flex justify-between items-center py-3 px-5 md:px-16 ${section === "showcase" ? "": "lg:px-8"} transition-all lg:px-24`}>
                <Link to="/">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img className="size-10 lg:size-[inherit]" src="/assets/logo.svg" alt="Logo of WeCollab" />
                        <h1 className="text-2xl lg:text-3xl font-raleway font-bold pt-1">WeCollab</h1>
                    </div>
                </Link>

                {/* Search bar */}

                {getCookie("user") ? 
                ""
                : 
                form ? 
                "" 
                : 
                <div className="hidden font-medium md:flex lg:flex gap-10 text-sm lg:text-xl [&_*]:cursor-pointer">
                    <p className="hover:underline">Home</p>
                    <p className="hover:underline">Project</p>
                    <p className="hover:underline">Open Ideas</p>
                </div>
                }
                {form ? form === "signup" ? 
                <Link to="/user/login">
                    <button className="rounded-full font-raleway font-bold border-black border hover:bg-slate-200 px-5 py-1">Log-In</button> 
                </Link>
                : 
                <Link to="/user/signup">
                    <button className="rounded-full font-raleway font-bold border-black border hover:bg-slate-200 px-5 py-1">Sign-up</button>
                </Link>
                :  getCookie("user") ? 
                <>
                    <div className="flex items-center gap-5 font-Poppins">
                        <Link to="/post/project">
                            <button className="rounded-full hidden lg:block md:block border-black border px-5 py-1">Post +</button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <img className="size-10 lg:hidden md:hidden" src="/assets/search.svg" alt="" />
                            <UserDropdown handleLogout={handleLogout} getCookie={getCookie} />
                        </div>
                    </div>
                </> 
                :
                <>
                    <div className="hidden md:block lg:block text-xl text-white font-semibold">
                        <Link to="/user/signup">
                            <button className="rounded-full bg-orange-600 px-5 py-1">+ Join</button>
                        </Link>
                    </div>
                    <ResponsiveNav/>
                </>
                }
            </nav>
            <div className={`${isVisible ? "": "hidden"} fixed right-4 lg:right-6 z-30 top-16 bg-white flex flex-col border-black font-raleway rounded-md border-2 shadow-lg w-1/2 lg:w-1/6 p-3`}>
                <h1 className="p-1 text-[1.15rem] lg:text-xl font-semibold">Account</h1>
                <Link to="/profile">
                    <p className="hover:bg-red-100 p-1 hover:text-black text-gray-800 rounded-md cursor-pointer">View Profile</p>
                </Link>
                <p className="hover:bg-red-100 p-1 hover:text-black text-gray-800 rounded-md cursor-pointer">Settings</p>
                <hr className="border-black border-1 m-2" />
                <h1 className="p-1 text-[1.15rem] lg:text-xl font-semibold">Manage</h1>
                <p className="hover:bg-red-100 p-1 hover:text-black text-gray-800 rounded-md cursor-pointer">Posts</p>
                <p className="hover:bg-red-100 p-1 hover:text-black text-gray-800 rounded-md cursor-pointer">Pitch</p>
                <hr className="border-black border-1 m-2" />
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold p-1 rounded-md">Log Out</button>
            </div>
        </>
    )
}
