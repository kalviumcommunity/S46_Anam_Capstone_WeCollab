import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GET_ALL_IDEAS } from "@/graphql/CRUD"
import { useQuery } from "@apollo/client"
import { Heart, CirclePlus, ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Idea() {

    const navigate = useNavigate()
    const [isVisible,setVisible] = useState(false)
    const {data,loading,error} = useQuery(GET_ALL_IDEAS)

    useEffect(() =>{
        if(!loading) console.log(data)
    },[loading])

  return (
    <>
    <div className="lg:w-[60dvw] h-full px-10 overflow-y-auto hide-scrollbar font-Poppins border-black border-l lg:flex items-center lg:items-start flex-col gap-12">
        <div className="w-full sticky top-0 pt-6 bg-white">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold py-5">Open Ideas</h1>
                <button onClick={() => navigate("/post/idea")} className="flex lg:hidden w-1/3 gap-3 justify-center p-1 bg-yellow-400 border-black border-2 rounded-lg">
                    <CirclePlus/>
                    Contribute
                </button>
            </div>
            <hr className="border-slate-100 border w-full" />
        </div>
        <div className="flex lg:hidden justify-end pt-5">
            <button onClick={() => setVisible(!isVisible)} className="flex items-center gap-3 py-2 px-4 rounded-full">
                <ListFilter className="size-5" />
                <p>Filter</p>
            </button>
        </div>
        <div className={`w-full lg:hidden ${isVisible ? "pt-5" : "h-0"} transition-all pb-5`}>
            <Select>
                <SelectTrigger className={`w-full text-[1rem] ${isVisible ? "" : "invisible"} border-0`}>
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="outdoor Activity">Outdoor Activity</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {data && data.ideas.map((idea) => (
            <div key={idea.id}>
                <div className="flex items-center gap-2 mb-3">
                {idea.user.details.profileImage ? 
                    <img src={idea.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                    :
                    <>
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>{idea.user.name[0]}</p>
                        </div>
                        <p>{idea.user.name}</p>
                    </>
                }
                </div>
                <p className="italic">{idea.summary}</p>
                <div className="flex items-center gap-5">
                    <img src={idea.thumbnail} className="rounded-xl bg-slate-200 min-w-[10rem] size-40 my-5"></img>
                    <div>
                        <h1 onClick={() => navigate(`/ideas/${idea.id}`)} className="text-3xl hover:underline cursor-pointer font-semibold">{idea.title}</h1>
                        <div className="flex items-center gap-2">
                            <p>1k read</p>
                            <p className="mb-2">.</p>
                            <p className={` ${idea.status == "Open"? "border-green-600 text-green-600" : "border-red-600 text-red-600"}  inline-block border px-2  rounded-full`}>{idea.status}</p>
                        </div>
                        <div className="flex mt-3 gap-2">
                            <Heart className="cursor-pointer"/>
                            <span>2k likes</span>
                        </div>
                    </div>
                </div>
            </div>
            ))
        }
    </div>
    <div className="my-16 hidden lg:block font-Poppins font-medium">
        <Select>
            <SelectTrigger className="w-full border-slate-400 border h-10">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="outdoor Activity">Outdoor Activity</SelectItem>
            </SelectContent>
        </Select>
        <div className="flex flex-col gap-3 border-slate-400 border w-[15rem] rounded-xl my-5 p-5">
            <h1 className="text-xl font-semibold">Top Reads</h1>
            <div className="flex text-sm items-center gap-2">
                <img className="rounded-xl bg-slate-200 min-w-[4rem] size-16"/>
                <p>How to change your mind?</p>
            </div>
            <div className="flex text-sm items-center gap-2">
                <img className="rounded-xl bg-slate-200 min-w-[4rem] size-16"/>
                <p>Transcend your mind</p>
            </div>
            <div className="flex text-sm items-center gap-2">
                <img className="rounded-xl bg-slate-200 min-w-[4rem] size-16"/>
                <p>AI Engine</p>
            </div>
        </div>
        <button onClick={() => navigate("/post/idea")} className="flex w-full gap-3 justify-center p-2 bg-yellow-400 border-black border-2 rounded-lg">
            <CirclePlus/>
            Contribute
        </button>
    </div>
    </>
  )
}
