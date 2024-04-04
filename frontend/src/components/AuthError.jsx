import Navbar from "./Navbar"
import Footer from "./Footer"

export default function AuthError() {

  return (
    <>
        <Navbar/>
        <div className="flex justify-center items-center text-3xl h-[100dvh]">
            <h1>Authentication Failed</h1>
        </div>
        <Footer/>
    </>
  )
}
