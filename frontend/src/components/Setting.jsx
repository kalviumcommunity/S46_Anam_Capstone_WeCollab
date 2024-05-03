import { useState } from "react"

export default function Setting() {

    const [selectedSetting,setSetting] = useState("Account Information")
    const [isVisible,setVisible] = useState(true)

    const handleClick = (event) => {
        setSetting(event.target.innerText)
        setVisible(false)
    }

  return (
    <>
        <div className={` ${isVisible ? "" : "hidden lg:block" } h-[100dvh] w-full font-Poppins lg:w-[30dvw] md:border-l bg-white border-black lg:border-x lg:static bottom-0 flex flex-col font-semibold`}>
                <h1 className="text-3xl pt-10 pb-5 px-5">Settings</h1>
                <div onClick={handleClick} className={`flex w-full ${selectedSetting === "Account Information" ? "bg-red-200 border-red-500 border-r-4" : ""} hover:bg-red-200 cursor-pointer items-center gap-3 p-5`}>
                    <img className="size-6" src="/assets/account.svg" alt="" />
                    <p className="rounded-md">Account Information</p>
                </div>
                <div onClick={handleClick} className={`flex w-full  ${selectedSetting === "Change Password" ? "bg-red-200 border-red-500 border-r-4" : ""} hover:bg-red-200 cursor-pointer items-center gap-3 p-5`}>
                    <img className="size-6" src="/assets/password.svg" alt="" />
                    <p className="rounded-md">Change Password</p>
                </div>
                <div onClick={handleClick} className={`flex w-full  ${selectedSetting === "Delete Account" ? "bg-red-200 border-red-500 border-r-4" : ""} hover:bg-red-200 cursor-pointer items-center gap-3 p-5`}>
                    <img className="size-6" src="/assets/delete-user.svg" alt="" />
                    <p className="rounded-md">Delete Account</p>
                </div>
        </div>

        {
            selectedSetting === "Account Information" ? 
                <div className={`${!isVisible ? "" : "hidden" } lg:flex flex-col border-black md:border-l md:w-full h-[100dvh] p-5 lg:w-[50dvw] lg:py-10 lg:px-20 gap-10`}>
                        <div className="flex items-center gap-5 lg:gap-20">
                            <img onClick={() => setVisible(true)} className="lg:hidden size-10 scale-x-[-1]" src="/assets/arrow-right.svg" alt="" />
                            <h1 className="text-2xl lg:text-3xl font-semibold">Account Information</h1>
                        </div>
                        <div className="flex flex-col p-5 lg:p-0 w-full gap-5">
                            <div className="flex flex-col w-full">
                                <label htmlFor="name">Name</label>
                                <input id="name" className="border-black border-2 p-3 rounded-xl" placeholder="Change your name" type="text" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="email">Email</label>
                                <input id="email" className="border-black border-2 p-3 rounded-xl" placeholder="Change your email" type="text" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="gender">Gender</label>
                                <input id="gender" className="border-black border-2 p-3 rounded-xl" placeholder="Change your gender" type="text" />
                            </div>
                        </div>
                        <div className="p-5 lg:p-0">
                            <button className="bg-green-600 text-white font-semibold p-3 rounded-xl">Save Changes</button>
                        </div>
                    </div> 
                    :
                    selectedSetting === "Change Password" ?
                        <div className={`${!isVisible ? "" : "hidden" } lg:flex flex-col border-black md:border-l md:w-full h-[100dvh] p-5 lg:w-[50dvw] lg:py-10 lg:px-20 gap-10`}>
                            <div className="flex items-center gap-5 lg:gap-20">
                                <img onClick={() => setVisible(true)} className="lg:hidden size-10 scale-x-[-1]" src="/assets/arrow-right.svg" alt="" />
                                <h1 className="text-2xl lg:text-3xl font-semibold">Change Your Password</h1>
                            </div>
                            <div className="flex flex-col p-5 lg:p-0 w-full gap-5">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="old">Old Password</label>
                                    <input id="old" className="border-black border-2 p-3 rounded-xl" placeholder="Old password" type="password" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="new">New password</label>
                                    <input id="new" className="border-black border-2 p-3 rounded-xl" placeholder="New password" type="password" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="confirm">Confirm new password</label>
                                    <input id="confirm" className="border-black border-2 p-3 rounded-xl" placeholder="Confirm new password" type="password" />
                                </div>
                            </div>
                            <div className="p-5 lg:p-0">
                                <button className="bg-green-600 text-white font-semibold p-3 rounded-xl">Change Password</button>
                            </div>
                        </div>
                        :
                        <div className={`${!isVisible ? "" : "hidden" } lg:flex flex-col border-black md:border-l md:w-full h-[100dvh] p-5 lg:w-[50dvw] lg:py-10 lg:px-20 gap-10`}>
                            <div className="flex items-center gap-5 lg:gap-20">
                                <img onClick={() => setVisible(true)} className="lg:hidden size-10 scale-x-[-1]" src="/assets/arrow-right.svg" alt="" />
                                <h1 className="text-2xl lg:text-3xl font-semibold">Delete Your Account</h1>
                            </div>
                            <div className="flex items-center p-5 lg:p-0 gap-5">
                                <img className="size-12 border-black border-2 rounded-full" src="" alt="" />
                                <p>Username</p>
                            </div>
                            <div className="p-5 lg:p-0">
                                <h1 className="text-xl font-semibold">This will delete your account</h1>
                                <p className="pt-5">You’re about to start the process of deleting your WeCollab account. Your display name, posts, and public profile will no longer be viewable on weCollab.</p>
                            </div>
                            <div className="p-5 lg:p-0">
                                <button className="bg-red-600 text-white p-3 rounded-full font-semibold">Delete Account</button>
                            </div>
                        </div>
                }
    </>
  )
}
