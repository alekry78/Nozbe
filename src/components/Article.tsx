import React from "react";
import { useStore } from "../store/store"
import { Item } from "../store/store";
import { Link } from "react-router-dom";

const Article = ({ item }: { item: Item }) => {
    const { readArticles, favourites, setFavourites } = useStore()
    const addToFavourites = () => {
        const isFavourited = favourites.some(article => article.title === item.title);
        if (isFavourited) {
            setFavourites(favourites.filter(article => article.title !== item.title));
            const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
            localStorage.setItem('favourites', JSON.stringify(storedFavourites.filter((article: Item) => article.title !== item.title)));
        } else {
            setFavourites([...favourites, item]);
            const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
            localStorage.setItem('favourites', JSON.stringify([...storedFavourites, item]));
        }
    }
    return (
        <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold ${readArticles.some(article => article.title === item.title) ? 'text-gray-500' : ''}`}>{item.title}</h3>
                <button onClick={addToFavourites} className="cursor-pointer">
                    <svg className={`w-5 h-5 ${favourites.some(article => article.title === item.title) ? 'text-yellow-500 fill-current' : 'text-gray-400 stroke-current'}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="1" fill={favourites.some(article => article.title === item.title) ? 'currentColor' : 'none'} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            </div>
            <p className="text-sm text-gray-500">{item.contentSnippet}</p>
            <p className="text-sm text-gray-500">{new Date(item.pubDate).toLocaleDateString()}</p>
            <Link to={`/article/${item.title}`} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">View</Link>
        </div>
    )
}

export default Article