import React, { useState } from "react";
import { useStore } from "../store/store";
import Feeds from "../components/Feeds";
import Articles from "../components/Articles";
import { Link } from "react-router-dom";

const Home = () => {
    const [url, setUrl] = useState("")
    const { setFeeds, favourites } = useStore()
    const addFeedToLocalStorage = () => {
        const feeds = JSON.parse(localStorage.getItem("feeds") || "[]")
        if (feeds.includes(url)) {
            alert("Feed already exists")
            return
        } else {
            feeds.push(url)
            localStorage.setItem("feeds", JSON.stringify(feeds))
            setFeeds(feeds)
        }
        setUrl("")
    }
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-start justify-start w-full h-full max-w-7xl mx-auto py-4 gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-4xl font-bold">
                        RSS Feed Reader
                    </h1>
                    <Link to="/favourites" className="text-lg text-gray-500">
                        Favourites ({favourites.length})
                    </Link>
                </div>

                <div className="flex flex-row items-start justify-start w-full gap-2">
                    <input
                        type="text"
                        placeholder="Enter RSS Feed URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full h-10 rounded-md border-2 border-gray-300 p-2" />
                    <button className="h-10 rounded-md bg-blue-500 text-white py-2 px-4 cursor-pointer" onClick={addFeedToLocalStorage}>
                        Add
                    </button>
                </div>
                <Feeds />
                <Articles />
            </div>
        </main>
    )
};

export default Home;