import { Heart,Eye,ListFilter, ArrowUp } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { GET_ALL_PROJECTS } from "@/graphql/CRUD"
import { useQuery } from "@apollo/client"

export default function Project() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get("search")
    const [searchInput,setSearchInput] = useState()
    const [isVisible,setVisible] = useState(false)
    const [showScrollUp,setShowScrollUp] = useState()
    const scrollRef = useRef()

    const {data,loading,error} = useQuery(GET_ALL_PROJECTS)

    const handleSearch = (event) => {
        if(event.key === "Enter"){
            if(searchInput.trim() !== ""){
                navigate(`/showcase?search=${searchInput}`)
            }
            setSearchInput("")
        }
    }

    const handleScroll = () => {
        const {scrollTop} = scrollRef.current
        if(scrollTop >= 100){
            setShowScrollUp(true)
        }else{
            setShowScrollUp(false)
        }
    }

    const scrollToTop = () => {
        scrollRef.current.scrollTo({top:0,behavior:"smooth"})
    }

    useEffect(() => {
        if(!loading){
            console.log(data)
        }
    },[loading])

  return (
    <>
        <div onScroll={handleScroll} ref={scrollRef} className="flex flex-col w-full py-12 h-full items-center px-10 lg:px-20 overflow-y-auto hide-scrollbar font-Poppins border-black border-l">
            <input value={searchInput} onKeyDown={handleSearch} onChange={(e) => setSearchInput(e.target.value)} className="w-full lg:w-1/2 md:w-1/2 border-black border pl-12 pr-4 py-2 bg-search bg-contain bg-no-repeat rounded-lg mb-10" placeholder="Search Projects" type="text" />
            {searchValue &&<p className="text-3xl font-semibold mb-10">{searchValue}</p>}
            <div className="flex self-start items-center w-full justify-between">
                <Select>
                    <SelectTrigger className="w-[120px] border h-10">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="outdoor Activity">Outdoor Activity</SelectItem>
                    </SelectContent>
                </Select>
                <button onClick={() => setVisible(!isVisible)} className="flex items-center gap-3 border-black border py-2 px-4 rounded-full">
                    <ListFilter className="size-5" />
                    <p>Filter</p>
                </button>
            </div>
            <div onClick={scrollToTop} className={`fixed cursor-pointer right-4 bg-white md:right-8 lg:right-8 ${showScrollUp ? "opacity-100" : "opacity-0"} transition-opacity bottom-32 md:bottom-10 lg:bottom-10 p-2 border-black border rounded-full`}>
                <ArrowUp className="lg:h-[inherit] lg:w-[inherit] size-4"/>
            </div>
            <div className={`w-full ${isVisible ? "pt-5" : "h-0"} transition-all pb-10`}>
                <Select>
                    <SelectTrigger className={`w-full text-[1rem] ${isVisible ? "" : "invisible"} border-0 pr-6`}>
                        <SelectValue placeholder="Project Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="big">Big</SelectItem>
                        <SelectItem value="med">Medium</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className={`w-full text-[1rem] ${isVisible ? "" : "invisible"} border-0 pr-6`}>
                        <SelectValue placeholder="Skills" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="big">Skill 1</SelectItem>
                        <SelectItem value="med">Skill 2</SelectItem>
                        <SelectItem value="small">Skill 3</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 w-full lg:gap-y-5 lg:gap-x-10 gap-10 content-start md:gap-3">
                {data && data.projects.map((project) => (

                    <div key={project.id} onClick={() => navigate(`/project/${project.id}`)} className="w-full">
                        <div className="flex flex-col justify-between h-[25rem] w-full rounded-lg border-black border bg-slate-100 p-3">
                            <div className="flex items-center gap-3">
                                {project.user.details.profileImage ? 
                                    <div className="flex items-center gap-3">
                                        <img src={project.user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                                        <p>{project.user.name}</p>
                                    </div>
                                    :
                                    <>
                                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-raleway font-semibold rounded-full bg-orange-600 h-10 w-10">
                                            <p>{project.user.name[0]}</p>
                                        </div>
                                        <p>{project.user.name}</p>
                                    </>
                                }
                            </div>
                            <div className="pt-2">
                                <h1 className="text-2xl py-2 font-semibold">{project.title}</h1>
                            </div>
                            <div className="text-sm text-gray-400 pb-2">
                                <p>{project.createdAt}</p>
                            </div>
                            <div className="h-1/2 w-full">
                                <img className="h-full w-full rounded-md" src={project.thumbnail} alt="" />
                            </div>
                            <div className="flex text-sm items-center justify-between my-3 px-2">
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1">
                                        <Heart/>
                                        <p>2k</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye/>
                                        <p>6k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    </>
  )
}
