import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Home() {

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

  return (
    <>
        <Navbar/>
        <div className="h-[60dvh] w-[100dvw] font-raleway flex items-center justify-center">
            {getCookie("user") && <p className="font-semibold text-3xl">Welcome User</p>}
        </div>
        <Footer/>
    </>
  )
}
