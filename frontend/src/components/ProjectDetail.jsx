import Navbar from "./Navbar"
import Footer from "./Footer"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "@/graphql/CRUD"
import { useEffect, useState } from "react"
import SeekingSkill from "./SeekingSkill"
import parse from 'html-react-parser'

export default function ProjectDetail() {

    const {id} = useParams()
    const skillColors = [{bg: "#bbb2cf", text: "#33294e"},{bg: "#cb9ca2", text:"#35282a"},{bg:"#afbbbb", text:"#363b3b"},{bg:"#9ea7bb", text:"#353841"}] 
    const [displayAbout,setDisplayAbout] = useState()
    const navigate = useNavigate()

    const {data,loading,error} = useQuery(GET_PROJECT,{variables: {projectId: id}})

    useEffect(() => {
        const getParsedValue = async () => {
            const parsedValue = await parse(data.project.about)
            setDisplayAbout(parsedValue)
        }
        if(!loading){
            console.log(data)
            getParsedValue()
        }
    },[loading])

  return (
    <>
        <Navbar/>
        <div className="flex flex-col items-center pb-20 font-Poppins">
            <div className="prose text-xl box-border font-Poppins py-10">
                {data && 
                    <>
                    <h1 className="text-3xl lg:text-5xl font-semibold py-2 m-0">{data.project.title}</h1>
                    <div className="flex items-center justify-between">
                        {data.project.user.details.profileImage ? 
                            <div className="flex items-center gap-3">
                                <img src={data.project.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                                <p>{data.project.user.name}</p>
                            </div>
                            :
                            <>
                                <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                                    <p>{data.project.user.name[0]}</p>
                                </div>
                                <p>{data.project.user.name}</p>
                            </>
                        }
                        <div onClick={() => navigate(`/home/chat/${data.project.user.id}`)}>
                            <button className="bg-green-600 text-white p-2 px-4 font-medium rounded-full text-sm">Contact</button>
                        </div>
                    </div>
                    {data.project.thumbnail && <img className="border mb-5 mt-0 w-full rounded-xl" src={data.project.thumbnail} alt="not uploaded" />}
                    {data.project.about && <div> 
                        <h1 className="text-3xl font-semibold pt-5">About</h1>
                        {displayAbout && <div className="whitespace-pre-wrap pb-5">{displayAbout}</div>}
                    </div>}
                    { (data.project.collaborators || data.project.budget || data.project.timeline) && <div className="grid grid-cols-2 py-3 px-10 my-5 bg-slate-200 border-slate-600 text-[1.2rem] border-l-4">
                        <div className="font-semibold">
                            {data.project.collaborators && <p className="my-1">Team Size</p>}
                            {data.project.budget && <p className="my-1">Budget</p>}
                            {data.project.timeline && <p className="my-1">Timeline</p>}
                        </div>
                        <div className="font-semibold">
                            {data.project.collaborators && <div>
                                <p className="px-2 my-1">- {data.project.collaborators} collaborator(s)</p>
                            </div>}
                            {data.project.budget && <div>
                                <p className="px-2 my-1">- Rs.{data.project.budget}</p> 
                            </div>}
                            {data.project.timeline && <div>
                                <p className="px-2 my-1">- {data.project.timeline} {data.project.timelineDuration}</p> 
                            </div>}
                        </div>
                    </div>}
                    {data.project.seeking.length > 0 && <h1 className="text-3xl font-semibold py-5">Seeking</h1>}
                    <div className="grid lg:grid-cols-2 gap-5">
                        {data.project.seeking &&
                            data.project.seeking.map((roles,index) => 
                            <div key={index} className={`flex flex-col justify-between bg-[${skillColors[index].bg}] text-[${skillColors[index].text}] p-5 lg:p-10 rounded-xl`}>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-2xl font-semibold m-0">{roles.role} {roles.vacancy}(s)</h1>
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
        <Footer/>
    </>
  )
}
