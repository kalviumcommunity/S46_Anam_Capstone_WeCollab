import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react";
import Dropdown from "./Dropdown";

export default function Home() {

    const [activeSection, setActiveSection] = useState("Projects");

    const categories = [{label: "Technology", value: "tech"},{label: "Art", value: "art"},{label: "Science", value: "science"}]
    const projectSize = [{label: "Big",value: "big"}, {label: "Medium", value: "medium"},{label:"Small",value: "small"}]
    const skills = [{ label: "Programming", value: "programming" },{ label: "Design", value: "design" },{ label: "Writing", value: "writing" },{ label: "Marketing", value: "marketing" },{ label: "Project Management", value: "project_management" }]

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
        <div className="w-[100dvw] font-raleway flex items-center lg:items-start flex-col p-5 pt-10 lg:px-20 lg:py-10 gap-10">
            <div className="flex items-center font-semibold gap-3 lg:gap-5 lg:text-xl text-[1rem]">
                <p onClick={(e) => setActiveSection(e.target.innerHTML)} className={`${activeSection === "Projects" ? "bg-red-200" : ""} cursor-pointer px-2`}>Projects</p>
                <div className="h-5 w-1 border-l-2 border-black"></div>
                <p onClick={(e) => setActiveSection(e.target.innerHTML)} className={`${activeSection === "Open Ideas" ? "bg-red-200" : ""} cursor-pointer px-2`}>Open Ideas</p>
                <div className="h-5 w-1 border-l-2 border-black"></div>
                <p onClick={(e) => setActiveSection(e.target.innerHTML)} className={`${activeSection === "Showcases" ? "bg-red-200" : ""} cursor-pointer px-2`}>Showcases</p>
            </div>
            <h1 className="text-2xl lg:text-4xl font-space">{`Hey [username] 👋🏻`}</h1>
            <div className="lg:hidden self-end">
                <div className="flex items-center">
                    <p>Filter</p>
                    <img className="size-8" src="./assets/arrow-down.svg" alt="" />
                </div>
            </div>
            <div className="hidden lg:flex gap-10 relative">
                <Dropdown label={"Category"} data={categories} type={"select"} />
                <Dropdown label={"Project Size"} data={projectSize} type={"select"} />
                <Dropdown label={"Skills"} data={skills} type={"checkbox"} />
            </div>
            <div className="hidden lg:block self-end">
                <div className="flex items-center">
                    <p>Sort</p>
                    <img className="size-8" src="./assets/arrow-down.svg" alt="" />
                </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-y-10 lg:gap-x-10 lg:gap-y-20">
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
                <div className="size-[22rem] lg:size-[26rem] border-black border-2 bg-slate-200"></div>
            </div>
            <div className="flex w-full justify-center font-semibold mb-10">
                <div className="flex gap-1 lg:gap-2 border-black p-2 border-2 items-center rounded-md">
                    <img className="size-8 rotate-90" src="./assets/arrow-down.svg" alt="" />
                    <p>Page</p>
                    <input className="border-black border-2 h-3/4 w-5 p-1 rounded-md" type="text" />
                    <p>of</p>
                    <p>2</p>
                    <img className="size-8 rotate-90 scale-y-[-1]" src="./assets/arrow-down.svg" alt="" />
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
