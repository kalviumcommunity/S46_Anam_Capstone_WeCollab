import Navbar from "./Navbar"
import Footer from "./Footer"

export default function ProjectDetail() {
  return (
    <>
        <Navbar/>
        <div className="flex flex-col items-center pb-20 font-Poppins">
            <h1 className="text-3xl lg:text-5xl font-semibold lg:w-1/2 w-5/6 py-10">Inner Adventure - Inventure</h1>
            <div className="flex justify-between items-center w-5/6 lg:w-1/2">
                <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center text-2xl cursor-pointer text-white font-raleway font-bold rounded-full bg-orange-600 h-12 w-12">
                        <p>A</p>
                    </div>
                    <div>
                        <p className="text-[1.15rem]">Anam Ashraf</p>
                        <p className="text-[0.8rem] text-gray-400">Few mins ago</p>
                    </div>
                </div>
                <div>
                    <button className="bg-green-500 text-white py-1 px-2 rounded-full font-semibold">Contact</button>
                </div>
            </div>
            <div className="bg-gray-300 rounded-2xl w-5/6 lg:w-1/2 h-[25dvh] lg:h-[50dvh] m-10"></div>
            <div className="flex flex-col gap-5 w-5/6 lg:w-1/2">
                <h1 className="text-3xl font-semibold">About</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta est magni laboriosam blanditiis, quia asperiores. Dolorum ex ut illum excepturi deserunt corporis sit similique pariatur, asperiores voluptas ducimus voluptatibus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga perspiciatis impedit delectus nobis blanditiis beatae doloremque praesentium expedita. Placeat, temporibus tenetur. Sint nam ipsa enim saepe illo possimus aut veritatis.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae modi quod illum rerum aliquam, autem maxime alias? Amet, iure! Quaerat et dolorum mollitia odio omnis? Porro provident consectetur sed voluptatibus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, labore voluptates! Reiciendis provident laboriosam, numquam consequatur nam aliquam itaque optio vero doloremque facere atque excepturi nesciunt possimus obcaecati consectetur laudantium.</p>
                <div className="grid grid-cols-2 py-3 px-10 bg-slate-200 border-slate-600 text-[1.2rem] border-l-4">
                    <div className="font-semibold">
                        <p className="my-1">Team Size</p>
                        <p className="my-1">Budget</p>
                        <p className="my-1">Timeline</p>
                    </div>
                    <div className="font-semibold">
                        <div>
                            <p className="px-2 my-1">- 6 collaborators</p>
                        </div>
                        <div>
                            <p className="px-2 my-1">- Rs. 20,000</p> 
                        </div>
                        <div>
                            <p className="px-2 my-1">- 6 months</p> 
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl py-5 font-semibold">Seeking</h1>
                <div className="grid lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-5 bg-[#bbb2cf] text-[#33294e] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">Programmer</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                        <h1 className="font-semibold py-2">Skills Required🔻</h1>    
                    </div>
                    <div className="flex flex-col gap-5 bg-[#cb9ca2] text-[#35282a] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">Project Manager (1s)</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                        <h1 className="font-semibold py-2">Skills Required🔻</h1>    
                    </div>
                    <div className="flex flex-col gap-5 bg-[#afbbbb] text-[#363b3b] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">UI Designer (2s)</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                        <h1 className="font-semibold py-2">Skills Required🔻</h1>    
                    </div>
                    <div className="flex flex-col gap-5 bg-[#9ea7bb] text-[#353841] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">UX Designer</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                        <h1 className="font-semibold py-2">Skills Required🔻</h1>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
