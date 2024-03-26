import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import Experience from "./Experience"
import Skill from "./Skill"

export default function Profile() {

  return (
    <>
        <Navbar/>

        {/* Profile */}

        <div className="flex flex-col items-center font-raleway p-5 justify-center bg-orange-50 pt-24 pb-10 lg:py-32">
            <div className="lg:w-1/2 flex flex-col w-full py-3 border-black border-2 rounded-md relative bg-white">
                <div className="h-[20dvh] border-black border-b-2"></div>
                <img className="absolute top-24 left-5 border-black border-2 size-32 rounded-full bg-white" src="" alt="" />
                <img className="size-6 self-end m-4 cursor-pointer" src="./assets/edit.svg" alt="" />
                <div className="px-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold">Anam Ashraf</h1>
                            <p>Software Developer</p>
                        </div>
                        <button className="bg-green-600 px-3 py-1 rounded-full text-white font-semibold">Contact</button>
                    </div>
                    <div className="bg-green-200 px-3 py-1 my-5 rounded-full inline-block border-green-800 border-2 text-green-800 font-semibold">Open to Collaborate</div>
                </div>
            </div>
            <About/>
            <Experience/>
            <Skill/>
        </div>
        <Footer/>
    </>
  )
}
