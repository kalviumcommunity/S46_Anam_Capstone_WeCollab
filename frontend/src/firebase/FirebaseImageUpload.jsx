import { useMutation } from "@apollo/client";
import { imageDB } from "./config"
import { getDownloadURL, ref,uploadBytes } from "firebase/storage"
import { useState } from "react"
import { toast } from 'sonner';
import { UPDATE_USER } from "@/graphql/CRUD";

export default function FirebaseImageUpload({handleCompletion,userId}) {

    const [image,setImage] = useState()
    const [uploaded,setUpload] = useState(false)
    const [loading,setLoading] = useState(false)
    
    const [updateProfile,{data,loading: updateLoading,error}] = useMutation(UPDATE_USER)

    const handleUpload = async () => {
        setLoading(true)
        const imageRef = ref(imageDB,`files/profile-${userId}`)
        if(!image){
            toast.error("No image selected for upload",{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2" })
            setLoading(false)
            return
        }
        try {
            await uploadBytes(imageRef, image)
            const url = await getDownloadURL(imageRef)
            await updateProfile({variables: { id: userId, property: "details.profileImage",operation: "add", userData: { details: { profileImage: url } } } })
            setUpload(true)
            setLoading(false)
            handleCompletion("photo")
          } catch (error) {
            console.error("Error uploading image:", error);
            toast.error(error, { position:"top-right", className: "text-red-600 text-[1.2rem] bg-white py-5 shadow-none border-black border-2" })
          }
    }

  return (
    <>
        {loading ? 
        <div className="flex flex-col justify-center items-center h-[20dvh]">
            <div className="size-16 border-[8px] border-t-orange-500 rounded-full animate-spin"></div>
        </div> 
        :
        uploaded ?
         <div className="flex items-center justify-center h-[20dvh]">
            <div className="flex items-center gap-3 font-semibold text-2xl">
                <img className="size-10" src="/assets/success.png" alt="" />
                <p>Profile Picture Uploaded</p>
            </div>
         </div>
         : 
         <div className="flex flex-col gap-2 py-5 font-semibold">
            <label className="text-gray-900 lg:text-xl md:text-xl" htmlFor="file_input">Upload file</label>
            <div className="flex gap-5">
                <input onChange={(e) => setImage(e.target.files[0])} className="w-full file:m-2 file:bg-red-200 file:border-0 file:text-red-600 file:font-semibold text-gray-900 border border-black rounded-lg cursor-pointer bg-red-50 focus:outline-none" id="file_input" type="file"/>
                <button onClick={handleUpload} className="bg-green-800 px-5 py-2 text-white font-semibold rounded-md">Save</button>
            </div>
        </div>}
    </>
  )
}
