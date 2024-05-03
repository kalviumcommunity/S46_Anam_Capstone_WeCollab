import Navbar from "./Navbar"
import Setting from "./Setting";
import Project from "./Project";
import SideNavbar from "./SideNavbar";
import { useParams } from "react-router-dom";
import Idea from "./Idea";
import Showcase from "./Showcase";

export default function Home() {

    const {section} = useParams()
    
  return (
    <>
        <Navbar/>

        <div className={`flex h-[90dvh] flex-col-reverse font-raleway lg:flex-row md:flex-row ${section === "showcase" ? "" : "md:mx-5 lg:mx-20"}`}>

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
