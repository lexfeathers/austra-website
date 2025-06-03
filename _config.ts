import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";
import favicon from "lume/plugins/favicon.ts";
import date from "lume/plugins/date.ts";

const site = lume();
site.use(favicon({
  input: "/assets/favicon.ico",
}));
site.use(date());
site.use(metas());

export default site;
