---
layout: layouts/post.njk
title: Tutorial - Loading Fonts
description: This section is all about fonts and how we can load fonts nice and fast. The way these sessions will carry out is that we will act as if we have a requirement from the client and our role is to solve that requirement on the excercise page. Each page will have a performance issue and over time we will slowly start to see the page getting faster and faster.
backUrl: '/walkthrough'
cta: '/excercises/01'
---

## The Task

The client has a blog site which has a lot of rich content on the page however, customers have been complaining about how long it is taking before they can see the post. Our goal is to investigate what the problem is to see how might we reduce the amount of complaints from our customers.

### Step One - Debugging the network

On our high end machines we won't notice the performance implications so we need to setup our dev environment as if we are working on the slowest machine ever. We can then really feel the pain of our customers with lower end devices / low latency.

- 01 Open up developer tools and head over to the Network panel.
- 02 In the Network panel we want to select the following options:
  - Disable cache - selected
  - No throttling to be slow 3G

Once these settings are set, click the record button and hard refresh the page.

### Step Two - What am I even looking at?

So what we should see in the Network is a tab known as "Waterfall". This will display a load of network requests and the order they loaded in. When we are looking for issues in the waterfall tab a general rule of thumb is to see if the waterfall is going downwards and across far to the right. If the requests are not going straight down then we may have a critical chain request lying around.

> A critical chain request is a request that has a dependency on another file to load before that file can then be loaded in the page.

On this page we have a critical chain request where we load our font.css in the page, then we import our fonts from google and then our font assets load in the page.

### Step Three - The Solution

If we inspect what google fonts is returning it is just css with paths to the font assets. Google gives us the option to download these fonts and serve them locally. So let's do that instead. There are many benefits to serving your fonts locally and that is:

- You can control the caching of those fonts. If they never change, they can have a very long max age adding to them.
- Same domain - Same domain which means there won't be a DNS lookup and TLS handshake. This can add extra seconds on the initial request to a domain that is not your own.
- More control (we will go into that next)

### Step Four - One critical chain request down, another to go.

We have removed the google fonts api request from the fonts.css and placed the font-face css in that file. However, we still have a critical chain request. The fastest possible way to load our fonts in the page is a concept called critical css. Critical css is when you inline styles into the html document which will load instantly because there are no network requests. HTML files should be small, so only adding the main css that renders the layout of the page is a good starting point.

## Conclusion

The aim of this lesson is to show that native css imports aren’t the best for when it comes to performance as it creates critical chain requests.
