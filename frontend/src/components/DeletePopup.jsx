import { Trash2,X } from "lucide-react"
import { useState } from "react"

export default function DeletePopup({data,section,changeDeleteVisibility,deleteItem}) {

    const [userData,setUserData] = useState(data)

    const handleDelete = (value) => {
        try {
            if(section === "Edit Experience"){
                setUserData((prevState) => ({
                    ...prevState,
                    details: {
                        ...prevState.details,
                        experience: prevState.details.experience.filter((exp) => exp !== value)
                    }
                }))
                deleteItem("details.experience","delete",value)
            }else{
                setUserData((prevState) => ({
                    ...prevState,
                    details: {
                        ...prevState.details,
                        skills: prevState.details.skills.filter((skill) => skill !== value)
                    }
                }))
                deleteItem("details.skills","delete",value)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="fixed bg-black z-20 font-raleway top-0 bg-opacity-50 w-[100dvw] h-[100dvh]">
        <div className="bg-white ml-5 mt-44 lg:ml-[50%] lg:translate-x-[-50%] w-[90dvw] lg:w-[50dvw] border-black border-2 rounded-lg p-5">
            <div className="flex flex-col text-2xl">
                    <div className="flex font-semibold justify-between">
                        <h1>{section}</h1>
                        <X onClick={changeDeleteVisibility} className="cursor-pointer"/>
                    </div>
                    <hr className="mt-1"/>
            </div>
            <div className="pt-3 font-medium overflow-y-auto">
            {
                section === "Edit Experience" ?
                userData && userData.details.experience.map(exp => (
                    <div key={exp.role}>
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <div>
                                <p className="text-xl">{exp.role}</p>
                                <p className="text-[0.75rem]"> - {exp.company} ({exp.duration})</p>
                            </div>
                        </div>
                        <Trash2 className="size-5" onClick={() => handleDelete(exp)} />
                    </div>
                </div>
            ))
            :
            userData && userData.details.skills.map(skill => (
                <div className="flex items-center justify-between p-3 text-xl" key={skill}>
                    <p>{skill}</p>
                    <Trash2 className="size-5 cursor-pointer" onClick={() => handleDelete({skill})} />
                </div>
            ))
        }
        </div>
        </div>
    </div>
  )
}
