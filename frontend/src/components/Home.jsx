import Navbar from "./Navbar"
import { useState } from "react";
import Setting from "./Setting";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";
import Footer from "./Footer";

export default function Home() {

    const [activeSection, setActiveSection] = useState("Projects")

    const categories = [{label: "Technology", value: "tech"},{label: "Art", value: "art"},{label: "Science", value: "science"}]
    const projectSize = [{label: "Big",value: "big"}, {label: "Medium", value: "medium"},{label:"Small",value: "small"}]
    const skills = [{ label: "Programming", value: "programming" },{ label: "Design", value: "design" },{ label: "Writing", value: "writing" },{ label: "Marketing", value: "marketing" },{ label: "Project Management", value: "project_management" }]
    const gender = [{label: "Male", value: "male"}, {label: "Female", value: "female"}, {label: "Custom",value: ""}, {label: "Prefer not to say", value: ""}]

  return (
    <>
        <Navbar/>

        {/* Side navbar */}

        <div className="flex h-[100dvh] flex-col-reverse font-raleway lg:flex-row">

            <div className="w-full sticky items-center lg:items-start lg:w-[20dvw] bg-white border-black border-t-2 lg:border-t-0 lg:border-r-0 lg:static bottom-0 flex flex-col p-5 lg:p-10 font-semibold text-xl">
                <div className="flex lg:block gap-12">
                    <div onClick={(e) => setActiveSection("Projects")} className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/projects.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Projects</p>
                    </div>
                    <div onClick={(e) => setActiveSection("Open Ideas")}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/ideas.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Open Ideas</p>
                    </div>
                    <div onClick={(e) => setActiveSection("Showcase")}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/showcase.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Showcase</p>
                    </div>
                    <div onClick={(e) => setActiveSection("Connect")}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/connect.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Connect</p>
                    </div>
                    <div onClick={(e) => {setActiveSection("Settings"),console.log("click",activeSection)}}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/settings.svg" alt="" />  
                        <p className="p-3 rounded-md hidden lg:block">Settings</p>
                    </div>
                </div>
                <hr />
            </div>

            {activeSection === "Settings" ? <Setting/> : <Project/> }
        </div>
        <Footer/>
    </>
  )
}
