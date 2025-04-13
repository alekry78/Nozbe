import React from "react";
import { Link } from "react-router-dom";
import { Item, useStore } from "../store/store";
import Article from "../components/Article";

const Favourites = () => {
    const { favourites } = useStore()
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-start justify-start w-full h-full max-w-7xl mx-auto py-4 gap-4">
                <Link to="/" className="text-blue-500 cursor-pointer">Back</Link>
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-4xl font-bold">
                        Favourites
                    </h1>
                    <Link to="/favourites" className="text-lg text-gray-500">
                        Favourites ({favourites.length})
                    </Link>
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-4">
                    {favourites
                        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
                        .map((item: Item, index: number) => (
                            <Article key={`${item.title}-${index}`} item={item} />
                        ))
                    }
                </div>
            </div>
        </main>
    )
};

export default Favourites;