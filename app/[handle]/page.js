import clientPromise from "@/lib/mongodb"
import Link from "next/link"
import { notFound } from "next/navigation";


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    //if the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({ handle: handle })

    if (!item) {
        return notFound()
    }

    const item2 = {
        "_id": {
            "$oid": "67b9a4ac628c108f844c3ed2"
        },
        "links": [
            {
                "link": "x.com",
                "linktext": "x"
            },
            {
                "link": "https://www.instagram.com/ribadiya_raj/",
                "linktext": "instagram"
            },
            {
                "link": "fb.com",
                "linktext": "fb"
            },
            {
                "link": "yt.com",
                "linktext": "yt"
            }
        ],
        "pic": "https://avatars.githubusercontent.com/u/173432517?s=400&v=4"
    }
    return <div className="flex min-h-screen bg-purple-400 items-start py-10 justify-center ">
        {item && <div className="photo flex justify-center flex-col items-center gap-4">
            <img className="rounded-full" width={150} height={150} src={item.pic} alt="" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="desc w-[400px] text-center font-sans">
                {item.desc}
            </span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link href={item.link}><div key={index} className="bg-purple-100 py-4 shadow-lg px-2 rounded-md my-3 min-w-[400px] text-center flex justify-center">
                        {item.linktext}
                    </div></Link>
                })}
            </div>
        </div>}
    </div >
}