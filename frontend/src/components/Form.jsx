import {useFormik} from "formik"
import * as Yup from "yup"
import Navbar from "./Navbar"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useMutation} from '@apollo/client';
import { USER_SIGNUP, USER_LOGIN, UPDATE_USER } from "../graphql/CRUD"
import { toast } from 'sonner';
import { useUserStore } from "@/zustand/store";
import { useState } from "react";
import PasswordAuth from "./PasswordAuth";

export default function Form() {

    const {form} = useParams()
    const navigate = useNavigate()

    const [userSignup, { data: signupData, loading: signupLoading, error: signupError }] = useMutation(USER_SIGNUP)
    const [userLogin, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(USER_LOGIN);
    const [updateUser,{data: updateData,loading: updateLoading,error: updateError }] = useMutation(UPDATE_USER)
    const [userData,setUserData] = useState(useUserStore((state) => state.userData))

    const setCookie = (cookieName,value,daysToLive) => {
        const date = new Date()
        date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
        let expires = "expires=" + date.toUTCString()
        document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }

    const initialValues = {
        name:"",
        email: "",
        password: ""
    }

    const getCharacterValidationError = (str) => {
        return `password must have at least one ${str} character`;
    };

    const validationSchema = Yup.object().shape({
        name: form === "signup" 
        ? Yup.string().required("Username is required")
        : Yup.string().optional(),
        email: Yup.string().email("Please enter a valid email").required("Email is required"),
        password: Yup.string().required("Password is required")
        .min(6,"Password should be atleast 6 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[@#$%^&*]/,getCharacterValidationError("special"))
    })

    const handleGoogle = () => {
        try{
            fetch(import.meta.env.VITE_GOOGLE_AUTH,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => window.location.href = data.redirectURI)
        }catch(err){
            console.error(err.message)
            throw new Error(err.message)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ name, email, password }) => {
            console.log("submitted")
            if (form === "signup") {
                try {
                    await userSignup({ variables: { userInput: { name, email, password } } })
                        .then(({data}) => {
                            setCookie("token",data.userSignup.token, 1)
                            setCookie("user", data.userSignup.email, 1);
                            navigate("/home");
                        })
                        .catch((err) => {
                            console.error(err,);
                            toast.error(err,{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
                        });
                } catch (err) {
                    console.error(err)
                    toast.error(err,{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
                }
            } else if(form === "login") {
                try {
                    await userLogin({ variables: { loginData: { email, password } } })
                        .then(({data}) => {
                            setCookie("token",data.userLogin.token,30)
                            setCookie("user", data.userLogin.email, 1)
                            navigate("/home")
                        })
                        .catch((err) => {
                            console.error(err)
                            toast.error(err.message, { position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
                        });
                } catch (err) {
                    console.error(err)
                    toast.error(err.message,{ position:"top-right", className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border" })
                }
            }
        }
    })

    return (
        <>
            <Navbar/>
            {form && form === "edit" ?
            <PasswordAuth/>
            :
            ""
            }
            <form onSubmit={formik.handleSubmit} className="flex flex-col font-raleway font-semibold gap-5 h-[80dvh] items-center justify-center">
                    {form && form === "signup" ?
                    // For Signup
                    <>
                        <h1 className="text-3xl py-3 w-1/2 text-center leading-[3rem]">Create Your Account</h1>
                        <div className="flex relative flex-col lg:w-1/3 w-3/4 pb-2 lg:pb-3">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`font-medium py-2 px-2 rounded-md ${formik.touched.name && formik.errors.name ? "border-red-500 border-2" : ""} border-black border`}
                                placeholder="Enter Your Full Name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                />
                            {formik.touched.name && formik.errors ? <p className="absolute top-16 text-red-500 pt-1">{formik.errors.name}</p> : null }
                        </div>
                        <div className="flex relative flex-col lg:w-1/3 w-3/4 pb-2 lg:pb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`font-medium py-2 px-2 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-black border`}       
                                placeholder="Enter Your Email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                />
                            {formik.touched.email && formik.errors ? <p className="absolute top-16 text-red-500 pt-1">{formik.errors.email}</p> : null }
                        </div>
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
                            type="submit"
                            className="border-black border-0 py-3 lg:mt-3 mt-10 w-3/4 lg:w-1/3 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                            Submit
                        </button>
                        <div onClick={handleGoogle} className="flex gap-3 items-center justify-center border-black border py-3 w-3/4 lg:w-1/3 rounded-full cursor-pointer hover:bg-orange-50">
                            <img className="size-5" src="/assets/google.svg" alt="" />
                            <p>Sign-up with Google</p>
                        </div>
                    </> 
                    :
                    form === "login" ?
                    // For Login
                    <>
                        <h1 className="text-3xl py-3 w-1/2 text-center leading-[3rem]">Login To Your Account</h1>
                        <div className="flex relative flex-col lg:w-1/3 w-3/4 pb-2 lg:pb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`font-medium py-2 px-2 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-black border`}       
                            placeholder="Enter Your Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            />
                        {formik.touched.email && formik.errors ? <p className="absolute top-16 text-red-500 pt-1">{formik.errors.email}</p> : null }
                    </div>
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
                        type="submit"
                        className="border-black border py-3 lg:mt-3 mt-10 w-3/4 lg:w-1/3 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                        Submit
                    </button>
                    <div onClick={handleGoogle} className="flex gap-3 items-center justify-center border-black border py-3 w-3/4 lg:w-1/3 rounded-full cursor-pointer hover:bg-orange-50">
                        <img className="size-5" src="/assets/google.svg" alt="" />
                        <p>Log-In with Google</p>
                    </div>
                    </>
                    :
                    ""
                    }
                </form>
                
        </>
    )
}
