
export default function Navbar() {
  return (
    <>
        <nav className="border-black border-b-2 flex justify-between items-center p-3">
            <div className="flex items-center gap-3 cursor-pointer">
                <img className="size-10 lg:size-[inherit]" src="../../public/logo.svg" alt="Logo of WeCollab" />
                <h1 className="text-2xl lg:text-3xl font-raleway font-bold pt-1">WeCollab</h1>
            </div>
            <div className="hidden md:flex lg:flex gap-10 font-space text-xl [&_*]:cursor-pointer">
                <p>Home</p>
                <p>Project</p>
                <p>Open Ideas</p>
            </div>
            <div className="hidden lg:block text-xl text-white font-raleway font-bold">
                <button className="rounded-full bg-orange-600 px-5 py-1">+ Join</button>
            </div>
            <img className="md:hidden lg:hidden" src="../../public/responsive-nav.svg" alt="Responsive navigation icon" />
        </nav>
    </>
  )
}
