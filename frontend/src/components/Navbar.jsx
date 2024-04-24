import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Navbar() {

    const {form} = useParams()
    const navigate = useNavigate()
    const [isVisible,setVisible] = useState(false)

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
            <nav className="border-black sticky top-0 z-30 bg-white w-full border-b-2 flex justify-between items-center py-3 px-5 lg:px-10">
                <Link to="/">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img className="size-10 lg:size-[inherit]" src="./assets/logo.svg" alt="Logo of WeCollab" />
                        <h1 className="text-2xl lg:text-3xl font-raleway font-bold pt-1">WeCollab</h1>
                    </div>
                </Link>

                {/* Search bar */}

                {getCookie("user") ? 
                <input className="hidden font-raleway bg-blue-50 lg:block md:block border-black border-2 w-1/2 mr-10 px-10 py-1 bg-search bg-contain bg-no-repeat rounded-full" placeholder="Search Projects" type="text" />
                : 
                form ? 
                "" 
                : 
                <div className="hidden md:flex lg:flex gap-10 font-space text-xl [&_*]:cursor-pointer">
                    <p>Home</p>
                    <p>Project</p>
                    <p>Open Ideas</p>
                </div>
                }
                {form ? form === "signup" ? 
                <Link to="/login">
                    <button className="rounded-full font-raleway font-bold border-black border-2 hover:bg-slate-200 px-5 py-1">Log-In</button> 
                </Link>
                : 
                <Link to="/signup">
                    <button className="rounded-full font-raleway font-bold border-black border-2 hover:bg-slate-200 px-5 py-1">Sign-up</button>
                </Link>
                :  getCookie("user") ? 
                <>
                    <div className="flex items-center gap-5 font-Poppins">
                        <Link to="/project/create">
                            <button className="rounded-full hidden lg:block border-black border-2 px-5 py-1">Post +</button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <img className="size-10 lg:hidden md:hidden" src="./assets/search.svg" alt="" />
                            <div onClick={() => setVisible(!isVisible)} className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>{getCookie("user")[0].toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </> 
                :
                <>
                    <div className="hidden md:block lg:block text-xl text-white font-raleway font-bold">
                        <Link to="/signup">
                            <button className="rounded-full bg-orange-600 px-5 py-1">+ Join</button>
                        </Link>
                    </div>
                    <img className="md:hidden lg:hidden" src="./assets/responsive-nav.svg" alt="Responsive navigation icon" />
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
