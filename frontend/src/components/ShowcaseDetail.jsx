import Navbar from "./Navbar"
import Footer from "./Footer"
import { Heart, Eye, Forward, MessageCircle,Bookmark } from "lucide-react"
import { useQuery } from "@apollo/client"
import { GET_SHOWCASE } from "@/graphql/CRUD"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import parse from 'html-react-parser'

export default function ShowcaseDetail() {

    const {id} = useParams()
    const {data,loading,error} = useQuery(GET_SHOWCASE,{variables:{showcaseId: id}})
    const [displayDesc,setDisplayDesc] = useState()

    useEffect(() => {
        const getParsedValue = async () => {
            const parsedValue = await parse(data.showcase.description)
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
                {data.showcase.user.details.profileImage ? 
                <>
                    <img src={data.showcase.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                    <p>{data.showcase.user.name}</p>
                </>
                    :
                    <>
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>{data.showcase.user.name[0]}</p>
                        </div>
                        <p>{data.showcase.user.name}</p>
                    </>
                }
            </div>
            <div>
                <button className="bg-green-600 text-white p-2 px-4 font-medium rounded-full text-sm">Contact</button>
            </div>
        </div>
        <img className="border mb-5 mt-0 w-full rounded-xl" src={data.showcase.thumbnail} alt="not uploaded" />
        <div className="prose text-xl box-border font-Poppins">
            <p>{data.showcase.summary}</p>
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5">Description</h1>
            <div>{displayDesc}</div>
        </div>
        <h1 className="text-2xl">Check Out The Project <a className="underline" href={data.showcase.showcaseLink}>Here</a></h1>
        <hr className="border-2 w-full" />
        <div>
            <h1 className="pb-10 text-3xl font-semibold">Feedbacks</h1>
            <div className="flex flex-col gap-5 overflow-y-auto">
            {data.showcase.feedback.map((feedback) => (
                <>
                <div>
                    <div className="flex items-center gap-3">
                    {feedback.user.details.profileImage ? 
                    <>
                        <img src={feedback.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                        <p>{feedback.user.name}</p>
                    </>
                        :
                        <>
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                                <p>{feedback.user.name[0]}</p>
                            </div>
                            <p>{feedback.user.name}</p>
                        </>
                    }
                    </div>
                    <div className="my-2 p-5 bg-slate-200 rounded-md">
                        <p>{feedback.comment}</p>
                        <p>Rating: {feedback.rating}/5</p>
                    </div>
                </div>
                </>
            ))}
            </div>
        </div>
        </>
        }
    </div>
    <Footer/>
    </>
  )
}
