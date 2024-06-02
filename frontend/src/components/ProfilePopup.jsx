import { useState } from "react"
import FirebaseImageUpload from "../firebase/FirebaseImageUpload"
import { UPDATE_USER } from "../graphql/CRUD"
import { useMutation } from "@apollo/client"
import { toast } from "sonner"
import { X } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ProfilePopup({userId,section, changeVisibility,handleCompletion}) {

    const [about,setAbout] = useState()
    const [role,setRole] = useState()
    const [duration,setDuration] = useState()
    const [skill,setSkill] = useState()
    const [status,setStatus] = useState()
    const [profession,setProfession] = useState()
    const [company,setCompany] = useState()
    
    const [updateUser,{data,loading,error}] = useMutation(UPDATE_USER)

const handleSave = (operationFor) => {

    const updateUserParams = {
        about: {
            property: 'details.about',
            userData: { details: { about: about } }
        },
        experience: {
            property: 'details.experience',
            userData: { details: { experience: { role: role, duration: duration, company: company } } }
        },
        skills: {
            property: 'details.skills',
            userData: { details: { skills: skill } }
        },
        currentPosition: {
            property: 'details.currentPosition',
            userData: { details: { currentPosition: profession } }
        },
        status: {
            property: 'details.status',
            userData: { details: { status: status } }
        }
    }
    
    const { property, userData } = updateUserParams[operationFor]
    
    updateUser({ variables: { id: userId, property, operation: "add", userData } })
        .then(() => {
        changeVisibility()
        handleCompletion(operationFor)
        const successMessage = `${operationFor.charAt(0).toUpperCase() + operationFor.slice(1)} updated`
            toast.success(successMessage, {
                className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
            })
        }).catch((err) => {
            toast.error(err, {
                className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
            })
            console.error(err)
        })
}

  return (
    <div className="fixed bg-black z-20 font-raleway top-0 bg-opacity-50 w-[100dvw] h-[100dvh]">
        <div className="bg-white ml-5 mt-44 lg:ml-[50%] md:ml-[50%] md:translate-x-[-50%] lg:translate-x-[-50%] w-[90dvw] lg:w-[50dvw] md:w-[50dvw] border-black border rounded-lg p-5">
            <div className="flex flex-col text-2xl">
                <div className="flex font-semibold justify-between py-1">
                    <h1>{section}</h1>
                    <X onClick={changeVisibility} className="cursor-pointer" />
                </div>
                <hr className="mt-1"/>
            </div>
                {section === "Add about" ?                 
                    <div className="flex flex-col gap-5 py-3">
                        <p className="text-xl font-semibold">Let's write about yourself</p>
                        <p>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</p>
                        <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="border-black border p-3 rounded-md" name="about" cols="30" rows="7" placeholder="About Yourself"></textarea>
                        <div className="text-right">
                            <button onClick={() => handleSave("about")} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
                        </div>
                    </div>
                    :
                    section === "Add experience" ? 
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-medium py-3">Show your experience to the community</p>
                            <div className="flex items-center font-medium gap-3">
                                <label className="w-1/6 font-semibold" htmlFor="role">Role</label>
                                <input value={role} onChange={(e) => setRole(e.target.value)} id="role" className="border-black border p-2 rounded-md w-full" type="text" placeholder="Your Role" />
                            </div>
                            <div className="flex items-center font-medium gap-3">
                                <label className="w-1/6 font-semibold" htmlFor="duration">Duration</label>
                                <input value={duration} onChange={(e) => setDuration(e.target.value)} id="duration" className="border-black border p-2 rounded-md w-full" type="text" placeholder="Duration" />
                            </div>
                            <div className="flex items-center font-medium gap-3">
                                <label className="w-1/6 font-semibold" htmlFor="company">Company</label>
                                <input value={company} onChange={(e) => setCompany(e.target.value)} id="company" className="border-black border p-2 rounded-md w-full" type="text" placeholder="Company" />
                            </div>
                            <div className="text-right">
                                <button onClick={() => handleSave("experience")} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add skills" ?
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Let's showcase your skills</p>
                            <input value={skill} onChange={(e) => setSkill(e.target.value)} className="border-black border p-2 rounded-md" type="text" placeholder="Skill" />
                            <div className="text-right">
                                <button onClick={() => handleSave("skills")} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add profile photo" ?
                        <FirebaseImageUpload handleCompletion={handleCompletion} userId={userId} />
                        :
                    section === "Add your profession" ?
                        <div className="flex gap-5 py-3">
                            <p className="text-xl font-semibold">Collaborators would love to know your profession</p>
                            <input value={profession} onChange={(e) => setProfession(e.target.value)} className="border-black border-2 p-2 rounded-md" type="text" placeholder="Profession" />
                            <div className="text-right">
                                <button onClick={() => handleSave("currentPosition")} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
                            </div>
                        </div>
                    :
                    <div className="flex flex-col py-3">
                        <FirebaseImageUpload handleCompletion={handleCompletion} userId={userId} />
                        <p className="text-xl font-semibold py-2">Your Profession</p>
                        <div className="flex items-center gap-5">
                            <input value={profession} onChange={(e) => setProfession(e.target.value)} className="border-black border p-2 rounded-md w-full" type="text" placeholder="Profession" />
                        </div>
                        <div className="flex items-center gap-5 pt-5">
                            <p className="text-xl font-semibold py-2">Your Status</p>
                            <Select value={status} onValueChange={(value) => setStatus(value)} >
                                <SelectTrigger className="w-[180px] h-10 border">
                                <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Open to collaborate">Open to collaborate</SelectItem>
                                <SelectItem value="Busy">Busy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-right">
                            <button onClick={() => {
                                handleSave("currentPosition")
                                handleSave("status")
                            }} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
                        </div>
                    </div>
                }
            </div>
        </div>
  )
}
