import Navbar from "./Navbar"
import Setting from "./Setting";
import Project from "./Project";
import SideNavbar from "./SideNavbar";
import { useParams } from "react-router-dom";

export default function Home() {

    const {section} = useParams()
    
  return (
    <>
        <Navbar/>

        <div className="flex h-[90dvh] flex-col-reverse font-raleway lg:flex-row md:flex-row md:mx-20 lg:mx-20">

            <SideNavbar/>

           {section === "settings" ? 
                <Setting/>
                :
                <Project/>
            }

        </div>
    </>
  )
}
