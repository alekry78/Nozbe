import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import { useEffect } from "react"
import { Feed, useStore } from "./store/store"
import ArticlePage from "./pages/ArticlePage"
import { fetchFeed } from "./services/rssService"
import Favourites from "./pages/Favourites"
function App() {
  const { setFeeds, setChosenFeed, setArticles, feeds, setReadArticles, setFavourites } = useStore();
  useEffect(()=>{
    const feeds = JSON.parse(localStorage.getItem("feeds") || "[]")
    const chosenFeedLocale = localStorage.getItem("chosenFeed") || ""
    setFeeds(feeds)
    setChosenFeed(chosenFeedLocale)
    const readArticles = JSON.parse(localStorage.getItem("readArticles") || "[]")
    setReadArticles(readArticles)
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]")
    setFavourites(favourites)
  },[])
  useEffect(() => {
    const fetchFeedDetails = async () => {
      const feedPromises = feeds.map(feed => fetchFeed(feed));
      const results = await Promise.all(feedPromises);
      setArticles(results.filter((result: Feed[]) => result !== undefined));
    }
    fetchFeedDetails()
  }, [feeds])
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:query" element={<ArticlePage />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
