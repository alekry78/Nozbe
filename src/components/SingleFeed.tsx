import React from "react";
import { useStore } from "../store/store";
import { Feed } from "../store/store";

const SingleFeed = ({ index, feed }: { index: number, feed: Feed }) => {
    const { chosenFeed, setChosenFeed, setFeeds, articles, setArticles, setFavourites, setReadArticles } = useStore()
    const chooseFeed = (feed: string) => {
        if (chosenFeed === feed) {
            setChosenFeed("")
            localStorage.setItem("chosenFeed", "")
        } else {
            setChosenFeed(feed)
            localStorage.setItem("chosenFeed", `${feed}`)
        }
    }
    const deleteFeed = (feed: string) => {
        // Reset chosen feed if needed
        if (chosenFeed === feed) {
            setChosenFeed("")
            localStorage.setItem("chosenFeed", "")
        }

        // Get feed articles once to avoid multiple lookups
        const feedToDelete = articles.find(article => article.feedUrl === feed)
        const feedArticles = feedToDelete?.items || []

        // Update articles
        setArticles(articles.filter(article => article.feedUrl !== feed))

        // Update favourites by removing articles from this feed
        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
        const feedTitles = new Set(feedArticles.map(item => item.title))
        const updatedFavourites = favourites.filter((fav: any) => !feedTitles.has(fav.title))
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
        setFavourites(updatedFavourites)

        // Update read articles by removing articles from this feed
        const readArticles = JSON.parse(localStorage.getItem('readArticles') || '[]')
        const updatedReadArticles = readArticles.filter((article: any) => !feedTitles.has(article.title))
        localStorage.setItem('readArticles', JSON.stringify(updatedReadArticles))
        setReadArticles(updatedReadArticles)

        // Update feeds list
        const feeds = JSON.parse(localStorage.getItem("feeds") || "[]")
        const updatedFeeds = feeds.filter((f: string) => f !== feed)
        localStorage.setItem("feeds", JSON.stringify(updatedFeeds))
        setFeeds(updatedFeeds)
    }
    return (
        <div
            key={index}
            className={`flex flex-row items-center justify-between w-full h-full cursor-pointer p-2 ${chosenFeed === feed.feedUrl ? "bg-blue-50" : ""}`}>
            <div className="flex flex-col items-start justify-start w-full" onClick={() => chooseFeed(feed.feedUrl)}>
                <h3 className="text-lg font-bold">{feed.title}</h3>
                <p className="text-sm text-gray-500">{feed.description}</p>
            </div>
            <div className="flex flex-col items-start justify-start">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer z-10" onClick={() => deleteFeed(feed.feedUrl)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default SingleFeed