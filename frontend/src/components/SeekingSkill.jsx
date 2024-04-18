import { useState } from "react"

export default function SeekingSkill({role}) {

    const [showDetails,setShowDetails] = useState(false)

  return (
    <>
        <h1 onClick={() => setShowDetails(!showDetails)}  className="font-semibold">Skills Required🔻</h1> 
        {role.skills.length > 0 && <ul className={`${showDetails ? "" : "hidden"} list-disc px-10`}>
            {role.skills.map(skill => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>}
    </>
  )
}
