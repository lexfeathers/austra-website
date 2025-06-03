import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";
import favicon from "lume/plugins/favicon.ts";
import date from "lume/plugins/date.ts";
import feed from "lume/plugins/feed.ts";

const site = lume({
  location: new URL("https://austra-site.netlify.app")
});
site.data("name", "Austra");
site.use(favicon({
  input: "/assets/favicon.ico",
}));
site.use(date());
site.use(feed({
  output: "/feed.rss", // The file or files that must be generated
  query: "type=posts", // Select only pages of type=post
  sort: "date=desc", // To sort by date in descending order
  limit: 10, // To show only the 10 first results
  info: {
    title: "Austra", // The feed title
    description: "", // The feed subtitle
    published: new Date(), // The publishing date
    lang: "en", // The language of the feed
    hubs: undefined, // The WebSub hubs for the feed
    authorName: "Austra", // The author of the site
    authorUrl: "{{location}}", // The URL of the author
    icon: "/assets/favicon.ico",
  },
  items: {
    title: "=title", // The title of every item
    description: "=excerpt", // The description of every item
    published: "=date", // The publishing date of every item
    updated: undefined, // The last update of every item
    content: "$article", // The content of every item
    lang: "=lang", // The language of every item
    image: "=cover", // The image of the item
    authorName: "=author.name", // The author of the article
  },
}));
site.use(metas());

site.add("./assets");
site.add("./styles.css");

export default site;
