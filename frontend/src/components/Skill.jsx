import { useState } from "react"


export default function Skill() {

    const [showSkills,setShowSkills] = useState(false)

  return (
    <>
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
    </>
  )
}
