import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import Experience from "./Experience"
import ProfileSkill from "./ProfileSkill"
import ProfilePopup from "./ProfilePopup"
import { GET_USER, UPDATE_USER } from "../graphql/CRUD"
import { imageDB } from "../firebase/config"
import { ref,getDownloadURL } from "firebase/storage"
import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client/"
import { Progress } from "@/components/ui/progress"
import { useUserStore } from "@/zustand/store"
import DeletePopup from "./DeletePopup"
import { Edit } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

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
    const navigate = useNavigate()

    const [selectedSection,setSection] = useState()
    const [isVisible,setVisible] = useState(false)
    const [isDeleteVisible,setDeleteVisible] = useState(false)
    const [downloadURL,setDownloadURL] = useState()
    const [completedSection,setCompletedSection] = useState([])
    const {loading,error,data} = useQuery(GET_USER,{variables: { email }})
    const [updateUser,{ data: userData, loading: userLoading, error: userError }] = useMutation(UPDATE_USER)

    const handleSection = (e) => {
        setSection(e.target.innerHTML)
        setVisible(true)
    }

    const handleEdit = (value) => {
        setSection(value)
        setVisible(true)
    }

    const changeVisiblity = () => {
        setVisible(false)
    }

    const handleDelete = (property, operation, matchItem) => {
        if(property === "details.experience"){
            const { role, duration, company } = matchItem
            updateUser({ variables: { id: data.user.id, property, operation, matchItem: { experience: { role, duration, company } }} })
                .then(() => {
                    toast.success("Delete successful", {
                        className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                    })
                }).catch((err) => {
                    toast.error(err?.message, {
                        className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                    })
                    console.error(err)
                })
        }else if(property === "details.skills"){
            const {skill} = matchItem
            updateUser({ variables: { id:data.user.id, property, operation, matchItem: { skill } } })
                .then(() => {
                    toast.success("Delete successful", {
                        className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                    })
                }).catch((err) => {
                    toast.error(err?.message, {
                        className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                    })
                    console.error(err)
                })
        }
    }

    const changeDeleteVisibility = () => {
        setDeleteVisible(!isDeleteVisible)
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
        if(section.length < 5){
            try{
                updateUser({ variables: {id: data.user.id, property: "completedSection", userData: { section: section }} })
            }catch(error){
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if(!getCookie("user")){
            navigate("/")
        }
        showDownloadURL()
        if (data) setCompletedSection(data.user.completedSection)
        if(loading) console.log(loading)
        else if(error) console.error(error)
    },[isVisible,loading])
    
  return (
    <>
        <Navbar/>
        {/* Profile */}
        {data && 
        (<div className="flex flex-col items-center font-Poppins p-5 justify-center bg-[#fff3e6] pt-24 pb-10 lg:py-12">
            <div className="lg:w-1/2 md:w-2/3 flex flex-col w-full py-3 border-black border rounded-lg relative bg-white">
                <div className="h-[20dvh] border-black border-b"></div>
                <img className="absolute top-28 left-5 border-black border size-32 rounded-full bg-white" src={`${downloadURL ? downloadURL : "/assets/profile-placeholder.png"}`} alt="" />
                <Edit onClick={() => handleEdit("Edit Profile")} className="self-end m-4 cursor-pointer" />
                <div className="px-5">
                    <div className="flex items-center justify-between">
                        <div className="pt-5">
                            <h1 className="text-3xl font-semibold">{data.user.name}</h1>
                            <p className="text-gray-600 pt-1">{data.user.details?.currentPosition}</p>
                        </div>
                        <button className="bg-green-600 px-3 py-1 rounded-full text-white font-semibold">Contact</button>
                    </div>
                    { data.user.details?.status === "Open to collaborate" ?
                    <div className="bg-green-200 px-3 py-1 my-5 rounded-full inline-block border-green-800 border-2 text-green-800 font-semibold">{data.user.details.status}</div>
                    :
                    <div className="bg-red-200 px-3 py-1 my-5 rounded-full inline-block border-red-800 border-2 text-red-800 font-semibold">{data.user.details.status}</div>
                    }
                </div>
            </div>
           { completedSection.length < 5 && <div className="lg:w-1/2 md:w-2/3 mt-2 flex flex-col w-full border-black border rounded-lg relative bg-white p-5 gap-5">
                    <div className="font-semibold">
                        <h1 className="text-3xl py-5">Suggested for you</h1>
                        <p>Completed {completedSection.length}/5</p>
                        <Progress value={(completedSection.length/5)*100 || 1} />
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
            </div>}
            <About description={data.user.details?.about} handleEdit={handleEdit} />
            <Experience experience={data.user.details?.experience} handleEdit={handleEdit} changeDeleteVisibility={changeDeleteVisibility} setSection={setSection} />
            <ProfileSkill skills={data.user.details?.skills} handleEdit={handleEdit} changeDeleteVisibility={changeDeleteVisibility} setSection={setSection} />
        </div>)}
        {isVisible && <ProfilePopup userId={data.user.id} section={selectedSection} changeVisibility={changeVisiblity} handleCompletion={handleCompletion} />}
        { data && isDeleteVisible && <DeletePopup data={data.user} section={selectedSection} changeDeleteVisibility={changeDeleteVisibility} deleteItem={handleDelete} />}
        <Footer/>
    </>
  )
}
