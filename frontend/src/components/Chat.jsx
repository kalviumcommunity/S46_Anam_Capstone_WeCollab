import { useEffect, useState } from "react";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/CRUD";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft, Send } from "lucide-react";
import {getSocket} from "@/socket/socketManger";

export default function Chat() {

  const { id } = useParams();
  const [currUser, setUser] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unreadMessage, setUnreadMessage] = useState([]);
  const [socket,setSocket] = useState()
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [receiverId, setReceiverId] = useState(id || "");
  const [receiverData, setReceiverData] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const navigate = useNavigate();
  
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchInput.trim() !== "") {
        navigate(`/chat?search=${searchInput}`);
      }
      setSearchInput("");
    }
  };

  const userStore = useUserStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      console.log("Cannot send empty message");
      return;
    }
    console.log("Sending message:", message);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SOCKET_URI}/api/send/${receiverId}`, {
        message: message,
        senderId: currUser.id,
      });
      setMessage("");
      if (!onlineUsers.includes(receiverId)) {
        console.log("triggered")
        socket.emit("unreadMessage", response.data);
      }
      console.log(response.data)
      setMessages((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error sending message:", err.response ? err.response.data : err.message);
    }
    setMessage("");
  };
  
  useEffect(() => {
    if(userStore.userData && getSocket()){
      setUser(userStore.userData)
      setSocket(getSocket())
    }
    const fetchMessages = async () => {
      setMessageLoading(true);
      if (receiverId && currUser) {
        await axios
        .get(`${import.meta.env.VITE_SOCKET_URI}/api/${receiverId}?id=${currUser.id}`)
        .then((res) => {
          setMessages(res.data);
          setMessageLoading(false);
        });
      }
    };
    
    if (!loading) {
      const receiever = data.users.filter((user) => user.id === receiverId);
      setReceiverData(receiever[0]);
    }

    if(socket){
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
  
      socket.on("newMessage", (message) => {
        console.log("New message received:", message);
        setMessages((prev) => [...prev, message]);
      });
      fetchMessages();
    }

    return() => {
      if(socket){
        socket.off("getOnlineUsers")
        socket.off("newMessage")
      }
    }

  }, [userStore,receiverId,currUser,loading]);

    return (
        <>
        {!currUser ? (
        <div>Loading...</div>
      ) : (
            <div className="flex flex-col border-l h-full lg:h-[91dvh] md:h-[91dvh] border-black w-full p-6 lg:p-10 md:p-10 pt-24">
                { !receiverId ?
                <>
                    <input value={searchInput} onKeyDown={handleSearch} onChange={(e) => setSearchInput(e.target.value)} className="w-full self-center lg:w-1/2 md:w-1/2 border-black border pl-12 pr-4 py-2 bg-search bg-contain bg-no-repeat rounded-lg mb-10" placeholder="Search People" type="text" />
                    <div className="overflow-y-auto cursor-pointer">
                        {data && data.users.map((user) => (
                            <div onClick={() => {navigate(`/home/chat/${user.id}`),setReceiverId(user.id)}} className={`flex relative p-3 gap-5 hover:bg-slate-200 rounded-lg ${user.id == currUser.id ? "hidden" : ""}`} key={user.id}>
                                {user.details.profileImage ?
                                <>
                                    <div className="flex items-center gap-3">
                                        <img src={user.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                                        <div>
                                            <p>{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.details.currentPosition}</p>
                                        </div>
                                    </div>
                                </>

                                    :
                                    <>
                                    <div className={`flex items-center justify-center text-xl text-white font-semibold size-10 bg-orange-600 rounded-full`}>
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
                                    </>
                                }
                                </div>
                        ))}               
                    </div>
                </>
                :
                <div className="flex flex-col h-full justify-between w-full lg:w-3/4 md:w-3/4 self-center">
                    <div className="flex items-center gap-3 border-b-2 py-2">
                        <MoveLeft className="cursor-pointer" onClick={() => {setReceiverId(""),navigate("/home/chat")}}/>
                        {receiverData &&
                        receiverData.details.profileImage ?
                        <div className="flex items-center gap-3">
                                <img src={receiverData.details.profileImage} className="cursor-pointer font-raleway rounded-full bg-orange-600 h-10 w-10" alt="" />
                                <p>{receiverData.name}</p>
                            </div>
                        :
                        receiverData &&
                        <>
                            <div className="flex items-center justify-center text-xl text-white font-semibold size-10 bg-orange-600 rounded-full">
                            {receiverData.name[0]}
                            </div>
                            <p className="text-2xl font-medium">{receiverData.name}</p>
                        </>
                        }
                    </div>
                    {messages && messages.length > 0 ?
                    <div className="flex-grow overflow-y-auto">
                        <div className="min-h-full flex flex-col justify-end py-10">
                            {messages.map((message) => (
                                <div key={message._id} className={message.senderId === currUser.id ? "self-end bg-green-600 text-white font-medium p-3 rounded-md my-1" : "self-start bg-blue-600 text-white font-medium p-3 rounded-md my-1"}>
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
                </div>
              }
            </div>
          )}
        </>
    )
}
