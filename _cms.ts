import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

// Set site time zone
// Timezone codes can be found at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
Deno.env.set("TZ", "US/Eastern");

// Get current date in YYYY-MM-DD format
const date = new Date();
const formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

const username = Deno.env.get("USERNAME");
const password = Deno.env.get("PASSWORD");

const cms = lumeCMS({
  site: {
    name: "Austra",
    url: "https://austra-site.netlify.app",
  },
  auth: {
    method: "basic",
    users: {
      [username]: password,
    },
  },
});

cms.storage(
  "src",
  new GitHub({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "lexfeathers",
    repo: "austra-website",
  })
);
// Configure a folder to upload files
cms.upload(
  "uploads: upload files here for use in posts/pages", 
  "src:uploads",
);

cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    {
      name: "title",
      type: "text",
      description: "Leave blank to use published date",
      value: formattedDate,
    },
    {
      name: "author",
      type: "text",
      init(field: { value: string; }) {
        field.value = "Austra";
      },
    },
    {
      name: "draft",
      type: "checkbox",
    },
    {
      name: "date",
      type: "datetime",
      init(field: { value: Date; }) {
        field.value = new Date("yyyy, MM, dd");
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      attributes: {
        maxlength: 800,
      },
    },
    {
      name: "content",
      type: "markdown",
      upload: "images",
      label: "Post content",
      value: "Write **markdown** code here",
      description: `<a target="_blank" href="https://www.markdownguide.org">More info about markdown syntax</a>`,
    },
  ],
  documentName: "{title}.md",
});
cms.collection({
  name: "pages",
  store: "src:pages/*{.md,.vto}",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "draft",
      type: "checkbox",
    },
    {
      name: "content",
      type: "markdown",
      upload: "images",
      label: "Page content",
      value: "Write **markdown** code here",
      description: `<a target="_blank" href="https://www.markdownguide.org">More info about markdown syntax</a>`,
    },
  ],
  documentName: "{title}.md",
});
cms.document({
  name: "Index",
  description: "Edit the content of the homepage",
  store: "src:index.md",
  fields: ["title: text", "content: markdown"],
});

export default cms;
