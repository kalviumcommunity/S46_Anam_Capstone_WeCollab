import logo from "../assets/logo.svg"
import resnav from "../assets/responsive-nav.svg"
import stack from "../assets/idea-stack.png"

export default function Home() {
  return (
    <div>
        <nav className="border-black border-b-2 flex justify-between items-center p-3">
            <div className="flex items-center gap-3 cursor-pointer">
                <img className="size-10 lg:size-[inherit]" src={logo} alt="" />
                <h1 className="text-2xl lg:text-3xl font-raleway font-bold pt-1">WeCollab</h1>
            </div>
            <div className="hidden md:flex lg:flex gap-10 font-space text-xl [&_*]:cursor-pointer">
                <p>Home</p>
                <p>Project</p>
                <p>Open Ideas</p>
            </div>
            <div className="hidden lg:block text-xl text-white font-raleway font-bold">
                <button className="rounded-full bg-orange-600 px-5 py-1">+ Join</button>
            </div>
            <img className="md:hidden lg:hidden" src={resnav} alt="" />
        </nav>
        <div className="flex items-center justify-center border-black border-b-2 bg-orange-200 bg-thumbnail font-space py-10 pl-5 lg:p-16 bg-cover lg:bg-[20%] lg:h-[80dvh]">
            <h1 className="text-[2.5rem] leading-[3rem] lg:text-[9rem] lg:leading-[10rem] font-medium">THE COLLABORATION PLATFORM</h1>
        </div>
        <div className="flex items-center justify-center bg-wavy bg-center bg-[#FFC0CB] h-[60dvh] lg:h-[80dvh] border-black border-b-2">
            <div className="flex flex-col gap-5 lg:gap-10 items-center bg-white border-black border-2 lg:border-4 font-space h-fit px-4 lg:px-20 py-10 w-4/5 lg:w-1/2">
                <h1 className="text-xl lg:text-3xl font-bold">"Welcome to WeCollab"</h1>
                <p className="text-center text-[0.7rem] lg:text-[1.1rem] leading-[1.4rem] lg:leading-7">WeCollab is An online platform connecting passionate minds for collaborative projects. Create detailed profiles, discover project opportunities tailored to your skills, and build lasting partnerships with like-minded individuals worldwide. Join our vibrant community, unlock the power of collaboration.</p>
                <button className="bg-yellow-300 w-5/12 lg:w-3/12 lg:py-2 lg:text-2xl border-black border-2 lg:border-4">Join Now</button>
            </div>
        </div>
        <div className="flex items-center bg-[#FFECA8] border-black border-b-2">
            <div className="flex flex-col bg-purple-300 gap-5 lg:gap-20 font-space lg:p-24 border-black border-r-2 w-1/2 py-10 p-5">
                <h1 className="text-xl lg:text-7xl">
                    <span className="text-yellow-300 underline underline-offset-8 decoration-yellow-300 decoration-2">OPEN</span> IDEAS
                </h1>
                <p className="text-[0.7rem] lg:text-3xl leading-6 lg:leading-[3.5rem]">Ignite Your Ideas with WeCollab's Open Idea Section. Share your innovative concepts, find passionate collaborators, and turn your visions into reality through the power of collaboration.</p>
                <button className="text-[0.7rem] lg:text-2xl border-black border-2 lg:border-4 py-1 px-1 bg-yellow-300 w-1/2 lg:w-1/3">Go There ↗</button>
            </div>
            <div className="flex w-1/2 bg-[#FFECA8]">
                <img className="px-4 lg:px-24" src={stack} alt="" />
            </div>
        </div>

        <footer className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-0 items-center justify-between p-10">
            <div className="flex flex-col items-center lg:items-start gap-5">
                <div className="flex gap-3 items-center cursor-pointer">
                    <img className="size-8 lg:size-[inherit]" src={logo} alt="" />
                    <h1 className="text-xl lg:text-3xl font-raleway font-bold pt-3">WeCollab</h1>
                </div>
                <p className="hidden lg:block font-space w-3/4">Collaborate, Innovate, Thrive with WeCollab</p>
                <p className="font-raleway">Created by <span className="underline italic cursor-pointer">Anam Ashraf</span></p>
            </div>
            <div className="flex gap-20">    
                <div className="font-raleway">
                    <h1 className="font-bold py-2">Quick Links</h1>
                    <ul className="[&_*]:cursor-pointer">
                        <li className="hover:underline">People</li>
                        <li className="hover:underline">Projects</li>
                        <li className="hover:underline">Open Ideas</li>
                    </ul>
                </div>
                <div className="font-raleway">
                    <h1 className="font-bold py-2">How it works</h1>
                    <ul>
                        <li className="hover:underline">FAQ</li>
                    </ul>
                </div>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-5 font-raleway">
                <h1 className="text-2xl w-3/4 text-right">Are you excited to collaborate?</h1>
                <button className="bg-orange-600 text-white px-4 py-2 w-1/3 font-bold">Join Now</button>
            </div>
        </footer>
    </div>
  )
}
