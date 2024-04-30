import Navbar from "./Navbar"
import Footer from "./Footer"
import { Heart, Eye, Forward, MessageCircle,Bookmark } from "lucide-react"

export default function IdeaDetail() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col font-Poppins items-center gap-10 py-20 px-10 lg:px-80 md:px-40">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
            <div className="rounded-xl bg-slate-200 min-w-[13rem] w-full h-[20rem] lg:size-52"></div>
            <div className="flex flex-col self-start gap-8">
                <div>
                    <h1 className="text-2xl lg:text-4xl md:text-4xl cursor-pointer font-semibold py-2">How to change your mind?</h1>
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
        </div>
        <div className="text-[1.1rem]">
            <p>This idea proposes an app that empowers users to change their mindset and cultivate a more positive outlook.</p>
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-semibold py-5">Description</h1>
            <p>We all experience negative thought patterns from time to time. This app aims to be a supportive tool to help users overcome these challenges. Imagine a user-friendly platform with personalized challenges, interactive exercises, and mindfulness techniques. The app could guide users through:</p>
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
    </div>
    <Footer/>
    </>
  )
}
