import { Edit } from "lucide-react";
import { Plus } from "lucide-react";

export default function Experience({experience, handleEdit, changeDeleteVisibility, setSection}) {

  return (
    <>
        <div className="lg:w-1/2 md:w-2/3 mt-2 flex flex-col w-full border-black border rounded-lg relative bg-white p-5">
            <div className="flex justify-between items-center py-2 pb-5">
                <h1 className="text-3xl font-semibold">Experience</h1>
                <div className="flex gap-3 items-center">
                    <Plus onClick={() => handleEdit("Add experience")} className="cursor-pointer" />
                    <Edit onClick={() => {
                        changeDeleteVisibility()
                        setSection("Edit Experience")
                    }} className="cursor-pointer" />
                </div>
            </div>
            {experience && experience.map(exp => (
                <div key={exp.role}>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-xl">{exp.role}</p>
                            <p className="text-slate-600 text-sm">{exp.company}</p>
                        </div>
                        <p className="">- {exp.duration}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
