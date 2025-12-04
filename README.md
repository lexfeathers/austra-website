# Austra.fyi

This site is built with [Lume](https://lume.land), is hosted on Github and deployed with [Netlify](https://netlify.app). It uses [Vento](https://vento.js.org) as its templating language.

To add content, clone the repo and add pages in the `pages/` directory. For root level (austra.fyi/example-title), files can be added to `/`. The site can build either Vento or Markdown.

> [!NOTE]
> If placing pages into `/`, make sure to add the following to the start of the file:
> ```
> ---md
> layout: layout.vto
> title: example
> ---
> ```
> The "layout.vto front matter ensures the page loads inside the layout.vto file, which contains the basic HTML setup to display other elements of the site.

## Components 
There are components available in `_components/` that can be used for quick content styling. For example, to create a Horizontal Gallery (grid of clickable images), you can call the component inside a Vento (.vto) file like so:

```vto
{{
	await comp.HorizontalGallery({
		cards: [
			{
				heading: "The first card in the grid",
				blurb: "This is text that appears beneath the card heading",
				card_url: "",
				image_url: "",
				image_alt: ""
			},
			{
				heading: "The second card in the grid",
				blurb: "And so on...",
				card_url: "",
				image_url: "",
				image_alt: ""
			}			
		]
	})
}}
```