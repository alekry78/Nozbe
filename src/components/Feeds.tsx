import { Feed, useStore } from "../store/store"
import SingleFeed from "./SingleFeed"

const Feeds = () => {
    const { articles } = useStore()
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <h2 className="text-2xl font-bold">
                Feeds
            </h2>
            <div className="flex flex-col items-start justify-start w-full gap-4">
                {articles.length === 0 ? (
                    <p className="text-gray-500">No feeds added yet. Add a feed URL above to get started.</p>
                ) : (
                    articles.map((feed: Feed, index: number) => (
                        <SingleFeed key={`${feed.title}-${index}`} index={index} feed={feed} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Feeds