import { useEffect } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Link, useNavigate } from "react-router-dom"

export default function Hero() {
    
    const navigate = useNavigate()

    const getCookie = (cookieName) => {

        const cDecoded = decodeURIComponent(document.cookie)
        const cArray = cDecoded.split("; ")
        let result;
    
        cArray.forEach(cookie => {
            if(cookie.indexOf(cookieName) == 0){
                result = cookie.substring(cookieName.length + 1)
            }
        })
    
        return result
    }

    useEffect(() =>{
        if(getCookie("user")){
            navigate("/home",{replace: true})
        }
    })

  return (
    <div>
        <Navbar/>

        {/* Hero Section */}

        <div className="flex items-center justify-center border-black border-b-2 bg-orange-200 bg-thumbnail font-space py-10 pl-5 lg:p-16 bg-cover lg:bg-[20%] lg:h-[80dvh]">
            <h1 className="text-[2.5rem] leading-[3rem] lg:text-[9rem] lg:leading-[10rem] font-bold">THE COLLABORATION PLATFORM</h1>
        </div>

        {/* Welcome Message */}

        <div className="flex items-center justify-center bg-wavy bg-center bg-[#FFC0CB] py-32 border-black border-b-2">
            <div className="flex flex-col gap-5 lg:gap-10 items-center bg-white border-black border-2 lg:border-4 font-space h-fit px-4 lg:px-20 py-10 w-4/5 lg:w-1/2">
                <h1 className="text-xl lg:text-3xl font-bold">"Welcome to WeCollab"</h1>
                <p className="text-center text-[0.7rem] lg:text-[1.1rem] leading-[1.4rem] lg:leading-7">WeCollab is An online platform connecting passionate minds for collaborative projects. Create detailed profiles, discover project opportunities tailored to your skills, and build lasting partnerships with like-minded individuals worldwide. Join our vibrant community, unlock the power of collaboration.</p>
                <div>    
                    <Link className="w-5/12 lg:w-3/12 lg:text-2xl" to="/signup">
                        <button className="bg-yellow-300 self lg:p-2 p-1 border-black border-2 lg:border-4">Join Now</button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Open Idea Section */}

        <div className="flex items-center bg-[#FFECA8]">
            <div className="flex flex-col bg-purple-300 gap-5 lg:gap-20 font-space lg:p-24 border-black border-r-2 w-1/2 py-10 p-5">
                <h1 className="text-xl lg:text-7xl">
                    <span className="text-yellow-300 underline underline-offset-8 decoration-yellow-300 decoration-2">OPEN</span> IDEAS
                </h1>
                <p className="text-[0.7rem] lg:text-3xl leading-6 lg:leading-[3.5rem]">Ignite Your Ideas with WeCollab's Open Idea Section. Share your innovative concepts, find passionate collaborators, and turn your visions into reality through the power of collaboration.</p>
                <button className="text-[0.7rem] lg:text-2xl border-black border-2 lg:border-4 py-1 px-1 bg-yellow-300 w-1/2 lg:w-1/3">Go There ↗</button>
            </div>
            <div className="flex w-1/2 bg-[#FFECA8]">
                <img className="px-4 lg:px-24" src="./assets/idea-stack.png" alt="A shelf which has open shelves" />
            </div>
        </div>

        <Footer/>
    </div>
  )
}
