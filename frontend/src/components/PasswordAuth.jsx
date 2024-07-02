import { UPDATE_USER, USER_LOGIN } from "@/graphql/CRUD";
import { useUserStore } from "@/zustand/store"
import { useMutation } from "@apollo/client";
import {useFormik} from "formik"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup"

export default function PasswordAuth() {

    const [userLogin, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(USER_LOGIN);
    const [updateUser,{data: updateData,loading: updateLoading,error: updateError }] = useMutation(UPDATE_USER)
    const [userData,setUserData] = useState(useUserStore((state) => state.userData))
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const getCharacterValidationError = (str) => {
        return `password must have at least one ${str} character`;
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Password is required")
        .min(6,"Password should be atleast 6 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[@#$%^&*]/,getCharacterValidationError("special"))
    })

    const initialValues = {
        password: ""
    }

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

    const setCookie = (cookieName,value,daysToLive) => {
        const date = new Date()
        date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
        let expires = "expires=" + date.toUTCString()
        document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:async ({password}) => {
            try {
                if(userData.provider === "google"){
                    // handleGoogle()
                }else{
                    await userLogin({ variables: { loginData: { email: getCookie("user"), password } } })
                }
                await updateUser({ variables: { id: userData.id, property: "account", userData: {name: searchParams.get("name"), email: searchParams.get("email") } } })
                    .then(({data}) => {
                        console.log(data)
                        setCookie("user", data.updateUser.email, 1) 
                        toast.success("User information update successful", {
                            className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                            position: "top-right"
                          })
                        navigate("/home")
                    })
            } catch (err) {
                console.error(err)
                toast.error(err.message,{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
            }
        }
    })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col font-raleway font-semibold gap-5 h-[80dvh] items-center justify-center">
        <h1 className="text-3xl pt-3 lg:w-1/3 w-3/4 leading-[3rem]">Change Your Profile</h1>
        <p className="font-medium text-slate-600 lg:w-1/3 w-3/4">Please enter your password to update your profile</p>
        <div className="flex relative flex-col lg:w-1/3 w-3/4 pb-2 lg:pb-2">
            <label htmlFor="password">Password</label>
            <input
            id="password"
            name="password"
            type="password"
            className={`font-medium py-2 px-2 rounded-md ${formik.touched.password && formik.errors.password ? "border-red-500 border-2" : ""} border-black border`}
            placeholder="Enter Your Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors ? <p className="absolute top-[4.3rem] text-red-500 pt-">{formik.errors.password}</p> : null }
        </div>
        <button
        onSubmit={formik.handleSubmit}
        type="submit"
        className="border-black border py-3 lg:mt-3 mt-10 w-3/4 lg:w-1/3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white">
        Update profile
        </button>
    </form>
  )
}
