import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";
import favicon from "lume/plugins/favicon.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  location: new URL("https://austra-site.netlify.app")
});
site.data("name", "Austra");
site.use(favicon({
  input: "/assets/favicon.ico",
}));
site.use(date());
site.use(metas());

site.add("./assets");
site.add("./styles.css");

export default site;
