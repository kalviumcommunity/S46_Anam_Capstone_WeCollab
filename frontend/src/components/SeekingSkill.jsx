import { useState } from "react"

export default function SeekingSkill({role}) {

    const [showDetails,setShowDetails] = useState(false)

  return (
    <>
        <h1 onClick={() => setShowDetails(!showDetails)}  className="font-semibold text-[1rem] cursor-pointer">Skills Required🔻</h1> 
        {role.skills.length > 0 && <ul className={`${showDetails ? "" : "hidden"} list-disc m-0`}>
            {role.skills.map(skill => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>}
    </>
  )
}
