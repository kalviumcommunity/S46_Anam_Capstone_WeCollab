import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import UserDropdown from "./UserDropdown"
import ResponsiveNav from "./ResponsiveNav"
import NotificationDropdown from "./NotificationDropdown"

export default function Navbar() {

    const {form} = useParams()
    const navigate = useNavigate()
    const {section} = useParams()
    // const location = useLocation()

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
            <nav className={`border-black sticky font-Poppins top-0 z-30 bg-white w-full border-b flex justify-between items-center py-3 px-5 ${section === "showcase" ? "md:px-12": "lg:px-8"} transition-all lg:px-24`}>
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
                form === "login" ?
                <Link to="/user/signup">
                    <button className="rounded-full font-raleway font-bold border-black border hover:bg-slate-200 px-5 py-1">Sign-up</button>
                </Link>
                :
                ""
                :  getCookie("user") ? 
                <>
                    <div className="flex items-center gap-5 font-Poppins">
                        <Link to="/post/project">
                            <button className="rounded-full hidden lg:block md:block border-black border px-5 py-1">Post +</button>
                        </Link>
                        <NotificationDropdown/>
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
                    { !section && <ResponsiveNav/>}
                </>
                }
            </nav>
        </>
    )
}
