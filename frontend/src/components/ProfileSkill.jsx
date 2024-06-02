import { useState } from "react"
import { Edit, Plus } from "lucide-react"

export default function Skill({skills, handleEdit, changeDeleteVisibility, setSection}) {

    const [showSkills,setShowSkills] = useState(false)

  return (
    <>
        <div className="lg:w-1/2 md:w-2/3 mt-2 flex flex-col w-full border-black border rounded-lg relative bg-white p-5">
                <div className="flex justify-between py-2">
                    <h1 className="text-3xl font-semibold">Skills</h1>
                    <div className="flex gap-3 items-center">
                        <Plus onClick={() => handleEdit("Add skills")} className="cursor-pointer" />
                        <Edit onClick={() => {
                            changeDeleteVisibility()
                            setSection("Edit Skills")
                            }} className="cursor-pointer"/>
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-[1rem] lg:text-xl pt-5">
                    {skills && skills.map((skill,index) => {
                        if(index <= 2){
                            return(
                                <div className="p-1" key={index}>
                                    <p>{skill}</p>
                                </div>
                            )
                        }else{
                            return(
                                <div className={`${showSkills ? "": "hidden"} p-1`} key={index}>
                                    <p>{skill}</p>
                                </div>
                            )
                        }
                    })}
                    {skills && skills.length >= 2 ? <div onClick={() => setShowSkills(!showSkills)} className="flex font-semibold items-center text-[0.9rem] lg:text-[1rem] cursor-pointer self-center">
                        <p>Show all skills</p>
                        <img className="size-6" src="/assets/arrow-right.svg" alt="" />
                    </div> : ""}
                </div>
            </div>
    </>
  )
}
