import RssFeed from "@/components/RSSFeed/RSSFeed";

export default async function Home() {
  const rss = await fetch('https://techcrunch.com/feed/');
  return (
    <RssFeed />
  );
}
