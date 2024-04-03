import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import Experience from "./Experience"
import Skill from "./Skill"
import ProfilePopup from "./ProfilePopup"
import { useState } from "react"

export default function Profile() {

    const [selectedSection,setSection] = useState()
    const [isVisible,setVisible] = useState(false)

    const handleSection = (e) => {
        setSection(e.target.innerHTML)
        setVisible(true)
    }

    const changeVisiblity = () => {
        setVisible(false)
    }

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
            <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5 gap-5">
                    <div className="font-semibold">
                        <h1 className="text-3xl py-5">Suggested for you</h1>
                        <p>Completed 2/5</p>
                        <div className="bg-blue-100 rounded-full">
                            <div className="bg-blue-400 w-1/3 p-1 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex gap-5 text-[0.8rem] lg:text-xl overflow-x-auto">
                        <div className="min-w-[50dvw] lg:min-w-[20vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold">
                            <p>Upload photo and show yourself to the community</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add profile photo</button>
                        </div>
                        <div className="min-w-[50dvw] lg:min-w-[20vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold">
                            <p>Write about yourself and let others know you</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add about</button>
                        </div>
                        <div className="min-w-[50dvw] lg:min-w-[20vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold">
                            <p>Let your potential collaborators know your profession</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add your profession</button>
                        </div>
                        <div className="min-w-[50dvw] lg:min-w-[20vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold">
                            <p>Highlight your experience and stand out</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add experience</button>
                        </div>
                        <div className="min-w-[50dvw] lg:min-w-[20vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold">
                            <p>Show off your skills and help collaborators find you</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add skills</button>
                        </div>
                    </div>
            </div>
            <About/>
            <Experience/>
            <Skill/>
        </div>
        {isVisible && <ProfilePopup section={selectedSection} changeVisibility={changeVisiblity} />}
        <Footer/>
    </>
  )
}
