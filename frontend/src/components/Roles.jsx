import { useState } from "react"

export default function Roles({role}) {

    const [showDetails,setShowDetails] = useState(false)

  return (
    <>
        <div onClick={() => setShowDetails(!showDetails)} className="flex justify-between cursor-pointer text-xl font-semibold">
            <p>{role.role} {role.vacancy}(s)</p>
            <p className="">🔻</p>
        </div>
        <div className={`${showDetails ? "" : "hidden"} py-4 px-2`}>
            <p className="font-semibold">Experience</p>
            <br />
            <p>{role.experience}</p>
            <br />
            <p className="font-semibold">Responsibility</p>
            <br />
            <p className="whitespace-pre-wrap">{role.responsibility}</p>
            <br />
            <p className="font-semibold">Skills Required</p>
            <br />
            {role.skills.map(skill => (
                <li className="mx-5" key={skill}>{skill}</li>
            ) )}
        </div>
    </>
  )
}
