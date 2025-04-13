import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Item, Feed } from "../store/store";
import { useStore } from "../store/store";
import DOMPurify from 'dompurify';

const ArticlePage = () => {
    const { query } = useParams();
    const { articles, setReadArticles, readArticles } = useStore();
    const [article, setArticle] = useState<Item>();
    const [sanitized, setSanitized] = useState<string>('');
    useEffect(() => {
        const article = articles
            .flatMap((feed: Feed) => feed.items)
            .find((article: Item) => article.title === query);
        setArticle(article);
        const rawHtml = article?.['content:encoded'] || article?.content || '';
        if (!rawHtml) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');
        const forbiddenTags = ['nav', 'header', 'footer', 'script', 'iframe', 'svg'];
        forbiddenTags.forEach((tag) => {
            doc.querySelectorAll(tag).forEach(el => el.remove());
        });
        const mainContent =
            doc.querySelector('article') ||
            doc.querySelector('main') ||
            doc.body;
        if (!mainContent) return;
        const cleanHtml = mainContent.innerHTML;
        const sanitizedHtml = DOMPurify.sanitize(cleanHtml, {
            ALLOW_DATA_ATTR: true,
            ADD_ATTR: ['style'],
        });
        setSanitized(sanitizedHtml);
        if (article && !readArticles.some(readArticle => readArticle.title === article.title)) {
            setReadArticles([...readArticles, article]);
            const storedReadArticles = JSON.parse(localStorage.getItem('readArticles') || '[]');
            localStorage.setItem('readArticles', JSON.stringify([...storedReadArticles, article]));
        }
    }, [articles, query]);


    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-start justify-start w-full h-full max-w-7xl mx-auto py-4 gap-4">
                <button onClick={() => window.history.back()} className="text-blue-500 cursor-pointer">Back</button>
                <h1 className="text-2xl font-bold">{article?.title}</h1>
                {article?.enclosure && <img src={article?.enclosure.url} alt={article?.title} className="max-w-full h-auto" />}
                <div className="prose prose-lg max-w-none w-full" dangerouslySetInnerHTML={{ __html: sanitized }} />
            </div>
        </main>
    )
};

export default ArticlePage;