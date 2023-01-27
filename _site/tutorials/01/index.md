---
layout: layouts/post.njk
title: Fonts Part One
description: This section focuses on fonts and efficient methods for loading them. We will simulate a scenario where we receive a client request and our task is to address that requirement on the exercise page. Each page will initially have performance issues, but as we progress through the exercises, the page will gradually become faster.
conclusion: The goal of the lesson is to be able to debug the browser using a low end device, recognise when fonts are loading slow and how to implement the fix for it. The next session we will be looking at different web formats to use and how variable fonts work.
backUrl: '/tutorials'
cta: '/exercises/01'
postId: 'font-part-one'
googleForm: 'https://forms.gle/M6swEdrQ5biULTkB6'
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

### Debugging the network

> ADD VIDEO HERE

So what we should see in the Network is a tab known as "Waterfall". This will display a load of network requests and the order they loaded in.

> When looking for issues in the waterfall tab a general rule of thumb is to see if the waterfall is going downwards and across far to the right. If the requests are not going straight down then we may have a critical chain request lying around.

On this page we have a critical chain request where we load our font.css in the page, then we import our fonts from google and then our font assets load in the page.

![An image diagram of the devtool network and highlights of the performance problems](/assets/img/exercises/01/01-waterfall-step-2.webp)

> A critical chain request is a request that has a dependency on another file to load before that file can then be loaded in the page.

### Decoupling CSS dependencies

> ADD VIDEO HERE

The first thing we want to do is to remove the critical chain request in our css file. Google fonts have a different way to load our css fonts into the page. To do this let's remove the import statement in the css file and add this snippet of code into our `<head />` element.

```css
/* Remove this line from: _site/assets/css/01-removing-critical-chain-requests */
@import url('https://fonts.googleapis.com/css2?family=Monoton&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900');
```

```html
<!-- Directory to make this change: _site/_includes/exercises/01/index.njk -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Monoton&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900" rel="stylesheet" />
```

Let's breakdown what we are doing here:

- The links that have the rel "preconnect" are telling the google servers that we will be making a request at some point so let's warm up the connection earlier so we can get those fonts a little quicker.
- The link with the rel of stylesheet is just doing the same thing as it was in the css file.

Now when we inspect our network again, we should see that nothing has changed to the page but the fonts in the waterfall are loading similar to the screenshot below.

![An image diagram of the devtool network and highlights of the performance improvement after we make the change](/assets/img/exercises/01/01-waterfall-step-3.webp)

### Using self-hosted fonts

> ADD VIDEO HERE

```css
/* Add this line to: _site/assets/css/01-removing-critical-chain-requests */
@import "./_shared/_shared.fonts.css";
```

So let's do that instead. There are many benefits to serving your fonts locally and that is:

- You can control the caching of those fonts. If they never change, they can have a very long max age adding to them.
- Same domain - Same domain which means there won't be a DNS lookup and TLS handshake. This can add extra seconds on the initial request to a domain that is not your own.
- More control (we will go into that next)

![An image diagram of the devtool network and highlights of the performance improvement after we make the change](/assets/img/exercises/01/01-waterfall-step-4.webp)

### Resource hints

> ADD VIDEO HERE

Browsers can determine the priority of an asset which determines when the asset is loaded in the waterfall. We can use html resource hints to give an indicator to the browser to which fonts we need for this page to be completed.

```html
<link rel="preload" href="/assets/fonts/woff2/Rubik/Rubik-Regular.woff2" as="font" type="font/woff2" crossorigin="" />
```

What you will start to see now is the Rubik Regular font request is loaded as a "High" priority now and it loads before the CSS file. The benefit to this is when you know every page is going to load that font in so it's ideal to preload it. The other fonts will conditionally load based on the css rendered on that page.

![An image diagram of the devtool network and highlights of the performance improvement after we make the change](/assets/img/exercises/01/01-waterfall-step-5.webp)

> **Note:** You can only really do this if you know the path to your fonts. It can get more complex when you start to introduce filename caching or served from a third party CDN. You can read more about why [here](https://web.dev/font-best-practices/#be-cautious-when-using-preload-to-load-fonts).

### Inline font declarations

If you read the above you may have noticed it mention that preloading isn't the best approach for loading your fonts the fastest way because the page might not even be using that font yet we are telling the browser to load it in anyway.

Another optimal solution is to add the font declarations inline in the `<head />` element instead of having them live in the stylesheet. This allows the browser to discover the font declarations sooner as the browser doesn't need to wait for the external stylesheet to download.

In our use case we need to do the following in the exercise file:

```html
<head>
  <style>
    @font-face {
      font-family: 'Rubik';
      src: url('/assets/fonts/woff2/Rubik/Rubik-Regular.woff2') format('woff2'),
          url('/assets/fonts/woff/Rubik/Rubik-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      font-family: 'Rubik';
      font-weight: normal;
    }
  </style>
</head>
```

In the screenshot, I have an example of an inline font "medium" vs a local **inline** font.

![An image diagram of the devtool network and highlights of the performance improvement after we make the change](/assets/img/exercises/01/01-waterfall-step-6.webp)

> **Note:** make sure you inline this above any render blocking asset as it will slow down the load of these fonts.

### Resources

- [Medium Post](https://medium.com/@mattclaffey/loading-fonts-the-fout-way-92beed75dc38)
- [Web.dev - Best practices for fonts](https://web.dev/font-best-practices/)
