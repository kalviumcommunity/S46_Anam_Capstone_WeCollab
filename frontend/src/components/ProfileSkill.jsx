import { useState } from "react"


export default function Skill({skills}) {

    const [showSkills,setShowSkills] = useState(false)

  return (
    <>
        <div className="lg:w-1/2 mt-2 flex flex-col w-full border-black border rounded-lg relative bg-white p-5">
                <div className="flex justify-between py-2">
                    <h1 className="text-3xl font-semibold">Skills</h1>
                    <div className="flex gap-3 items-center">
                        <img className="size-8 cursor-pointer" src="./assets/plus.svg" alt="" />
                        <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-[1rem] lg:text-xl pt-5">
                    {skills && skills.map((skill,index) => {
                        if(index <= 2){
                            return(
                                <div className="p-1" key={index}>
                                    <p>{skill}</p>
                                    {/* <hr className="border-slate-200 border-1" /> */}
                                </div>
                            )
                        }else{
                            return(
                                <div className={`${showSkills ? "": "hidden"} p-1`} key={index}>
                                    <p>{skill}</p>
                                    {/* <hr className="border-slate-200 border-1" /> */}
                                </div>
                            )
                        }
                    })}
                    {skills && skills.length >= 2 ? <div onClick={() => setShowSkills(!showSkills)} className="flex font-semibold items-center text-[0.9rem] lg:text-[1rem] cursor-pointer self-center">
                        <p>Show all skills</p>
                        <img className="size-6" src="./assets/arrow-right.svg" alt="" />
                    </div> : ""}
                </div>
            </div>
    </>
  )
}
