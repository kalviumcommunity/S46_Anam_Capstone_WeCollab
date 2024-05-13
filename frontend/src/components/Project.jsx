import { Heart,Eye,ListFilter, ArrowUp } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Project() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get("search")
    const [searchInput,setSearchInput] = useState()
    const [isVisible,setVisible] = useState(false)
    const [showScrollUp,setShowScrollUp] = useState()
    const scrollRef = useRef()

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
            <div className="flex flex-wrap lg:gap-y-5 lg:gap-x-10 gap-10 content-start md:gap-3">
                <div className="w-full lg:w-fit md:w-fit">
                    <div className="lg:h-[16rem] md:h-[12rem] md:w-[15rem] lg:w-[20rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                    <div className="flex text-sm items-center justify-between gap-2 mt-3 px-2">
                        <div className="flex items-center md:gap-1 gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white rounded-full bg-orange-600 h-8 w-8">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Anam Ashraf</p>
                            </div>
                        </div>
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
                <div className="w-full lg:w-fit md:w-fit">
                    <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                    <div className="flex text-sm items-center justify-between gap-2 mt-3 px-2">
                        <div className="flex items-center md:gap-1 gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white rounded-full bg-orange-600 h-8 w-8">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Anam Ashraf</p>
                            </div>
                        </div>
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
                <div className="w-full lg:w-fit md:w-fit">
                    <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                    <div className="flex text-sm items-center justify-between gap-2 mt-3 px-2">
                        <div className="flex items-center md:gap-1 gap-3">
                            <div className="flex justify-center items-center text-xl cursor-pointer text-white rounded-full bg-orange-600 h-8 w-8">
                                <p>A</p>
                            </div>
                            <div>
                                <p>Anam Ashraf</p>
                            </div>
                        </div>
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
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
                <div className="lg:h-[16rem] lg:w-[20rem] md:h-[12rem] md:w-[15rem] h-[20rem] w-full rounded-lg bg-red-100"></div>
            </div>
        </div>
    </>
  )
}
