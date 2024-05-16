import Navbar from "./Navbar"
import Setting from "./Setting";
import Project from "./Project";
import SideNavbar from "./SideNavbar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Idea from "./Idea";
import Showcase from "./Showcase";
import { useEffect } from "react";

export default function Home() {

    const {section} = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const setCookie = (cookieName,value,daysToLive) => {
      const date = new Date()
      date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
      let expires = "expires=" + date.toUTCString()
      document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }    
    
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    if(token && email){
      setCookie("token", token)
      setCookie("user", email)
    }
    
    useEffect(() => {
      if(token && email){
        navigate("/home")
      }
    },[])
    
  return (
    <>
        <Navbar/>

        <div className={`flex h-[90dvh] flex-col-reverse font-raleway lg:flex-row md:flex-row transition-all ${section === "showcase" ? "md:mx-5 lg:mx-20" : ""}`}>

            <SideNavbar/>

           {section === "settings" ? 
                <Setting/>
                :
                section === "ideas" ?
                <Idea/>
                :
                section === "showcase" ?
                <Showcase/>
                :
                <Project/>
            }

        </div>
    </>
  )
}
