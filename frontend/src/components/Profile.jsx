import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"

export default function Profile() {

    const [showSkills,setShowSkills] = useState(false)

  return (
    <>
        <Navbar/>

        {/* Profile */}

        <div className="flex flex-col items-center font-raleway p-5 justify-center bg-orange-50 pt-24 pb-10 lg:py-32">
            <div className="lg:w-1/2 flex flex-col w-full py-3 border-black border-2 rounded-md relative bg-white">
                <div className="h-[20dvh] border-black border-b-2"></div>
                <img className="absolute top-24 left-5 border-black border-2 size-32 rounded-full bg-white" src="" alt="" />
                <img className="size-6 self-end m-4 cursor-pointer" src="./assets/edit.svg" alt="" />
                <div className="px-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold">Anam Ashraf</h1>
                            <p>Software Developer</p>
                        </div>
                        <button className="bg-green-600 px-3 py-1 rounded-full text-white font-semibold">Contact</button>
                    </div>
                    <div className="bg-green-200 px-3 py-1 my-5 rounded-full inline-block border-green-800 border-2 text-green-800 font-semibold">Open to Collaborate</div>
                </div>
            </div>

            {/* About */}

            <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5">
            <div className="flex justify-between py-2 pb-5">
                    <h1 className="text-3xl font-semibold">About</h1>
                    <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                </div>
                <p className="my-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quidem doloremque libero nisi atque ut eos optio expedita sapiente quod? Perferendis neque quas voluptatibus at, possimus fugit ea porro distinctio.</p>
            </div>

            {/* Experience */}

            <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5">
                <div className="flex justify-between items-center py-2 pb-5">
                    <h1 className="text-3xl font-semibold">Experience</h1>
                    <div className="flex gap-3 items-center">
                        <img className="size-8 cursor-pointer" src="./assets/plus.svg" alt="" />
                        <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                    </div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-xl">Product Manager</p>
                        <p className="text-slate-600">Company name</p>
                    </div>
                    <p className="">- 2 years</p>
                </div>
                <hr className="border-slate-200 border-1" />
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-xl">Senior Software Developer</p>
                        <p className="text-slate-600">Company name</p>
                    </div>
                    <p className="">- 2 years</p>
                </div>
            </div>

            {/* Skills */}

            <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5">
                <div className="flex justify-between py-2 pb-5">
                    <h1 className="text-3xl font-semibold">Skills</h1>
                    <div className="flex gap-3 items-center">
                        <img className="size-8 cursor-pointer" src="./assets/plus.svg" alt="" />
                        <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-[1rem] lg:text-xl">
                    <p>JavaScript</p>
                    <hr className="border-slate-200 border-1" />
                    <p>NodeJS</p>
                    <hr className="border-slate-200 border-1" />
                    <p className={`${showSkills ? "": "hidden"}`}>ExpressJS</p>
                    <hr className={`${showSkills ? "": "hidden"} border-slate-200 border-1`} />
                    <div onClick={() => setShowSkills(!showSkills)} className="flex font-semibold items-center text-[0.9rem] lg:text-[1rem] cursor-pointer self-center">
                        <p>Show all skills</p>
                        <img className="size-6" src="./assets/arrow-right.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
