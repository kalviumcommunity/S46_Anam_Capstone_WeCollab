
export default function About({description}) {
  return (
    <>
        <div className="lg:w-1/2 mt-1 flex flex-col w-full border-black border-2 rounded-md relative bg-white p-5">
            <div className="flex justify-between py-2 pb-5">
                    <h1 className="text-3xl font-semibold">About</h1>
                    <img className="size-6 cursor-pointer" src="./assets/edit.svg" alt="" />
                </div>
                {description && <p className="my-5">{description}</p>}
        </div>
    </>
  )
}
