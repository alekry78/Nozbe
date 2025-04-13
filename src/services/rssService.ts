
const parser = new window.RSSParser();

export const fetchFeed = async (url: string) => {
  try {
    const feed = await parser.parseURL(url);
    return feed;
  } catch (err) {
    console.error("Błąd przy parsowaniu feeda:", err);
    return undefined;
  }
};
