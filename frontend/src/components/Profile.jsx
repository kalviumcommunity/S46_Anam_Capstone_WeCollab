import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import Experience from "./Experience"
import Skill from "./Skill"
import ProfilePopup from "./ProfilePopup"
import { GET_USER } from "../graphql/CRUD"
import { imageDB } from "../firebase/config"
import { ref,getDownloadURL } from "firebase/storage"
import { useEffect, useState } from "react"
import {useQuery} from "@apollo/client/"

export default function Profile() {

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

    const email = getCookie("user")

    const [selectedSection,setSection] = useState()
    const [isVisible,setVisible] = useState(false)
    const [downloadURL,setDownloadURL] = useState()
    const [completedSection,setCompletedSection] = useState([])
    const {loading,error,data} = useQuery(GET_USER,{variables: { email }})

    const handleSection = (e) => {
        setSection(e.target.innerHTML)
        setVisible(true)
    }

    const changeVisiblity = () => {
        setVisible(false)
    }

    const showDownloadURL = async () => {
        if(data){
            const imageRef = ref(imageDB,`files/profile-${data.user.id}`)
            const url = await getDownloadURL(imageRef)
            setDownloadURL(url)
        }
    }

    const handleCompletion = (section) => {
        setCompletedSection((prevState) => [...prevState,section])
    }

    useEffect(() => {
        showDownloadURL()
        if(loading) console.log(loading)
        else if(error) console.error(error)
        if(!loading) console.log(data)
    },[loading])

  return (
    <>
        <Navbar/>
        {/* Profile */}

        {data && 
        <div className="flex flex-col items-center font-raleway p-5 justify-center bg-orange-50 pt-24 pb-10 lg:py-32">
            <div className="lg:w-1/2 flex flex-col w-full py-3 border-black border-2 rounded-md relative bg-white">
                <div className="h-[20dvh] border-black border-b-2"></div>
                <img className="absolute top-24 left-5 border-black border-2 size-32 rounded-full bg-white" src={`${downloadURL ? downloadURL : "./assets/profile-placeholder.png"}`} alt="" />
                <img className="size-6 self-end m-4 cursor-pointer" src="./assets/edit.svg" alt="" />
                <div className="px-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold">{data.user.name}</h1>
                            <p>{data.user.details?.currentPosition}</p>
                        </div>
                        <button className="bg-green-600 px-3 py-1 rounded-full text-white font-semibold">Contact</button>
                    </div>
                    <div className="bg-green-200 px-3 py-1 my-5 rounded-full inline-block border-green-800 border-2 text-green-800 font-semibold">Open to Collaborate</div>
                </div>
            </div>
            <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5 gap-5">
                    <div className="font-semibold">
                        <h1 className="text-3xl py-5">Suggested for you</h1>
                        <p>Completed {completedSection.length}/5</p>
                        <div className="bg-blue-100 rounded-full">
                            <div className={`bg-blue-400 w-10 p-1 rounded-full`}></div>
                        </div>
                    </div>
                    <div className="flex gap-5 text-[0.8rem] lg:text-[1.15rem] overflow-x-auto">
                        <div className={`${completedSection.includes("photo") ? "hidden" : ""} min-w-[50dvw] lg:min-w-[20vw] lg:max-w-[25vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold`}>
                            <p>Upload photo and show yourself to the community</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add profile photo</button>
                        </div>
                        <div className={`${completedSection.includes("about") ? "hidden" : ""} min-w-[50dvw] lg:min-w-[20vw] lg:max-w-[25vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold`}>
                            <p>Write about yourself and let others know you</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add about</button>
                        </div>
                        <div className={`${completedSection.includes("currentPosition") ? "hidden" : ""} min-w-[50dvw] lg:min-w-[20vw] lg:w-[25vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold`}>
                            <p>Let your potential collaborators know your profession</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add your profession</button>
                        </div>
                        <div className={`${completedSection.includes("experience") ? "hidden" : ""} min-w-[50dvw] lg:min-w-[20vw] lg:w-[25vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold`}>
                            <p>Highlight your experience and stand out</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add experience</button>
                        </div>
                        <div className={`${completedSection.includes("skills") ? "hidden" : ""} min-w-[50dvw] lg:min-w-[20vw] lg-w-[25vw] flex flex-col justify-center bg-blue-50 p-5 gap-3 font-semibold`}>
                            <p>Show off your skills and help collaborators find you</p>
                            <button onClick={handleSection} className="border-blue-600 border-2 rounded-full p-1 hover:bg-blue-100 text-blue-600">Add skills</button>
                        </div>
                    </div>
            </div>
            <About description={data.user.details?.about}/>
            <Experience experience={data.user.details?.experience} />
            <Skill skills={data.user.details?.skills} />
        </div>}
        {isVisible && <ProfilePopup userId={data.user.id} section={selectedSection} changeVisibility={changeVisiblity} handleCompletion={handleCompletion} />}
        <Footer/>
    </>
  )
}
