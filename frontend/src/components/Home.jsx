import Navbar from "./Navbar"
import { useState } from "react";
import Setting from "./Setting";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";

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

        <div className="flex mt-16 lg:mt-[4.7rem] h-[90dvh] flex-col-reverse font-raleway lg:flex-row">

            <div className="w-full fixed z-10 items-center lg:items-start lg:w-[20dvw] bg-white border-black border-t-2 lg:border-t-0 lg:border-r-0 lg:static bottom-0 flex flex-col p-5 lg:p-10 font-semibold text-xl">
                <div className="flex lg:block gap-12">
                    <div onClick={(e) => setActiveSection(e.target.innerHTML)} className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/projects.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Projects</p>
                    </div>
                    <div onClick={(e) => setActiveSection(e.target.innerHTML)}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/ideas.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Open Ideas</p>
                    </div>
                    <div onClick={(e) => setActiveSection(e.target.innerHTML)}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/showcase.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Showcase</p>
                    </div>
                    <div onClick={(e) => setActiveSection(e.target.innerHTML)}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/connect.svg" alt="" />
                        <p className="p-3 rounded-md hidden lg:block">Connect</p>
                    </div>
                    <div onClick={(e) => setActiveSection(e.target.innerHTML)}  className="flex lg:hover:bg-slate-300 rounded-md cursor-pointer items-center">
                        <img className="lg:size-12 size-10" src="./assets/settings.svg" alt="" />  
                        <p className="p-3 rounded-md hidden lg:block">Settings</p>
                    </div>
                </div>
                <hr />
            </div>

            {activeSection === "Settings" ? <Setting/> : <Project/> }
        </div>
        
    </>
  )
}
