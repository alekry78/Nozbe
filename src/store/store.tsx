import { create } from "zustand";

export interface Item {
    content: string;
    contentSnippet: string;
    'content:encoded'?: string;
    enclosure: {
        url: string;
        length: string;
        type: string;
    };
    guid: string;
    isoDate: string;
    link: string;
    pubDate: string;
    title: string;
}

export interface Feed {
    description: string;
    docs: string;
    feedUrl: string;
    items: Item[];
    language: string;
    link: string;
    managingEditor: string;
    paginationLinks: {
        self: string;
    };
    title: string;
    webMaster: string;
}

interface Store {
    feeds: string[];
    setFeeds: (feeds: string[]) => void;
    articles: Feed[];
    setArticles: (articles: Feed[]) => void;
    chosenFeed: string;
    setChosenFeed: (chosenFeed: string) => void;
    readArticles: Item[];
    setReadArticles: (readArticles: Item[]) => void;
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    favourites: Item[];
    setFavourites: (favourites: Item[]) => void;
}

export const useStore = create<Store>((set) => ({
    feeds: [],
    setFeeds: (feeds) => set({ feeds }),
    articles: [],
    setArticles: (articles) => set({ articles }),
    chosenFeed: "",
    setChosenFeed: (chosenFeed) => set({ chosenFeed }),
    readArticles: [],
    setReadArticles: (readArticles) => set({ readArticles }),
    searchQuery: "",
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    favourites: [],
    setFavourites: (favourites) => set({ favourites }),
}))