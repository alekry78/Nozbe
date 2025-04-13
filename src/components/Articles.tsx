import React, { useState } from "react"
import { Feed, Item, useStore } from "../store/store"
import Article from "./Article"

const ArticlesList = () => {
    const { articles, chosenFeed, setSearchQuery, searchQuery, readArticles } = useStore()
    const [showRead, setShowRead] = useState(false);
    const [showNotRead, setShowNotRead] = useState(false);
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <h2 className="text-2xl font-bold">
                Articles
            </h2>
            <div className="w-full mb-4">
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                        const timeoutId = setTimeout(() => {
                            setSearchQuery(e.target.value);
                        }, 500);
                        return () => clearTimeout(timeoutId);
                    }}
                />
            </div>
            <div className="flex flex-row items-center justify-start gap-2 mb-5">
                <button 
                    className={`${!showRead ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} px-4 py-2 rounded-md`} 
                    onClick={() => {
                        setShowRead(prevState => !prevState);
                        setShowNotRead(false);
                    }}
                >
                    Show Read
                </button>
                <button 
                    className={`${!showNotRead ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} px-4 py-2 rounded-md`} 
                    onClick={() => {
                        setShowNotRead(prevState => !prevState);
                        setShowRead(false);
                    }}
                >
                    Show Not read
                </button>
            </div>
        
            <div className="flex flex-col items-start justify-start w-full gap-4">
                {(() => {
                    const filteredArticles = articles
                        .filter(feed => chosenFeed === "" || feed.feedUrl === chosenFeed)
                        .flatMap(feed => feed.items)
                        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .filter(item => {
                            if (showRead) {
                                return readArticles.some(article => article.title === item.title);
                            }
                            if (showNotRead) {
                                return !readArticles.some(article => article.title === item.title);
                            }
                            return true;
                        })
                        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

                    if (filteredArticles.length === 0) {
                        return <p className="text-gray-500">No articles found. Try adjusting your search or filter criteria.</p>;
                    }

                    return filteredArticles.map((item: Item, index: number) => (
                        <Article key={`${item.title}-${index}`} item={item} />
                    ));
                })()}
            </div>
        </div>
    )
}

export default ArticlesList