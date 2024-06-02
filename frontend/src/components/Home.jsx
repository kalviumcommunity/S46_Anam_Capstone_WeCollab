import Navbar from "./Navbar"
import Setting from "./Setting";
import Project from "./Project";
import SideNavbar from "./SideNavbar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Idea from "./Idea";
import Showcase from "./Showcase";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/CRUD";
import { useUserStore } from "@/zustand/store";

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

    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const cookieEmail = getCookie("user")
    const userEmail = cookieEmail || email

    const {loading,error,data} = useQuery(GET_USER,{variables: { email:userEmail }})
    const handleUserData = useUserStore((state) => state.setUserData)
    if(!loading){
      console.log(data)
      handleUserData(data.user)
    }
    if(error){
      console.error(error)
    }
    
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
