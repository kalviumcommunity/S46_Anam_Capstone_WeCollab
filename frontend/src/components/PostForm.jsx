import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"
import { imageDB } from "@/firebase/config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { toast } from 'sonner'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Roles from "./Roles"
import { useNavigate, useParams } from "react-router-dom"
import parse from 'html-react-parser'
import { useFormik } from "formik"
import RichTextEditor from "./TextEditor"
import Preview from "./Preview"
import { useMutation } from "@apollo/client"
import { POST_PROJECT, POST_IDEA } from "@/graphql/CRUD"

const initialValues = {
    title: '',
    status: 'open',
    about: '',
    displayAbout: '',
    summary: '',
    thumbnail: null,
    presentationLink: '',
    collaborators: '',
    experience: '',
    experienceDuration: '',
    vacancy: '',
    budget: '',
    displayBudget: '',
    timeline: '',
    timelineDuration: '',
    role: '',
    seeking: [],
    category: '',
    skillInput: '',
    skills: [],
    tag: '',
    tags: [],
    responsibility: '',
  };
  

export default function PostProject() {

    const {section} = useParams()
    const navigate = useNavigate()

    const [image,setImage] = useState()
    const [uploaded,setUpload] = useState(false)
    const [loading,setLoading] = useState(false)
    const [createProject,{data: projectData,loading: projectLoading,error: projectError}] = useMutation(POST_PROJECT)
    const [createIdea,{data: ideaData, loading: ideaLoading, error: ideaError}] = useMutation(POST_IDEA)
    
    const skillColors = [{bg: "#bbb2cf", text: "#33294e"},{bg: "#cb9ca2", text:"#35282a"},{bg:"#afbbbb", text:"#363b3b"},{bg:"#9ea7bb", text:"#353841"}] 

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
          try{
            await handleUpload(image)
            if(section === "project"){
              await createProject({ variables: { projectInput: {
                userId:"1234",
                title: values.title,
                about: values.about,
                thumbnail: values.thumbnail,
                collaborators: values.collaborators,
                budget: values.displayBudget,
                timeline: values.timeline + " " + values.timelineDuration,
                seeking: values.seeking
              } } })
              toast.success("Post Successful", {
                className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                position: "top-right"
              })
              navigate("/profile")
            }else{
              await createIdea({ variables: { ideaInput: {
                userId: "1234",
                title: values.title,
                summary: values.summary,
                description: values.about,
                status: values.status,
                category: values.category,
                skills: values.skills,
                tags: values.tags
              } }})
              toast.success("Post Successful", {
                className: "text-green-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
                position: "top-right"
                })
              navigate("/profile")
            }
          }catch(error){
            toast.error(error, {
              className: "text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border-2",
          })
            console.log(error)
          }
        },
      });
    
      const handleUpload = async (image) => {
        setLoading(true)
        const imageRef = ref(imageDB, `project/thumbnail`);
        if (!image) {
          toast.error('No image selected for upload', {
            position: 'top-right',
            className: 'text-red-600 text-[1rem] bg-white py-5 shadow-none border-black border',
          });
          setLoading(false);
          return;
        }
        try {
          await uploadBytes(imageRef, image);
          setUpload(true);
          const imageURL = await getDownloadURL(imageRef)
          formik.setFieldValue('thumbnail', imageURL)
          setLoading(false);
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error(error, {
            position: 'top-right',
            className: 'text-red-600 text-[1.2rem] bg-white py-5 shadow-none border-black border',
          });
        }
      };
    
      const handleAbout = async (value) => {
        formik.setFieldValue('about', value);
        const parsedValue = await parse(value)
        formik.setFieldValue('displayAbout', parsedValue)
      };

      const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    
      const handleBudgetChange = (value) => {
        formik.setFieldValue('budget',value );
        const displayValue = value.replace(/,/g, '');
        if (!isNaN(value)) {
          const formattedValue = numberWithCommas(displayValue);
          formik.setFieldValue('displayBudget', formattedValue);
        }
      };

      const handleAddTag = (tag) => {
        formik.setFieldValue('tags', [...formik.values.tags, tag])
      }
    
      const handleAddSkill = (skill) => {
        formik.setFieldValue('skills', [...formik.values.skills, skill]);
      };

      const handleRemoveTag = (tagToRemove) => {
        formik.setFieldValue('tags', formik.values.tags.filter((tag) => tag !== tagToRemove))
      }
    
      const handleRemoveSkill = (skillToRemove) => {
        formik.setFieldValue('skills', formik.values.skills.filter((skill) => skill !== skillToRemove));
      };
    
      const handleAddRole = () => {
        formik.setFieldValue('seeking', [...formik.values.seeking,{role: formik.values.role, experience: formik.values.experience + " " + formik.values.experienceDuration, vacancy: formik.values.vacancy, skills: formik.values.skills, responsibility: formik.values.responsibility}]);
        formik.setFieldValue('role', '')
        formik.setFieldValue('experience', '')
        formik.setFieldValue('experienceDuration', '')
        formik.setFieldValue('vacancy','')
        formik.setFieldValue('skills',[])
        formik.setFieldValue('responsibility','')
      };
    
      const handleRemoveRole = (roleToRemove) => {
        formik.setFieldValue('seeking', formik.values.seeking.filter((role) => role !== roleToRemove));
      };
    
  return (
    <>
    <div className="flex flex-col h-screen">
    <Navbar/>
    <div className="flex flex-row-reverse lg:h-screen md:h-screen bg-[#fff3e6] font-Poppins">
        <div className="lg:overflow-y-auto md:overflow-y-auto overflow-x-clip">
        <form
            onSubmit={formik.handleSubmit}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            className="flex flex-col gap-3 overflow-y lg:gap-5 bg-white py-10 lg:pb-20 lg:w-[30dvw] md:w-[30dvw] border-black lg:border-l md:border-l "
          >
            {section === 'idea' ? (
              <h1 className="font-semibold text-2xl lg:text-3xl px-10">Create Idea</h1>
            ) : (
              <h1 className="font-semibold text-2xl lg:text-3xl px-10">Create project</h1>
            )}
            <div className="flex flex-col px-10">
              <label className="text-xl font-semibold pb-2" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                placeholder="Project title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="border-black border p-2 rounded-md"
                type="text"
              />
            </div>
            {section === 'idea' ? (
              <>
                <div className="flex flex-col px-10">
                  <label className="text-xl pb-2 font-semibold" htmlFor="summary">
                    Summary
                  </label>
                  <input
                    id="summary"
                    placeholder="Idea summary"
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                    className="border-black border p-2 rounded-md"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mx-10 justify-between items-center text-blue-600 border-blue-600 border p-10 lg:p-10 bg-blue-100 rounded-md">
                  <label htmlFor="thumbnail" className="cursor-pointer flex flex-col items-center">
                    <p className="text-2xl">+</p>
                    <p className="text-[1.1rem] text-center lg:text-xl">Add Idea Thumbnail</p>
                  </label>
                  <input
                    id="thumbnail"
                    onChange={(e) => {
                        formik.setFieldValue('thumbnail', URL.createObjectURL(e.target.files[0]))
                        setImage(e.target.files[0])
                    }}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div className="flex flex-col px-10">
                  <label className="text-xl font-semibold pb-2" htmlFor="about">
                    Description
                  </label>
                  <RichTextEditor handleAbout={handleAbout} />
                </div>
                <div className="flex flex-col gap-3 px-10">
                    <label className="font-semibold text-xl" htmlFor="">Category</label>
                    <Select
                        value={formik.values.category}
                        onValueChange={(value) =>
                        formik.setFieldValue('category', value)
                        }
                        onBlur={formik.handleBlur}
                    >
                        <SelectTrigger className="w-[180px] border">
                        <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="art-design">Arts & Design</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="market-ad">Marketing & Advertising</SelectItem>
                        <SelectItem value="non-profit">Non-profit</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm"> <span className="font-semibold">Note:</span> Category won't be shown in the post and will be only used for internal filter</p>
                </div>
                <div className="flex flex-col gap-3 px-10">
                    <label className="font-semibold text-xl" htmlFor="">Status</label>
                    <Select
                        disabled
                        value={formik.values.status}
                        onValueChange={(value) =>
                        formik.setFieldValue('status', value)
                        }
                        onBlur={formik.handleBlur}
                    >
                        <SelectTrigger className="w-[180px] border">
                        <SelectValue placeholder="Open" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm"> <span className="font-semibold">Note:</span> The idea status will stay "open" after posting, you can later change the status</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col px-10">
                  <label className="text-xl pb-2 font-semibold" htmlFor="presentationLink">
                    Presentation Link
                  </label>
                  <input
                    id="presentationLink"
                    placeholder="Slide link"
                    value={formik.values.presentationLink}
                    onChange={formik.handleChange}
                    className="border-black border p-2 rounded-md"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mx-10 justify-between items-center text-blue-600 border-blue-600 border p-10 lg:p-10 bg-blue-100 rounded-md">
                  <label htmlFor="thumbnail" className="cursor-pointer flex flex-col items-center">
                    <p className="text-2xl">+</p>
                    <p className="text-[1.1rem] text-center lg:text-xl">Add Project Thumbnail</p>
                  </label>
                  <input
                    id="thumbnail"
                    onChange={(e) => {
                        formik.setFieldValue('thumbnail', URL.createObjectURL(e.target.files[0]))
                        setImage(e.target.files[0])
                    }}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div className="px-10">
                    <h1 className="text-xl font-semibold pb-2">About</h1>
                    <RichTextEditor handleAbout={handleAbout} />
                </div>
                <div className="flex flex-row flex-wrap gap-3 px-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" htmlFor="collaborators">
                      Team Size
                    </label>
                    <input
                      id="collaborators"
                      value={formik.values.collaborators}
                      onChange={formik.handleChange}
                      className="w-28 border-black border p-2 rounded-md"
                      type="number"
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold" htmlFor="budget">Project Budget</label>
                        <input value={formik.values.budget} onChange={(e) => handleBudgetChange(e.target.value)} id="budget" className="border-black w-40 border p-2 rounded-md" type="number" />
                    </div>
                    </div>
                    <div className="flex flex-col gap-5 px-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold" htmlFor="timeline">
                            Timeline
                            </label>
                            <div className="flex gap-3">
                                <input
                                    id="timeline"
                                    value={formik.values.timeline}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-28 border-black border p-2 rounded-md"
                                    type="number"
                                />
                                <Select
                                    value={formik.values.timelineDuration}
                                    onValueChange={(value) =>
                                    formik.setFieldValue('timelineDuration', value)
                                    }
                                    onBlur={formik.handleBlur}
                                >
                                    <SelectTrigger className="w-[180px] border">
                                    <SelectValue placeholder="Select time period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="month(s)">Months</SelectItem>
                                    <SelectItem value="year(s)">Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
              </>
            )}
                {section === "idea" ? 
                <>
                    <div className="flex flex-col py-5 px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="skillInput">Skills Required</label>
                        <div className="mb-4">
                            {formik.values.skills.length > 0 && formik.values.skills.map(skill => (
                                <div className="flex text-md bg-blue-100 p-2 my-2 rounded-md justify-between" key={skill}>
                                    <p>{skill}</p>
                                    <p className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>x</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 lg:gap-3">
                            <input value={formik.values.skillInput} onChange={formik.handleChange} placeholder="Webflow" id="skillInput" className="border-black border p-2 w-5/6 lg:w-[inherit] rounded-md" type="text" />
                            <button type="button" onClick={() => {
                                if (formik.values.skillInput.trim()) {
                                handleAddSkill(formik.values.skillInput.trim());
                                formik.setFieldValue('skillInput', '');
                                }
                            }} 
                            className="border-black border bg-white p-2 lg:w-[inherit] lg:px-2 rounded-md">Add +</button>
                        </div>
                    </div>
                    <div className="flex flex-col py-5 px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="tag">Tags</label>
                        <div className="mb-4">
                            {formik.values.tags.length > 0 && formik.values.tags.map(tag => (
                                <div className="flex text-md bg-blue-100 p-2 my-2 rounded-md justify-between" key={tag}>
                                    <p>#{tag}</p>
                                    <p className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>x</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 lg:gap-3">
                            <input value={formik.values.tag} onChange={formik.handleChange} placeholder="Webflow" id="tag" className="border-black border p-2 w-5/6 lg:w-[inherit] rounded-md" type="text" />
                            <button type="button" onClick={() => {
                                if (formik.values.tag.trim()) {
                                handleAddTag(formik.values.tag.trim());
                                formik.setFieldValue('tag', '');
                                }
                            }} 
                            className="border-black border bg-white p-2 lg:w-[inherit] lg:px-2 rounded-md">Add +</button>
                        </div>
                    </div>
                </>
                :
                <>
                <hr className="border my-4 mx-10" />
                <h1 className="text-2xl lg:text-3xl font-semibold px-10">Seeking</h1>
                <div className="flex flex-col gap-3 lg:gap-5">
                    <div className="flex flex-col gap-3">
                        {formik.values.seeking &&
                        formik.values.seeking.map((roles, index) => (
                            <div
                            className={`mx-10 justify-between bg-[${skillColors[index].bg}] p-3 text-[${skillColors[index].bg}] rounded-md`}
                            key={roles.role}
                            >
                                <Roles role={roles} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="role">Role</label>
                        <input value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="UX Designer" id="role" className="border-black border p-2 rounded-md" type="text"/>
                    </div>
                    <div className="flex flex-col px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="responsibility">Responsibility</label>
                        <textarea value={formik.values.responsibility} onChange={formik.handleChange} onBlur={formik.handleBlur} id="responsibility" className="border-black whitespace-pre-wrap border p-2 rounded-md" name="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-5">
                        <label className="text-xl font-semibold px-10" htmlFor="experience">Experience</label>
                        <div className="flex flex-col lg:flex-col gap-3 lg:gap-5">
                            <input value={formik.values.experience} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border-black border p-2 rounded-md mx-10" id="experience" type="number" />
                            <Select value={formik.values.experienceDuration} onValueChange={(value) => formik.setFieldValue('experienceDuration',value )}>
                                <SelectTrigger className="w-[180px] mx-10 border">
                                    <SelectValue placeholder="Select time period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="month(s)">Months</SelectItem>
                                    <SelectItem value="year(s)">Years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-3 px-10">
                        <label className="text-xl font-semibold" htmlFor="vacancy">Vacancy</label>
                        <input value={formik.values.vacancy} onChange={formik.handleChange} onBlur={formik.handleBlur} id="vacancy" className="border-black border p-2 rounded-md" type="number" />
                    </div>
                    <div className="flex flex-col py-5 px-10">
                        <label className="text-xl font-semibold pb-2" htmlFor="skillInput">Skills Required</label>
                        <div className="mb-4">
                            {formik.values.skills.length > 0 && formik.values.skills.map(skill => (
                                <div className="flex text-xl bg-blue-100 p-2 my-2 rounded-md justify-between" key={skill}>
                                    <p>{skill}</p>
                                    <p className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>x</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 lg:gap-3">
                            <input value={formik.values.skillInput} onChange={formik.handleChange} placeholder="Webflow" id="skillInput" className="border-black border p-2 w-5/6 lg:w-[inherit] rounded-md" type="text" />
                            <button type="button" onClick={() => {
                                if (formik.values.skillInput.trim()) {
                                    handleAddSkill(formik.values.skillInput.trim());
                                    formik.setFieldValue('skillInput', '');
                                }
                            }} 
                            className="border-black border bg-white p-2 lg:w-[inherit] lg:px-2 rounded-md">Add +</button>
                        </div>
                    </div>
                    <div className="text-right">
                        <button onClick={handleAddRole} type="button" className="bg-orange-600 text-white p-2 font-semibold rounded-md mx-10">Add Role +</button>
                    </div>
                </div>
                </>
                }
            <hr className="border mx-10" />
            <button type="submit" className="bg-blue-500 text-white font-semibold p-2 rounded-md mx-10">Post</button>
            </form>
        </div>
        <Preview values={formik.values} handleRemoveRole={handleRemoveRole} />
    </div>
    <Footer/>
    </div>
    </>
  )
}
