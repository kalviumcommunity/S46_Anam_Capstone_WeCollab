import Navbar from "./Navbar"
import Footer from "./Footer"
import { Heart, Eye, Forward, MessageCircle,Bookmark } from "lucide-react"
import { useQuery } from "@apollo/client"
import { GET_IDEA } from "@/graphql/CRUD"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import parse from 'html-react-parser'

export default function IdeaDetail() {

    const {id} = useParams()
    const {data,loading,error} = useQuery(GET_IDEA,{variables:{ideaId: id}})
    const [displayDesc,setDisplayDesc] = useState()

    useEffect(() => {
        const getParsedValue = async () => {
            const parsedValue = await parse(data.idea.description)
            setDisplayDesc(parsedValue)
        }
        if(!loading){
            console.log(data)
            getParsedValue()
        }
    },[loading])

  return (
    <>
    <Navbar/>
    <div className="flex flex-col font-Poppins items-center gap-10 py-20 px-10 lg:px-80 md:px-40">
        {data &&
        <>
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                {data.idea.user.details.profileImage ? 
                    <img src={data.idea.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                    :
                    <>
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>{data.idea.user.name[0]}</p>
                        </div>
                        <p>{data.idea.user.name}</p>
                    </>
                }
            </div>
            <div>
                <button className="bg-green-600 text-white p-2 px-4 font-medium rounded-full text-sm">Contact</button>
            </div>
        </div>
         <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
            <img src={data.idea.thumbnail} className="rounded-xl bg-slate-200 min-w-[13rem] w-full h-[20rem] lg:size-52"></img>
            <div className="flex flex-col self-start gap-8">
                <div>
                    <h1 className="text-2xl lg:text-4xl md:text-4xl cursor-pointer font-semibold py-2">{data.idea.title}</h1>
                    <div className="flex text-xl items-center gap-2">
                        <Eye/>
                        <p>1k read</p>
                        <p className="mb-2">.</p>
                        <p className={` ${data.idea.status == "Open"? "border-green-600 text-green-600" : "border-red-600 text-red-600"} border px-2  rounded-full`}>{data.idea.status}</p>
                    </div>
                    <div className="flex items-center gap-3 font-medium italic text-gray-500">
                        {data.idea.tags.map((tag) => (
                            <>
                            <p>#{tag}</p>
                            <p className="mb-2">.</p>
                            </>
                        ))
                        }
                    </div>
                </div>
                <div className="flex gap-5 [&_*]:cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Heart/>
                        <span>2k likes</span>
                    </div>
                    <Bookmark/>
                    <Forward/>
                    <MessageCircle/>
                </div>
            </div>
        </div>
        <div className="prose text-xl box-border font-Poppins">
            <p>{data.idea.summary}</p>
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5">Description</h1>
            <div>{displayDesc}</div>
            {data.idea.skills.length > 0 && 
            <>
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5 m-0">Skills Required</h1>
                <ul className="list-disc px-10 py-5 m-0">
                    {data.idea.skills.map((skill) => (
                        <>
                            <li>{skill}</li>
                        </>
                    ))}
                </ul>
            </>
            }
        </div>
        </>
        }
    </div>
    <Footer/>
    </>
  )
}
