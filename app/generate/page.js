"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'

const Generate = () => {

    const searchParams = useSearchParams();

    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }


    const submitLinks = async () => {


        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success(result.message)
            setLinks([])
            sethandle("")
            setpic("")
            setdesc("")
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <div>
            <div className='bg-[#225abf] min-h-screen grid grid-cols-2'>
                <div className="col1 flex justify-center items-center flex-col text-gray-900">
                    <div className='flex flex-col gap-5 my-8'>
                        <h1 className='font-bold text-4xl'>Create yout BitTree</h1>
                        <div className="item">
                            <h2 className='font-semibold text-xl'>Step 1: Claim your handle</h2>
                            <div className='mx-4'>
                                <input
                                    value={handle || ""}
                                    onChange={e => sethandle(e.target.value)}
                                    className='px-4 py-3 my-2 mx-3
                                    focus:outline-blue-500 rounded-full'
                                    type="text"
                                    placeholder='Choose a handle' />
                            </div>
                        </div>
                        <div className="item">
                            <h2 className='font-semibold text-xl'>Step 2: Add your links</h2>
                            {links && links.map((item, index) => {
                                return <div key={index} className='mx-4'>
                                    <input
                                        value={item.linktext || ""}
                                        onChange={e => { handleChange(index, item.link, e.target.value) }}
                                        className='px-4 py-3  my-2 focus:outline-blue-500 rounded-full mx-2'
                                        type="text"
                                        placeholder='Enter link text' />
                                    <input
                                        value={item.link || ""}
                                        onChange={e => { handleChange(index, e.target.value, item.linktext) }}
                                        className='px-4 py-3 my-2 focus:outline-blue-500 rounded-full mx-2'
                                        type="text"
                                        placeholder='Enter link' />
                                </div>
                            })}
                            <button
                                onClick={() => addLink()}
                                className='py-3 p-5 mx-5 bg-gray-900 text-white font-bold border-blue-900 border-2 rounded-full w-[450px] hover:bg-gray-800'>
                                + Add Link
                            </button>
                        </div>
                        <div className="item">
                            <h2 className='font-semibold text-xl'>Step 3: Add a profile picature and Description.</h2>
                            <div className='mx-4 flex flex-col'>
                                <input
                                    value={pic || ""}
                                    onChange={e => setpic(e.target.value)}
                                    className='px-4 py-3  my-2 focus:outline-blue-500 rounded-full mx-2'
                                    type="text"
                                    placeholder='Enter link to a picture' />
                                <input
                                    value={desc || ""}
                                    onChange={e => setdesc(e.target.value)}
                                    className='px-4 py-3  my-2 focus:outline-blue-500 rounded-full mx-2'
                                    type="text"
                                    placeholder='Enter Description' />
                                <button disabled={pic == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitLinks() }} className=' disabled:bg-slate-300 py-3 p-5 mx-2 bg-gray-900 text-white font-bold border-blue-900 border-2 rounded-full hover:bg-gray-800'>Create your bitTree</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col2 w-full h-screen bg-[#225abf] flex justify-center">
                    <img className='h-full object-contain' src="/login.png" alt="Generate your links" />
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Generate
