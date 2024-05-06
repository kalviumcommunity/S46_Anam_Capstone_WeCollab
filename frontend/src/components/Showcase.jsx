import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Showcase() {

    const navigate = useNavigate()

    const handleSelection = () => {
        navigate("/project")
    }

  return (

    <>
        <div className="lg:w-[45dvw] md:w-[80dvw] h-full overflow-y-auto hide-scrollbar font-Poppins border-black lg:border-x md:border-x lg:flex items-center lg:items-start flex-col gap-10">
                    
            {/* Projects  */}

            <div className="grid w-full">
                <div onClick={handleSelection} className="min-h-[25rem] py-5 px-8 lg:px-12 w-full border-black border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>A</p>
                        </div>
                        <div>
                            <p>Username</p>
                            <p className="text-[0.8rem] text-gray-500">Profession</p>
                        </div>
                    </div>
                    <div className="py-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima reprehenderit inventore suscipit sapiente laudantium enim dolorem, veniam facilis eos saepe sit nulla itaque quas reiciendis quidem rem labore quam.
                    </div>
                    <div className="h-[22.5rem] bg-slate-200 rounded-xl"></div>
                    <div className="flex gap-5 pt-5">
                        <p>Likes</p>
                        <p>Add to Collections</p>
                    </div>
                </div>
                <div className="min-h-[25rem] py-5 px-8 lg:px-12 w-full border-black border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>A</p>
                        </div>
                        <div>
                            <p>Username</p>
                            <p className="text-[0.8rem] text-gray-500">Profession</p>
                        </div>
                    </div>
                    <div className="py-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima reprehenderit inventore suscipit sapiente laudantium enim dolorem, veniam facilis eos saepe sit nulla itaque quas reiciendis quidem rem labore quam.
                    </div>
                    <div className="h-[22.5rem] bg-slate-200 rounded-xl"></div>
                    <div className="flex gap-5 pt-5">
                        <p>Likes</p>
                        <p>Add to Collections</p>
                    </div>
                </div>
                <div className="h-[25rem] py-5 px-8 lg:px-12 w-full border-black border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>A</p>
                        </div>
                        <div>
                            <p>Username</p>
                            <p className="text-[0.8rem] text-gray-500">Profession</p>
                        </div>
                    </div>
                </div>
                <div className="h-[25rem] py-5 px-8 lg:px-12 w-full border-black border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-semibold rounded-full bg-orange-600 h-10 w-10">
                            <p>A</p>
                        </div>
                        <div>
                            <p>Username</p>
                            <p className="text-[0.8rem] text-gray-500">Profession</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className="p-10 hidden lg:pl-10 lg:block md:block md:p-5 font-Poppins">
                    <input className="hidden lg:block md:block w-full border-black border pl-8 pr-4 py-1 bg-search bg-contain bg-no-repeat rounded-full" placeholder="Search Projects" type="text" />
                    <div className="my-5">
                        <Select>
                            <SelectTrigger className="w-full border-0">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tech">Tech</SelectItem>
                                <SelectItem value="art">Art</SelectItem>
                                <SelectItem value="outdoor Activity">Outdoor Activity</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full border-0">
                                <SelectValue placeholder="Project Size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="big">Big</SelectItem>
                                <SelectItem value="med">Medium</SelectItem>
                                <SelectItem value="small">Small</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full border-0">
                                <SelectValue placeholder="Skills" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="big">Skill 1</SelectItem>
                                <SelectItem value="med">Skill 2</SelectItem>
                                <SelectItem value="small">Skill 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
            </div>
    </>
  )
}
