import {
    Bell,
} from "lucide-react"
// import { getUnreadMessages } from "@/socket/socketManger"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NotificationDropdown() {

  // const [unreadMessages,setUnreadMessages] = useState(getUnreadMessages())
  const navigate = useNavigate()

  return (
  // <div onClick={() => {navigate("/chat"), setUnreadMessages([])}} className="relative p-1">
  <>
    {/* <div className={`size-2 bg-red-600 rounded-full absolute top-2 right-1 ${unreadMessages && unreadMessages.length > 0 ? "" : "hidden"}`}></div> */}
    <div className="hover:bg-slate-200 p-2 rounded-md">
        <Bell/>
    </div>
  </>
  // </div>
  )
}
