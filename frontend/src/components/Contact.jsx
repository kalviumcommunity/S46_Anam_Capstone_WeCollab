// import { useUserStore } from '@/zustand/store'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Contact({handleVisiblity}) {

    // const [userData,setUserData] = useState(useUserStore((state) => state.userData))
    const [message,setMessage] = useState()

    const handleSend = () => {

    }
    
    return (
        <>
        <div className="fixed bg-black z-40 font-raleway top-0 bg-opacity-50 w-[100dvw] h-[100dvh]">
            <div className="bg-white ml-5 mt-44 lg:ml-[50%] md:ml-[50%] md:translate-x-[-50%] lg:translate-x-[-50%] w-[90dvw] lg:w-[50dvw] md:w-[50dvw] border-black border rounded-lg p-5">                
                <div className="flex items-center justify-between text-3xl font-Poppins font-medium pb-5">
                    <p>Contact</p>
                    <X onClick={() => handleVisiblity(false)} className="cursor-pointer"/>
                </div>
                <div className="flex items-center p-5 lg:p-0 gap-3">
                    {userData && 
                        <div className="flex items-center justify-center text-xl text-white font-semibold size-12 bg-orange-600 rounded-full">
                            {userData.name[0]}
                        </div>
                    }
                    <p className="font-medium text-xl">{userData.name}</p>
                </div>
                <div className="py-5">
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10} className="border-black border-2 p-2 w-full rounded-md" name="contact" id="message" placeholder="Why do you want to collaborate on this project?"></textarea>
                </div>
                <div className='text-right'>
                    <button onClick={handleSend} className="bg-green-600 font-medium text-white px-5 py-2 rounded-lg">Send</button>
                </div>
            </div>
        </div>
        </>
    )
}
