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
        <div className="flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-[25dvw] fixed bg-white border-black border-t-2 lg:border-0 lg:static bottom-0 flex flex-col p-5 lg:p-10 font-raleway font-semibold text-xl">
                <div className="flex lg:block gap-12 justify-center">
                    <div className="flex items-center">
                        <img className="size-10" src="./assets/projects.svg" alt="" />
                        <p className="py-3 hidden lg:block">Projects</p>
                    </div>
                    <div className="flex items-center">
                        <img className="size-10" src="./assets/ideas.svg" alt="" />
                        <p className="py-3 hidden lg:block">Open Ideas</p>
                    </div>
                    <div className="flex items-center">
                        <img className="size-10" src="./assets/showcase.svg" alt="" />
                        <p className="py-3 hidden lg:block">Showcase</p>
                    </div>
                    <div className="flex items-center">
                        <img className="size-10" src="./assets/connect.svg" alt="" />
                        <p className="py-3 hidden lg:block">Connect</p>
                    </div>
                </div>
                <hr />
            </div>
            <div className="lg:w-[50dvw] font-raleway border-black border-x-2 flex items-center lg:items-start flex-col gap-10">
                <div className="lg:hidden self-end">
                    <div className="flex items-center">
                        <p>Filter</p>
                        <img className="size-8" src="./assets/arrow-down.svg" alt="" />
                    </div>
                </div>
                
                <div className="grid w-full">
                    <div className="min-h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                         <div className="p-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima reprehenderit inventore suscipit sapiente laudantium enim dolorem, veniam facilis eos saepe sit nulla itaque quas reiciendis quidem rem labore quam.
                         </div>
                         <div className="h-[20rem] bg-slate-300 rounded-md"></div>
                         <div className="flex gap-5 py-5">
                            <p>Likes</p>
                            <p>Add to Collections</p>
                         </div>
                    </div>
                    <div className="min-h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                         <div className="p-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima reprehenderit inventore suscipit sapiente laudantium enim dolorem, veniam facilis eos saepe sit nulla itaque quas reiciendis quidem rem labore quam.
                         </div>
                         <div className="h-[20rem] bg-slate-300 rounded-md"></div>
                         <div className="flex gap-5 py-5">
                            <p>Likes</p>
                            <p>Add to Collections</p>
                         </div>
                    </div>
                    <div className="h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                    </div>
                    <div className="h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                    </div>
                    <div className="h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                    </div>
                    <div className="h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                    </div>
                    <div className="h-[25rem] p-5 w-full border-black border-b-2">
                         <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-10 w-10">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Username</p>
                                <p className="text-[0.8rem] text-gray-500">Profession</p>
                            </div>
                         </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="hidden lg:block">
            <Footer/>
        </div>
    </>
  )
}
