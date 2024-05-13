import SeekingSkill from "./SeekingSkill"
import { useParams } from "react-router-dom"
import { Heart, Eye, Forward, MessageCircle,Bookmark } from "lucide-react"

export default function Preview({values,handleRemoveRole}) {

    const {section} = useParams()
    const skillColors = [{bg: "#bbb2cf", text: "#33294e"},{bg: "#cb9ca2", text:"#35282a"},{bg:"#afbbbb", text:"#363b3b"},{bg:"#9ea7bb", text:"#353841"}] 

  return (
    <div className="w-[70dvw] h-full hidden bg-white pt-10 pb-20 overflow-auto px-20 lg:block md:block border-black">
            <div className="prose text-xl box-border font-Poppins">
                {section === "idea"
                ?
                <>
                <div className="flex items-center gap-5">
                    <>
                    {values.thumbnail &&
                    <img className="rounded-xl bg-slate-200 min-w-[13rem] w-full h-[20rem] lg:size-52" src={values.thumbnail} alt="not uploaded" />}
                    {values.title &&
                    <div className="flex flex-col gap-8">
                        <div>
                            <h1 className="text-2xl lg:text-4xl md:text-4xl cursor-pointer font-semibold pb-2 p-0 m-0">{values.title}</h1>
                            <div className="flex text-xl items-center gap-2">
                                <Eye/>
                                <p className="p-0 m-0">1k read</p>
                                <p className="mb-2 m-0">.</p>
                                <p className="border-green-600 border px-2 text-green-600 rounded-full m-0 p-0">Open</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium italic text-gray-500">
                                {values.tags && values.tags.map((tag) => (
                                    <>
                                        <p className="text-sm m-0 p-0">#{tag}</p>
                                        <p className="mb-2 m-0">.</p>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-5 [&_*]:cursor-pointer items-center">
                            <div className="flex items-center gap-2">
                                <Heart className="size-5"/>
                                <span className="text-sm">2k likes</span>
                            </div>
                            <Bookmark className="size-5"/>
                            <Forward className="size-5"/>
                            <MessageCircle className="size-5"/>
                        </div>
                    </div>}
                    </>
                </div>
                <div className="text-[1.1rem] py-5">
                    <p className="m-0">{values.summary}</p>
                    {values.displayAbout.length > 0 && 
                    <>
                    <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold pt-5">Description</h1>
                    <div className="text-base">{values.displayAbout}</div>
                    </>}
                    {values.skills.length > 0 && <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold pt-5">Skills Required</h1>}
                    <ul className="list-disc px-10 pb-5">
                        {values.skills.length > 0 && values.skills.map(skill => (
                                <li key={skill} >{skill}</li>
                        ))}
                    </ul>
                </div>
                </>
                :
                <>
                <h1 className="text-3xl lg:text-5xl font-semibold pt-10">{values.title}</h1>
                {values.thumbnail && <img className="border mb-5 w-full rounded-xl" src={values.thumbnail} alt="not uploaded" />}
                {values.displayAbout.length > 0 && <div> 
                    <h1 className="text-3xl font-semibold pt-5">About</h1>
                    <p className="whitespace-pre-wrap">{values.displayAbout}</p>
                </div>}
                { (values.collaborators || values.displayBudget || values.timeline) && <div className="grid grid-cols-2 py-3 px-10 my-5 bg-slate-200 border-slate-600 text-[1.2rem] border-l-4">
                    <div className="font-semibold">
                        {values.collaborators && <p className="my-1">Team Size</p>}
                        {values.displayBudget && <p className="my-1">Budget</p>}
                        {values.timeline && <p className="my-1">Timeline</p>}
                    </div>
                    <div className="font-semibold">
                        {values.collaborators && <div>
                            <p className="px-2 my-1">- {values.collaborators} collaborator(s)</p>
                        </div>}
                        {values.displayBudget && <div>
                            <p className="px-2 my-1">- Rs.{values.displayBudget}</p> 
                        </div>}
                        {values.timeline && <div>
                            <p className="px-2 my-1">- {values.timeline} {values.timelineDuration}</p> 
                        </div>}
                    </div>
                </div>}
                {values.seeking.length > 0 && <h1 className="text-3xl font-semibold py-5">Seeking</h1>}
                <div className="grid lg:grid-cols-2 gap-5">
                    {values.seeking &&
                        values.seeking.map((roles,index) => 
                        <div key={index} className={`flex flex-col group/item bg-[${skillColors[index].bg}] text-[${skillColors[index].text}] p-5 lg:p-10 rounded-xl`}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-semibold m-0">{roles.role} {roles.vacancy}(s)</h1>
                                    <p onClick={() => handleRemoveRole(roles)} className="font-semibold hidden group-hover/item:block cursor-pointer m-0">X</p>
                                </div>
                                <p className="text-sm m-0">Experience - {roles.experience}</p>
                            </div>
                            <p className="text-[1rem]">{roles.responsibility}</p>
                            <SeekingSkill role={roles} />
                        </div>
                    )}
                </div>
                </>
                }
            </div>
        </div>
  )
}
