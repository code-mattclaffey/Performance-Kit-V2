---
layout: layouts/post.njk
title: Fonts Part Two
description: This section focuses on fonts and efficient methods for loading them. We will simulate a scenario where we receive a client request and our task is to address that requirement on the exercise page. Each page will initially have performance issues, but as we progress through the exercises, the page will gradually become faster.
conclusion: The goal of the lesson is to be able to debug the browser using a low end device, recognise when fonts are loading slow and how to implement the fix for it. The next session we will be looking at different web formats to use and how variable fonts work.
backUrl: '/tutorials'
cta: '/exercises/01'
postId: 'font-part-two'
---

## The Task

The client has a blog site which has a lot of rich content on the page however, customers have been complaining about how long it is taking before they can see the post. Our goal is to investigate what the problem is to see how might we reduce the amount of complaints from our customers.

### Setup

> ADD VIDEO HERE

On our high end machines we won't notice the performance implications so we need to setup our dev environment as if we are accessing the website using a lower spec device. On the exercise page, we need to do the following in our devtools:

- Open up developer tools and head over to the Network panel.
- In the Network panel we want to select the following options:
  - Disable cache - selected
  - No throttling to be slow 3G
  - Record button checked
  - Capture screenshots

Once these settings are set, click the record button and hard refresh the page.

### Font rendering

> ADD VIDEO HERE

The client is really happy so far however, they have mentioned that sometimes they can see no fonts then the fonts **flash** on the page. Based on your font face settings in the css, your browser will determine how to **paint** the page. Let's go into what each display pattern means.

#### FOIT - flash of invisible text

FOIT (Flash of Invisible Text) occurs when the text on a website becomes invisible until the web fonts have loaded, and then they appear on the page. The text is ready to be rendered, but the browser doesn't know which font to use until it has loaded. Once the font is loaded, the browser "repaints" the screen and displays the new font, creating a visible "blink" effect. To avoid this, one technique is to use FOUT (Flash of Unstyled Text), where there is some form of content displayed on the page before the font loads, allowing users to quickly understand the message of the website without having to wait for the font to load.

#### FOUT - flash of unstyled text

FOUT (Flash of Unstyled Text) is a technique where the user is presented with the fallback font before the main web font has loaded. This approach eliminates the "blink" effect caused by FOIT (Flash of Invisible Text) and allows the user to have a sense of the text content and overall design before the web font is fully loaded. It can be visualized by following the provided link that contains flashing images.

#### What do I use?

It depends case by case which to use but the most common one to use is FOUT. To implement this pattern in the past was really hard because you have to load the font in via an ajax request and then apply a css class on the html element which then applied the font-family property. Thanks to CSS updating over time, we can now use a css property called font-display.

`font-display` is a CSS property that controls how a web font is displayed (or "rendered") while the web page is loading. It allows developers to specify how the text should be displayed while the web font is loading, and what should happen once the font is loaded. The possible values are:

- auto : the browser will use its default strategy to display the font.
- block : the text will be invisible until the font has loaded, then it will be displayed.
- swap : the browser will display the fallback font immediately and swap it with the web font once it has loaded.
- fallback : the browser will display the fallback font until the web font has loaded, then it will be displayed.
- optional : the browser will use the web font if it's available, otherwise it will use the fallback font.

Using font-display can improve the user experience by making text visible faster and reducing the amount of FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text) that occurs when web fonts are loading.

To apply it to our `font-face`, we just need to add the following to each one:

```css
@font-face {
  font-family: 'Rubik';
  src: url('/assets/fonts/woff2/Rubik/Rubik-Medium.woff2');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

> If you want to only wait a maximum of 3 seconds for a font to load then use **font-display: fallback;**. More [info](https://web.dev/font-best-practices/#choose-an-appropriate-font-display-strategy) here.

### Subset fonts

### Variable fonts

### WebPageTest results

> Get the filmstrip comparing production exercise page against our feature branch page

### Resources

- [WebPageTest](https://www.webpagetest.org/)
- [Medium Post](https://medium.com/@mattclaffey/loading-fonts-the-fout-way-92beed75dc38)
- [Web.dev - Best practices for fonts](https://web.dev/font-best-practices/)
