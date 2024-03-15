import {useFormik} from "formik"
import * as Yup from "yup"
import Navbar from "./Navbar"
import { useParams } from "react-router-dom"
import Footer from "./Footer"

export default function Form() {

    const {form} = useParams()

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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:(values) => {
            console.log(values)
        }
    })

    return (
        <>
            <Navbar/>
            <form onSubmit={formik.handleSubmit} className="flex flex-col font-raleway font-semibold gap-5 h-[90dvh] items-center justify-center">
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
                                className={`font-medium py-2 px-2 rounded-md ${formik.touched.name && formik.errors.name ? "border-red-500 border-2" : ""} border-black border-2`}
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
                                className={`font-medium py-2 px-2 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-black border-2`}       
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
                                className={`font-medium py-2 px-2 rounded-md ${formik.touched.password && formik.errors.password ? "border-red-500 border-2" : ""} border-black border-2`}
                                placeholder="Enter Your Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                />
                            {formik.touched.password && formik.errors ? <p className="absolute top-[4.3rem] text-red-500 pt-">{formik.errors.password}</p> : null }
                        </div>
                        <button
                            type="submit"
                            className="border-black border-2 py-3 lg:mt-3 mt-10 w-3/4 lg:w-1/3 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                            Submit
                        </button>
                        <div className="flex gap-3 items-center justify-center border-black border-2 py-3 w-3/4 lg:w-1/3 rounded-full cursor-pointer hover:bg-gray-200">
                            <img className="size-5" src="./assets/google.svg" alt="" />
                            <p>Sign-up with Google</p>
                        </div>
                    </> 
                    :
                    // For Login
                    <>
                        <h1 className="text-3xl py-3 w-1/2 text-center leading-[3rem]">Login To Your Account</h1>
                        <div className="flex relative flex-col lg:w-1/3 w-3/4 pb-2 lg:pb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`font-medium py-2 px-2 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-black border-2`}       
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
                            className={`font-medium py-2 px-2 rounded-md ${formik.touched.password && formik.errors.password ? "border-red-500 border-2" : ""} border-black border-2`}
                            placeholder="Enter Your Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            />
                        {formik.touched.password && formik.errors ? <p className="absolute top-[4.3rem] text-red-500 pt-">{formik.errors.password}</p> : null }
                    </div>
                    <button
                        type="submit"
                        className="border-black border-2 py-3 lg:mt-3 mt-10 w-3/4 lg:w-1/3 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                        Submit
                    </button>
                    <div className="flex gap-3 items-center justify-center border-black border-2 py-3 w-3/4 lg:w-1/3 rounded-full cursor-pointer hover:bg-gray-200">
                        <img className="size-5" src="./assets/google.svg" alt="" />
                        <p>Log-In with Google</p>
                    </div>
                    </>
                    }
                </form>
                <Footer/>
        </>
    )
}
