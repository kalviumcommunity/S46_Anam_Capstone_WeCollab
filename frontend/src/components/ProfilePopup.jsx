import FirebaseImageUpload from "../firebase/FirebaseImageUpload"

export default function ProfilePopup({section, changeVisibility}) {
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
                        <textarea className="border-black border-2 p-3" name="about" cols="30" rows="7" placeholder="About Yourself"></textarea>
                        <div className="text-right">
                            <button className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                        </div>
                    </div>
                    :
                    section === "Add experience" ? 
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Show your experience to the community</p>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="experience">Experience</label>
                                <input id="experience" className="border-black border-2 p-2 rounded-md" type="text" placeholder="Experience" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="duration">Duration</label>
                                <input id="duration" className="border-black border-2 p-2 rounded-md" type="text" placeholder="Duration" />
                            </div>
                            <div className="text-right">
                                <button className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add skills" ?
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Let's showcase your skills</p>
                            <input className="border-black border-2 p-2 rounded-md" type="text" placeholder="Skill" />
                            <div className="text-right">
                                <button className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                        :
                    section === "Add profile photo" ?
                        <FirebaseImageUpload />
                        :
                        <div className="flex flex-col gap-5 py-3">
                            <p className="text-xl font-semibold">Collaborators would love to know your profession</p>
                            <input className="border-black border-2 p-2 rounded-md" type="text" placeholder="Profession" />
                            <div className="text-right">
                                <button className="bg-green-600 px-5 py-2 text-white font-semibold rounded-full">Save</button>
                            </div>
                        </div>
                }
            </div>
        </div>
  )
}
