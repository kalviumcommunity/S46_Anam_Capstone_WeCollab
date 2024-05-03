import { useNavigate, useParams } from "react-router-dom"

export default function SideNavbar() {
    
    const navigate = useNavigate()
    const {section} = useParams()

  return (
    <div className={`w-full sticky transition-all ease-in-out items-center font-raleway lg:items-start lg:w-[20dvw] md:w-[30dvw] bg-white border-black border-t md:border-t-0 lg:border-t-0 lg:border-r-0 lg:static bottom-0 flex flex-col p-5 ${section === "showcase" ? "lg:py-10 lg:px-8 md:p-10" : "lg:py-10 lg:px-8 md:static"} font-semibold text-xl`}>
        <div className="flex lg:block md:block gap-12">
            <div onClick={() => navigate("/home")} className="flex hover:bg-slate-300 rounded-md cursor-pointer items-center">
                <img className="lg:size-12 md:size-8 size-10" src="/assets/projects.svg" alt="" />
                <p className="p-3 lg:text-xl rounded-md hidden lg:block md:block md:text-[1rem]">Projects</p>
            </div>
            <div onClick={() => navigate("/ideas")}  className="flex hover:bg-slate-300 rounded-md cursor-pointer items-center">
                <img className="lg:size-12 md:size-8 size-10" src="/assets/ideas.svg" alt="" />
                <p className="p-3 lg:text-xl rounded-md hidden lg:block md:block md:text-[1rem]">Open Ideas</p>
            </div>
            <div onClick={() => navigate("/showcase")}  className="flex hover:bg-slate-300 rounded-md cursor-pointer items-center">
                <img className="lg:size-12 md:size-8 size-10" src="/assets/showcase.svg" alt="" />
                <p className="p-3 lg:text-xl rounded-md hidden lg:block md:block md:text-[1rem]">Showcase</p>
            </div>
            <div onClick={() => navigate("/home")}  className="flex hover:bg-slate-300 rounded-md cursor-pointer items-center">
                <img className="lg:size-12 md:size-8 size-10" src="/assets/connect.svg" alt="" />
                <p className="p-3 lg:text-xl rounded-md hidden lg:block md:block md:text-[1rem]">Connect</p>
            </div>
            <div onClick={() => {navigate("/settings")}}  className="flex hover:bg-slate-300 rounded-md cursor-pointer items-center">
                <img className="lg:size-12 md:size-8 size-10" src="/assets/settings.svg" alt="" />  
                <p className="p-3 lg:text-xl rounded-md hidden lg:block md:block md:text-[1rem]">Settings</p>
            </div>
        </div>
        <hr />
    </div>
  )
}
