import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRef, useState } from "react"
import { imageDB } from "@/firebase/config"
import { ref, uploadBytes } from "firebase/storage"
import { toast } from 'sonner'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Roles from "./Roles"
import SeekingSkill from "./SeekingSkill"
import { useParams } from "react-router-dom"
import { Heart, Eye, Forward, MessageCircle,Bookmark } from "lucide-react"

export default function PostProject() {

    const {section} = useParams()

    const [skills,setSkills] = useState([])
    const [roles,setRoles] = useState([])
    const [experienceDuration,setExperienceDuration] = useState()
    const [timeline,setTimeline] = useState()
    const [about,setAbout] = useState()
    const [title,setTitle] = useState()
    const [collaborators,setCollaborators] = useState()
    const [displayBudget,setDisplayBudget] = useState()
    const [budget,setBudget] = useState()
    const [responsibility,setResponsibility] = useState()
    const [presentationLink,setPresentationLink] = useState()
    const [timelineDuration, setTimelineDuration] = useState()
    const [subtitle,setSubtitle] = useState()
    const skillRef = useRef()
    const roleRef = useRef()
    const vacancyRef = useRef()
    const experienceRef = useRef()

    const [image,setImage] = useState()
    const [uploaded,setUpload] = useState(false)
    const [loading,setLoading] = useState(false)
    
    const skillColors = [{bg: "#bbb2cf", text: "#33294e"},{bg: "#cb9ca2", text:"#35282a"},{bg:"#afbbbb", text:"#363b3b"},{bg:"#9ea7bb", text:"#353841"}] 

    const handleUpload = async () => {
        setLoading(true)
        const imageRef = ref(imageDB,`project/thumbnail`)
        if(!image){
            toast.error("No image selected for upload",{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
            setLoading(false)
            return
        }
        try {
            await uploadBytes(imageRef, image)
            setUpload(true)
            setLoading(false)
          } catch (error) {
            console.error("Error uploading image:", error);
            toast.error(error, { position:"top-right", className: "text-red-600 text-[1.2rem] bg-white py-5 shadow-none border-black border" })
          }
    }

    const addSkills = (e) => {
        e.preventDefault()
        setSkills((prevState) => [...prevState,skillRef.current.value])
        skillRef.current.value = ""
    }

    const removeSkill = (skillToRemove) => {
        setSkills((prevState) => prevState.filter((skill) => skill !== skillToRemove));
    }

    const removeRoles = (roleToRemove) => {
        setRoles((prevState) => prevState.filter((role) => role !== roleToRemove ))
    }

    const addRoles = (e) => {
        e.preventDefault()
        setRoles((prevState) => [...prevState,{role: roleRef.current.value, experience: experienceRef.current.value + " " + experienceDuration, vacancy: vacancyRef.current.value,skills: skills,responsibility: responsibility}])
        roleRef.current.value = ""
        experienceRef.current.value = ""
        vacancyRef.current.value = ""
        setSkills("")
        setResponsibility("")
    }

    const handleExperienceChange = (value) => {
        setExperienceDuration(value)
    }

    const handleTimelineDurationChange = (value) => {
        setTimelineDuration(value)
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }

    const handleChange = (e) => {
        setBudget(e.target.value)
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(value)) {
          setDisplayBudget(numberWithCommas(value))
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpload()
        console.log({
            title: title,
            about: about,
            thumbnail: "",
            carousel: [],
            presentation: presentationLink,
            seeking: [
                roles
            ]
        })
    }

  return (
    <>
    <Navbar/>
    <div className="flex flex-row-reverse justify-center bg-[#fff3e6] font-Poppins">
        <div className="lg:h-screen md:h-screen lg:overflow-y-auto md:overflow-y-auto overflow-x-clip">
            <form className="flex flex-col gap-3 lg:gap-5 bg-white py-10 lg:pb-20 lg:w-[30dvw] md:w-[30dvw] border-black lg:border-l">
                {section === "idea" ?
                    <h1 className="font-semibold text-2xl lg:text-3xl px-10">Create Idea</h1>
                    :
                    <h1 className="font-semibold text-2xl lg:text-3xl px-10">Create project</h1>
                }
                <div className="flex flex-col px-10">
                    <label className="text-xl font-semibold pb-2" htmlFor="">Title</label>
                    <input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-black border p-2 rounded-md" type="text" />
                </div>
                {section === "idea" ?
                <>
                    <div className="flex flex-col px-10">
                        <label className="text-xl pb-2 font-semibold" htmlFor="">Summary</label>
                        <input placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} className="border-black border  p-2 rounded-md" type="text"/>
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="about">Description</label>
                        <textarea placeholder="Write a detailed description about the project" value={about} onChange={(e) => setAbout(e.target.value)} className="border-black border whitespace-pre-wrap p-3 h-64 rounded-md " name="" id="about" cols="70" rows="15"></textarea>
                    </div>
                </>
                :
                <>
                    <div className="flex flex-col px-10">
                        <label className="text-xl pb-2 font-semibold" htmlFor="">Presentation Link</label>
                        <input placeholder="Slide link" onChange={(e) => setPresentationLink(e.target.value)} className="border-black border  p-2 rounded-md" type="text"/>
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="about">About</label>
                        <textarea placeholder="Write a detailed description about the project" value={about} onChange={(e) => setAbout(e.target.value)} className="border-black border whitespace-pre-wrap p-3 h-64 rounded-md " name="" id="about" cols="70" rows="15"></textarea>
                    </div>
                </>
                }
                <div className="flex flex-col mx-10 justify-between items-center text-blue-600 border-blue-600 border p-10 lg:p-10 bg-blue-100 rounded-md">
                    <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                        <p className="text-2xl">+</p>
                        <p className="text-[1.1rem] lg:text-xl">Add Project Thumbnail</p>
                    </label>
                    <input onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} id="file-input" type="file" className="hidden" accept="image/*"/>
                </div>
                <div className="flex flex-row flex-wrap gap-3 px-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold" htmlFor="size">Team Size</label>
                        <input value={collaborators} onChange={(e) => setCollaborators(e.target.value)} id="size" className="w-28 border-black border p-2 rounded-md" type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold" htmlFor="budget">Project Budget</label>
                        <input value={budget} onChange={handleChange} id="budget" className="border-black w-40 border p-2 rounded-md" type="number" />
                    </div>
                </div>
                {section === "idea" ? 
                    <div className="flex flex-col py-5 px-10">
                    <label className="text-xl font-semibold pb-2" htmlFor="skills">Skills Required</label>
                    <div className="mb-4">
                        {skills && skills.map(skill => (
                            <div className="flex text-xl bg-blue-100 p-2 my-2 rounded-md justify-between" key={skill}>
                                <p>{skill}</p>
                                <p className="cursor-pointer" onClick={() => removeSkill(skill)}>x</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 lg:gap-3">
                        <input placeholder="Webflow" ref={skillRef} id="skills" className="border-black border p-2 w-5/6 lg:w-[inherit] rounded-md" type="text" />
                        <button onClick={addSkills} className="border-black border bg-white p-2 lg:w-[inherit] lg:px-2 rounded-md">Add +</button>
                    </div>
                </div>
                    :
                <>
                <div className="flex flex-col gap-5 px-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold" htmlFor="experience">Timeline</label>
                            <div className="flex gap-3">
                                <input onChange={(e) => setTimeline(e.target.value)} className="w-28 border-black border p-2 rounded-md" id="experience" type="number" />
                                <Select onValueChange={handleTimelineDurationChange}>
                                    <SelectTrigger className="w-[180px] border">
                                        <SelectValue placeholder="Select time period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="month(s)">Months</SelectItem>
                                        <SelectItem value="year(s)">Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                </div>
                <hr className="border my-4 mx-10" />
                <h1 className="text-2xl lg:text-3xl font-semibold px-10">Seeking</h1>
                <div className="flex flex-col gap-3 lg:gap-5">
                    <div className="flex flex-col gap-3">
                        {roles && roles.map((role,index) => (
                            <div className={`mx-10 justify-between bg-[${skillColors[index].bg}] p-3 text-[${skillColors[index].bg}] rounded-md`} key={role.role} >
                                <Roles role={role} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="role">Role</label>
                        <input placeholder="UX Designer" ref={roleRef} id="role" className="border-black border p-2 rounded-md" type="text"/>
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="responsibility">Responsibility</label>
                        <textarea value={responsibility} onChange={(e) => setResponsibility(e.target.value)} id="responsibility" className="border-black whitespace-pre-wrap border p-2 rounded-md" name="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-5">
                        <label className="text-xl font-semibold px-10" htmlFor="experience">Experience</label>
                        <div className="flex flex-col lg:flex-col gap-3 lg:gap-5">
                            <input ref={experienceRef} className="border-black border p-2 rounded-md mx-10" id="experience" type="number" />
                            <Select onValueChange={handleExperienceChange}>
                                <SelectTrigger className="w-[180px] mx-10 border">
                                    <SelectValue placeholder="Select time period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="month(s)">Months</SelectItem>
                                    <SelectItem value="year(s)">Years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-3 px-10">
                        <label className="text-xl font-semibold" htmlFor="vacancy">Vacancy</label>
                        <input ref={vacancyRef} id="vacancy" className="border-black border p-2 rounded-md" type="number" />
                    </div>
                    <div className="flex flex-col py-5 px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="skills">Skills Required</label>
                        <div className="mb-4">
                            {skills && skills.map(skill => (
                                <div className="flex text-xl bg-blue-100 p-2 my-2 rounded-md justify-between" key={skill}>
                                    <p>{skill}</p>
                                    <p className="cursor-pointer" onClick={() => removeSkill(skill)}>x</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 lg:gap-3">
                            <input placeholder="Webflow" ref={skillRef} id="skills" className="border-black border p-2 w-5/6 lg:w-[inherit] rounded-md" type="text" />
                            <button onClick={addSkills} className="border-black border bg-white p-2 lg:w-[inherit] lg:px-2 rounded-md">Add +</button>
                        </div>
                    </div>
                    <div className="text-right">
                        <button onClick={addRoles} className="bg-orange-600 text-white p-2 font-semibold rounded-md mx-10">Add Role +</button>
                    </div>
                </div>
            </>
                }
            <hr className="border mx-10" />
            <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold p-2 rounded-md mx-10">Post</button>
            </form>
        </div>
        <div className="w-[70dvw] h-screen hidden bg-white py-10 overflow-auto px-20 lg:block md:block border-black border-l">
            <div>
                {title && <h1 className="text-5xl font-semibold">{title}</h1>}
                {section === "idea"
                ?
                <>
                <div className="flex items-center gap-5">
                    {image &&
                    <>
                    <img className="rounded-xl bg-slate-200 min-w-[13rem] w-full h-[20rem] lg:size-52" src={image} alt="not uploaded" />
                    <div className="flex flex-col self-start gap-8">
                        <div>
                            <h1 className="text-2xl lg:text-4xl md:text-4xl cursor-pointer font-semibold py-2">{title}</h1>
                            <div className="flex text-xl items-center gap-2">
                                <Eye/>
                                <p>1k read</p>
                                <p className="mb-2">.</p>
                                <p className="border-red-600 border px-2 text-red-600 rounded-full">Closed</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium italic text-gray-500">
                                <p># Science</p>
                                <p className="mb-2">.</p>
                                <p># Mental Health</p>
                            </div>
                        </div>
                        <div className="flex gap-5 [&_*]:cursor-pointer">
                            <div className="flex items-center gap-2">
                                <Heart/>
                                <span>2k likes</span>
                            </div>
                            <Bookmark/>
                            <Forward/>
                            <MessageCircle/>
                        </div>
                    </div>
                    </> 
                    }
                </div>
                <div className="text-[1.1rem] py-10">
                    <p>This idea proposes an app that empowers users to change their mindset and cultivate a more positive outlook.</p>
                    <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5">Description</h1>
                    <p>{about}</p>
                    <ul className="list-disc px-10 py-5">
                        <li>Identifying negative thought patterns.</li>
                        <li>Learning techniques for cognitive reframing (reframing negative thoughts into more positive ones).</li>
                        <li>Practicing gratitude exercises.</li>
                        <li>Setting and tracking personal goals related to positive thinking.</li>
                        <li>Gamification elements could be implemented to keep users engaged and motivated on their mind-shifting journey.</li>
                    </ul>
                    <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5">Skills Required</h1>
                    <ul className="list-disc px-10 py-5">
                        <li>
                            Gamification Design: To create engaging and rewarding challenges that keep users motivated.
                        </li>
                        <li>
                            Psychology/Behavioral Science Background (preferred): Understanding of human behavior and effective techniques for positive change.
                        </li>
                        <li>
                            Mobile App Development: To build a user-friendly and accessible app experience.
                        </li>
                    </ul>
                </div>
                </>
                :
                <>
                {image && <img className="border my-5 w-full rounded-xl" src={image} alt="not uploaded" />}
                {about && <div> 
                    <h1 className="text-3xl font-semibold py-5">About</h1>
                    <p className="whitespace-pre-wrap">{about}</p>
                </div>}
                { (collaborators || budget || timeline) && <div className="grid grid-cols-2 py-3 px-10 my-5 bg-slate-200 border-slate-600 text-[1.2rem] border-l-4">
                    <div className="font-semibold">
                        {collaborators && <p className="my-1">Team Size</p>}
                        {budget && <p className="my-1">Budget</p>}
                        {timeline && <p className="my-1">Timeline</p>}
                    </div>
                    <div className="font-semibold">
                        {collaborators && <div>
                            <p className="px-2 my-1">- {collaborators} collaborator(s)</p>
                        </div>}
                        {budget && <div>
                            <p className="px-2 my-1">- Rs.{displayBudget}</p> 
                        </div>}
                        {timeline && <div>
                            <p className="px-2 my-1">- {timeline} {timelineDuration}</p> 
                        </div>}
                    </div>
                </div>}
                {roles.length > 0 && <h1 className="text-3xl font-semibold py-5">Seeking</h1>}
                <div className="grid lg:grid-cols-2 gap-5">
                    {roles && roles.map((role,index) => 
                        <div key={index} className={`flex flex-col group/item gap-5 bg-[${skillColors[index].bg}] text-[${skillColors[index].text}] p-5 lg:p-10 rounded-xl`}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl lg:text-2xl font-semibold">{role.role} {role.vacancy}(s)</h1>
                                    <p onClick={() => removeRoles(role)} className="font-semibold hidden group-hover/item:block cursor-pointer">X</p>
                                </div>
                                <p className="text-sm">Experience - {role.experience}</p>
                            </div>
                            <p>{role.responsibility}</p>
                            <SeekingSkill role={role} />
                        </div>
                    )}
                </div>
                </>
                }
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}
