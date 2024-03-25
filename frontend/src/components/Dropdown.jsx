import { useState } from "react"

export default function Dropdown({label,data,type}) {

    const [isVisible,setVisible] = useState(false)
    const [title,setTitle] = useState(label)

    const handlClick = (e) => {
        setTitle(e.target.innerHTML)
        setVisible(!isVisible)
    }

    return (
        <div className="relative min-w-40">
            <div onClick={() => setVisible(!isVisible)} className="flex cursor-pointer justify-between items-center border-black border-2 px-2 font-semibold rounded-md">
                {title && <p>{title}</p>}
                <img className={`${isVisible? "scale-y-[-1]": ""} size-8`} src="./assets/arrow-down.svg" alt="" />
            </div>
            {type == "checkbox" ? <div className={`${isVisible ? "flex": "hidden"} absolute bg-white top-10 flex-col p-3 border-black border-2 rounded-md`}>
                {data && data.map((item) => (
                <label key={item.value}>
                    <input
                    type="checkbox"
                    value={item.value}
                    />
                    {item.label}
                </label>))}
            </div>
            :
            <div className={`${isVisible ? "flex": "hidden"} cursor-pointer bg-white absolute top-10 w-full flex-col border-black border-2 rounded-md`}>
                <option onClick={handlClick} className="hover:bg-slate-200 p-2 font-medium" value={label}>{label}</option>
                {data && data.map((item) => (
                    <option onClick={handlClick} className="hover:bg-slate-200 p-2 font-medium" key={item.value} value={item.value}>{item.label}</option>
                ))}
            </div>
            }
        </div>
    )
}
