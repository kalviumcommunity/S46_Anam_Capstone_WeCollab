

export default function Experience({experience}) {
  return (
    <>
        <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5">
            <div className="flex justify-between items-center py-2 pb-5">
                <h1 className="text-3xl font-semibold">Experience</h1>
                <div className="flex gap-3 items-center">
                    <img className="size-8 cursor-pointer" src="./assets/plus.svg" alt="" />
                    <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                </div>
            </div>
            {experience && experience.map(exp => (
                <div key={exp.role}>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-xl">{exp.role}</p>
                            <p className="text-slate-600">Company name</p>
                        </div>
                        <p className="">- {exp.duration}</p>
                    </div>
                    <hr className="border-slate-200 border-1" />
                </div>
            ))}
        </div>
    </>
  )
}
