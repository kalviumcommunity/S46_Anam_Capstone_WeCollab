import { useNavigate } from "react-router-dom"


export default function Project() {

    const navigate = useNavigate()

    const handleSelection = () => {
        navigate("/project")
    }

  return (
        <div className="lg:w-[55dvw] h-full overflow-y-auto font-Poppins border-black lg:border-x-2 lg:flex items-center lg:items-start flex-col gap-10">
                    
            {/* Projects  */}

            <div className="grid w-full">
                <div onClick={handleSelection} className="min-h-[25rem] py-5 px-5 lg:px-12 w-full border-black border-b-2">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-bold rounded-full bg-orange-600 h-10 w-10">
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
                    <div className="flex gap-5 py-5">
                        <p>Likes</p>
                        <p>Add to Collections</p>
                    </div>
                </div>
                <div className="min-h-[25rem] py-5 px-5 lg:px-12 w-full border-black border-b-2">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-bold rounded-full bg-orange-600 h-10 w-10">
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
                    <div className="flex gap-5 py-5">
                        <p>Likes</p>
                        <p>Add to Collections</p>
                    </div>
                </div>
                <div className="h-[25rem] py-5 px-5 lg:px-12 w-full border-black border-b-2">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-bold rounded-full bg-orange-600 h-10 w-10">
                            <p>A</p>
                        </div>
                        <div>
                            <p>Username</p>
                            <p className="text-[0.8rem] text-gray-500">Profession</p>
                        </div>
                    </div>
                </div>
                <div className="h-[25rem] py-5 px-5 lg:px-12 w-full border-black border-b-2">
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer text-white font-bold rounded-full bg-orange-600 h-10 w-10">
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
  )
}
