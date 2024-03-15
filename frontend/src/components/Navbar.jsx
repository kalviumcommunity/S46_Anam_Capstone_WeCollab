import { Link, useParams } from "react-router-dom"

export default function Navbar() {

    const {form} = useParams()

    return (
        <>
            <nav className="border-black border-b-2 flex justify-between items-center p-3">
                <Link to="/">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img className="size-10 lg:size-[inherit]" src="./assets/logo.svg" alt="Logo of WeCollab" />
                        <h1 className="text-2xl lg:text-3xl font-raleway font-bold pt-1">WeCollab</h1>
                    </div>
                </Link>
                {form ? "" : 
                <div className="hidden md:flex lg:flex gap-10 font-space text-xl [&_*]:cursor-pointer">
                    <p>Home</p>
                    <p>Project</p>
                    <p>Open Ideas</p>
                </div>
                }
                {form ? form === "signup" ? 
                <Link to="/login">
                    <button className="rounded-full font-raleway font-bold border-black border-2 hover:bg-slate-200 px-5 py-1">Log-In</button> 
                </Link>
                : 
                <Link to="/signup">
                    <button className="rounded-full font-raleway font-bold border-black border-2 hover:bg-slate-200 px-5 py-1">Sign-up</button>
                </Link>
                :  
                <>
                    <div className="hidden md:block lg:block text-xl text-white font-raleway font-bold">
                        <Link to="/signup">
                            <button className="rounded-full bg-orange-600 px-5 py-1">+ Join</button>
                        </Link>
                    </div>
                    <img className="md:hidden lg:hidden" src="./assets/responsive-nav.svg" alt="Responsive navigation icon" />
                </>
                }
            </nav>
        </>
    )
}
