import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Heart, CirclePlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Idea() {

    const navigate = useNavigate()

  return (
    <>
    <div className="lg:w-[50dvw] h-full px-10 overflow-y-auto hide-scrollbar font-Poppins border-black border-l lg:flex items-center lg:items-start flex-col gap-12">
        <div className="w-full sticky top-0 pt-6 bg-white">
            <h1 className="text-4xl font-semibold py-5">Open Ideas</h1>
            <hr className="border-slate-100 border w-full" />
        </div>
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-8 w-8">
                    <p>A</p>
                </div>
                <div>
                    <p>Anam Ashraf</p>
                </div>
            </div>
            <p className="italic">Here is how you change your mind</p>
            <div className="flex items-center gap-5">
                <div className="rounded-xl bg-slate-200 min-w-[10rem] size-40 my-5"></div>
                <div>
                    <h1 onClick={() => navigate("/ideas/1")} className="text-3xl hover:underline cursor-pointer font-semibold">How to change your mind? </h1>
                    <div className="flex items-center gap-2">
                        <p>1k read</p>
                        <p className="mb-2">.</p>
                        <p className="border-green-600 inline-block border px-2 text-green-600 rounded-full">Open</p>
                    </div>
                    <div className="flex mt-3 gap-2">
                        <Heart className="cursor-pointer"/>
                        <span>2k likes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-8 w-8">
                    <p>A</p>
                </div>
                <div>
                    <p>Anam Ashraf</p>
                </div>
            </div>
            <p className="italic">Meditate and transcend</p>
            <div className="flex items-center gap-5">
                <div className="rounded-xl bg-slate-200 min-w-[10rem] size-40 my-5"></div>
                <div>
                    <h1 className="text-3xl hover:underline cursor-pointer font-semibold">Transcend your mind and become liberated! </h1>
                    <div className="flex items-center gap-2">
                        <p>96 read</p>
                        <p className="mb-2">.</p>
                        <p className="border-red-600 border px-2 text-red-600 rounded-full">Closed</p>
                    </div>
                    <div className="flex mt-3 gap-2">
                        <Heart className="cursor-pointer"/>
                        <span>900 likes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-8 w-8">
                    <p>A</p>
                </div>
                <div>
                    <p>Anam Ashraf</p>
                </div>
            </div>
            <p className="italic">Develop an engine</p>
            <div className="flex items-center gap-5">
                <div className="rounded-xl bg-slate-200 min-w-[10rem] size-40 my-5"></div>
                <div>
                    <h1 className="text-3xl hover:underline cursor-pointer font-semibold">AI Engine</h1>
                    <div className="flex items-center gap-2">
                        <p>96 read</p>
                        <p className="mb-2">.</p>
                        <p className="border-red-600 border px-2 text-red-600 rounded-full">Closed</p>
                    </div>
                    <div className="flex mt-3 gap-2">
                        <Heart className="cursor-pointer"/>
                        <span>164 likes</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="my-16 font-Poppins font-medium">
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
