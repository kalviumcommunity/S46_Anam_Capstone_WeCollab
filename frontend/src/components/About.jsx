import { Edit } from "lucide-react";

export default function About({description, handleEdit}) {
  return (
    <>
        <div className="lg:w-1/2 md:w-2/3 mt-2 flex flex-col w-full border-black border rounded-lg relative bg-white p-5">
            <div className="flex justify-between py-2 pb-5">
                    <h1 className="text-3xl font-semibold">About</h1>
                    <Edit onClick={() => handleEdit("Add about")} className="cursor-pointer" />
                </div>
                {description && <p className="mt-2 mb-5 whitespace-pre-wrap">{description}</p>}
        </div>
    </>
  )
}
