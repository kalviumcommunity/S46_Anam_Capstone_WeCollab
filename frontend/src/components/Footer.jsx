

export default function Footer() {

    const getCookie = (cookieName) => {

        const cDecoded = decodeURIComponent(document.cookie)
        const cArray = cDecoded.split("; ")
        let result;
    
        cArray.forEach(cookie => {
            if(cookie.indexOf(cookieName) == 0){
                result = cookie.substring(cookieName.length + 1)
            }
        })
    
        return result
    }

  return (
    <>
        <footer className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-0 items-center justify-between p-10 border-black border-t-2">
            <div className="flex flex-col items-center lg:items-start gap-5">
                <div className="flex gap-3 items-center cursor-pointer">
                    <img className="size-8 lg:size-[inherit]" src="./assets/logo.svg" alt="Logo of WeCollab" />
                    <h1 className="text-xl lg:text-3xl font-raleway font-bold pt-3">WeCollab</h1>
                </div>
                <p className="hidden lg:block font-space w-3/4">Collaborate, Innovate, Thrive with WeCollab</p>
                <p className="font-raleway">Created by <span className="underline italic cursor-pointer">Anam Ashraf</span></p>
            </div>
            <div className="flex gap-20">    
                <div className="font-raleway">
                    <h1 className="font-bold py-2">Quick Links</h1>
                    <ul className="[&_*]:cursor-pointer">
                        <li className="hover:underline">People</li>
                        <li className="hover:underline">Projects</li>
                        <li className="hover:underline">Open Ideas</li>
                    </ul>
                </div>
                <div className="font-raleway">
                    <h1 className="font-bold py-2">How it works</h1>
                    <ul>
                        <li className="hover:underline">FAQ</li>
                    </ul>
                </div>
            </div>
            {!getCookie("user") && <div className="hidden lg:flex flex-col items-end gap-5 font-raleway">
                <h1 className="text-2xl w-3/4 text-right">Are you excited to collaborate?</h1>
                <button className="bg-orange-600 text-white px-4 py-2 w-1/3 font-bold">Join Now</button>
            </div>}
        </footer>
    </>
  )
}
