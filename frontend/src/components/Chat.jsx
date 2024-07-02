import { useEffect, useState } from "react"
import { useUserStore } from "@/zustand/store"
import axios from "axios"
import { useQuery } from "@apollo/client"
import { GET_ALL_USERS } from "@/graphql/CRUD"
import { useNavigate } from "react-router-dom"
import { MoveLeft, Send } from "lucide-react"
import { getSocket,getOnlineUsers, getUnreadMessages } from "@/socket/socketManger"

export default function Chat() {

    const [userData,setUser] = useState(useUserStore((state) => state.userData))
    const [onlineUsers,setOnlineUsers] = useState(getOnlineUsers())
    const [unreadMessage,setUnreadMessage] = useState(getUnreadMessages())
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const [searchInput,setSearchInput] = useState()
    const [receiverId,setReceiverId] = useState("")
    const [receiverName,setReceiverName] = useState("")
    const [messageLoading,setMessageLoading] = useState(false)
    const {loading,error,data} = useQuery(GET_ALL_USERS)

    const navigate = useNavigate()
    const colors = ["red","blue","green","orange","purple","yellow"]

    const handleSearch = (event) => {
        if(event.key === "Enter"){
            if(searchInput.trim() !== ""){
                navigate(`/chat?search=${searchInput}`)
            }
            setSearchInput("")
        }
    }
    const socket = getSocket()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message.trim()) {
            console.log("Cannot send empty message");
            return;
        }
        console.log("Sending message:", message);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SOCKET_URI}/api/send/${receiverId}`, {
                message: message, 
                senderId: userData.id
            });
            setMessage("");
            if(!onlineUsers.includes(receiverId)){
                socket.emit("unreadMessage",response.data)
            }
            setMessages((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Error sending message:", err.response ? err.response.data : err.message);
        }
        setMessage("")
    }
    
    useEffect(() => {
        const fetchMessages = async () => {
            setMessageLoading(true)
            if(receiverId){
                await axios.get(`${import.meta.env.VITE_SOCKET_URI}/api/${receiverId}?id=${userData.id}`)
                .then((res) => {
                    setMessages(res.data)
                    setMessageLoading(false)
                })
            }
        }

        socket.on("getOnlineUsers",(users) => {
            setOnlineUsers(users)
        })
        
        socket.on("newMessage", (message) => {
            console.log("New message received:", message);
            setMessages((prev) => [...prev, message]);
        });
        fetchMessages()
        
    }, [userData.id,receiverId]);

    return (
        <>
            <div className="flex flex-col border-l h-full lg:h-[91dvh] md:h-[91dvh] border-black w-full p-6 lg:p-10 md:p-10 pt-24">
                { !receiverId ?
                <>
                    <input value={searchInput} onKeyDown={handleSearch} onChange={(e) => setSearchInput(e.target.value)} className="w-full self-center lg:w-1/2 md:w-1/2 border-black border pl-12 pr-4 py-2 bg-search bg-contain bg-no-repeat rounded-lg mb-10" placeholder="Search People" type="text" />
                    <div className="overflow-y-auto cursor-pointer">
                        {data && data.users.map((user,i) => (
                            <div onClick={() => {setReceiverId(user.id),setReceiverName(user.name)}} className={`flex relative p-3 gap-5 hover:bg-slate-200 rounded-lg ${user.id == userData.id ? "hidden" : ""}`} key={user.id}>
                                <div className={`flex items-center justify-center text-xl text-white font-semibold size-10 bg-${colors[i]}-600 rounded-full`}>
                                    {user.name[0]}
                                </div>
                                <div className={`size-2 bg-green-500 absolute rounded-full ${onlineUsers.includes(user.id) ? "": "hidden"}`}></div>
                                <div className="absolute right-2 md:right-5 lg:right-5 top-5 flex gap-1 lg:gap-5 md:gap-5 items-center">
                                {unreadMessage && unreadMessage.some(message => message.senderId === user.id) && (
                                    <>
                                        <div className="size-2 bg-red-500 rounded-full"></div>
                                        <div className="text-sm font-Poppins">new message</div>
                                    </>
                                )}
                                </div>
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.details.currentPosition}</p>
                                </div>
                            </div>
                        ))}               
                    </div>
                </>
                :
                <div className="flex flex-col h-full justify-between w-full lg:w-2/3 md:w-2/3 self-center">
                    <div className="flex items-center gap-3 border-b-2 py-2">
                        <MoveLeft className="cursor-pointer" onClick={() => setReceiverId("")}/>
                        <div className="flex items-center justify-center text-xl text-white font-semibold size-10 bg-orange-600 rounded-full">
                            {receiverName[0]}
                        </div>
                        <p className="text-2xl font-medium">{receiverName}</p>
                    </div>
                    {messages && messages.length > 0 ?
                    <div className="flex-grow overflow-y-auto">
                        <div className="min-h-full flex flex-col justify-end py-10">
                            {messages.map((message) => (
                                <div key={message._id} className={message.senderId === userData.id ? "self-end bg-green-600 text-white font-medium p-3 rounded-md my-1" : "self-start bg-blue-600 text-white font-medium p-3 rounded-md my-1"}>
                                    <p>{message.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    messageLoading ?
                    <div className="flex flex-col justify-center items-center h-[20dvh]">
                        <div className="size-16 border-[8px] border-t-orange-500 rounded-full animate-spin"></div>
                     </div> 
                    :
                    <p className="text-center text-gray-600">No messages yet</p>
                    }
                    <form onSubmit={handleSubmit} className="flex gap-2 relative" action="">
                        <input value={message} className="border-black border p-2 w-full rounded-lg" onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Send message" />
                        <button className="absolute right-2 bottom-2">
                            <Send className="h-full"/>
                        </button>
                    </form>
                </div>}
            </div>
        </>
    )
}
