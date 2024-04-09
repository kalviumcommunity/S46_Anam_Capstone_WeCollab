import { useState } from "react"
import FirebaseImageUpload from "../firebase/FirebaseImageUpload"
import { UPDATE_USER } from "../graphql/CRUD"
import { useMutation } from "@apollo/client"
import { toast } from "sonner"

export default function ProfilePopup({userId,section, changeVisibility,handleCompletion}) {

    const [about,setAbout] = useState()
    const [role,setRole] = useState()
    const [duration,setDuration] = useState()
    const [skill,setSkill] = useState()
    const [profession,setProfession] = useState()
    
    const [updateUser,{data,loading,error}] = useMutation(UPDATE_USER)

const handleSave = (operationFor) => {

    const updateUserParams = {
        about: {
            property: 'details.about',
            userData: { details: { about: about } }
        },
        experience: {
            property: 'details.experience',
            userData: { details: { experience: { role: role, duration: duration } } }
        },
        skills: {
            property: 'details.skills',
            userData: { details: { skills: skill } }
        },
        currentPosition: {
            property: 'details.currentPosition',
            userData: { details: { currentPosition: profession } }
        }
    }
    
    const { property, userData } = updateUserParams[operationFor]
    
    updateUser({ variables: { id: userId, property, userData } })
        .then(() => {
        changeVisibility()
        handleCompletion(operationFor)
        const successMessage = `${operationFor.charAt(0).toUpperCase() + operationFor.slice(1)} updated`
            toast.success(successMessage, {
                className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
            })
        })
        .catch((err) => {
            toast.error(err, {
                className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
            })
            console.error(err)
        })
}

  return (
    <div className="fixed bg-black z-20 font-raleway top-0 bg-opacity-50 w-[100dvw] h-[100dvh]">
        <div className="bg-white ml-5 mt-44 lg:ml-[22.5rem] lg:mt-[10rem] w-[90dvw] lg:w-[50dvw] border-black border-2 rounded-lg p-5">
            <div className="flex flex-col text-2xl">
                <div className="flex font-semibold justify-between">
                    <h1>{section}</h1>
                    <button onClick={changeVisibility} className="cursor-pointer">X</button>
                </div>
                <hr className="mt-1"/>
            </div>
                {section === "Add about" ? 
                    <div className="flex flex-col gap-5 py-3">
                        <p className="text-xl font-semibold">Let's write about yourself</p>
                        <p>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</p>
                        <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="border-black border-2 p-3" name="about" cols="30" rows="7" placeholder="About Yourself"></textarea>
                        <div className="text-right">
                            <button onClick={() => handleSave("about")} className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                        </div>
                    </div>
                    :
                    section === "Add experience" ? 
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Show your experience to the community</p>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="role">Experience</label>
                                <input value={role} onChange={(e) => setRole(e.target.value)} id="role" className="border-black border-2 p-2 rounded-md" type="text" placeholder="Your Role" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="duration">Duration</label>
                                <input value={duration} onChange={(e) => setDuration(e.target.value)} id="duration" className="border-black border-2 p-2 rounded-md" type="text" placeholder="Duration" />
                            </div>
                            <div className="text-right">
                                <button onClick={() => handleSave("experience")} className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add skills" ?
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Let's showcase your skills</p>
                            <input value={skill} onChange={(e) => setSkill(e.target.value)} className="border-black border-2 p-2 rounded-md" type="text" placeholder="Skill" />
                            <div className="text-right">
                                <button onClick={() => handleSave("skills")} className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add profile photo" ?
                        <FirebaseImageUpload handleCompletion={handleCompletion} userId={userId} />
                        :
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Collaborators would love to know your profession</p>
                            <input value={profession} onChange={(e) => setProfession(e.target.value)} className="border-black border-2 p-2 rounded-md" type="text" placeholder="Profession" />
                            <div className="text-right">
                                <button onClick={() => handleSave("currentPosition")} className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                }
            </div>
        </div>
  )
}
