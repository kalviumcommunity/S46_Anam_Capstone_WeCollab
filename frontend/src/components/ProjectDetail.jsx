import Navbar from "./Navbar"
import Footer from "./Footer"

export default function ProjectDetail() {
  return (
    <>
        <Navbar/>
        <div className="flex flex-col items-center py-24 lg:py-32 font-Poppins">
            <div className="flex items-center justify-between w-5/6 lg:w-1/2">
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
                    <button className="bg-green-500 text-white px-3 py-2 rounded-full font-semibold">Contact</button>
                </div>
            </div>
            <div className="bg-gray-300 rounded-2xl w-5/6 lg:w-1/2 h-[25dvh] lg:h-[50dvh] m-10"></div>
            <div className="flex flex-col gap-5 w-5/6 lg:w-1/2">
                <h1 className="text-3xl font-bold">About</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta est magni laboriosam blanditiis, quia asperiores. Dolorum ex ut illum excepturi deserunt corporis sit similique pariatur, asperiores voluptas ducimus voluptatibus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga perspiciatis impedit delectus nobis blanditiis beatae doloremque praesentium expedita. Placeat, temporibus tenetur. Sint nam ipsa enim saepe illo possimus aut veritatis.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae modi quod illum rerum aliquam, autem maxime alias? Amet, iure! Quaerat et dolorum mollitia odio omnis? Porro provident consectetur sed voluptatibus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, labore voluptates! Reiciendis provident laboriosam, numquam consequatur nam aliquam itaque optio vero doloremque facere atque excepturi nesciunt possimus obcaecati consectetur laudantium.</p>
                <div className="flex flex-col gap-3 text-xl">
                    <p className="font-semibold">Team Size - <span className="bg-green-300 px-2 rounded-full">6 collaborators</span> </p>
                    <p className="font-semibold">Budget - <span className="bg-green-300 px-2 rounded-full">Rs. 20,000</span> </p>
                    <p className="font-semibold">Timeline - <span className="bg-green-300 px-2 rounded-full">6 months</span> </p>
                </div>
                <h1 className="text-3xl py-5 font-bold">Seeking</h1>
                <div className="grid lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-5 bg-[#bbb2cf] text-[#33294e] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">Programmer</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                    </div>
                    <div className="flex flex-col gap-5 bg-[#cb9ca2] text-[#35282a] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">Project Manager</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                    </div>
                    <div className="flex flex-col gap-5 bg-[#afbbbb] text-[#363b3b] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">UI Designer</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                    </div>
                    <div className="flex flex-col gap-5 bg-[#9ea7bb] text-[#353841] p-5 lg:p-10 rounded-xl">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-semibold">UX Designer</h1>
                            <p className="text-sm">Experience - 2 years</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos blanditiis, sequi est eaque laborum nobis accusamus unde quis soluta eveniet minus?</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
