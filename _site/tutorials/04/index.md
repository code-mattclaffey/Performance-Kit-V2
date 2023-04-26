---
layout: layouts/post.njk
title: Image Part Two
description: Todays task is going to be about putting the theory we learnt in the previous session into something more practical by implementing those best practices to common design patterns on the web. Our exercise page is a festival page which has around five components on there that each have a unique problem that needs to be solved.
backUrl: '/tutorials'
cta: '/exercises/04'
postId: 'images-part-two'
googleForm: 'https://forms.gle/nWCN4J2wU9pBF3nU7'
conclusion: To conclude this section we have covered multiple different ways to optimise different image patterns on a web page and I hope this has been really useful. Now we have had a taste of trying out different combinations for different patterns we should now have a more tactical view on what to do in each section which should help you in the future. See you in the next session.
---

## The Task

Todays task is going to be about putting the theory we learnt in the previous session into something more practical by implementing those best practices to common design patterns on the web. Our exercise page is a festival page which has around five components on there that each have a unique problem that needs to be solved. Again, we are going to be using the unsplash api to make our changes to this web page.

### Hero

A hero component can be a very challenging component to implement web performance changes because you want to find that right balance between a really nice image that people first see but also, you want to load that image really fast as that is the entry view.

#### Responsive images

First thing we want to do is make the image load different image sizes at different breakpoints so that we can load a larger image in when the screen is larger. We probably want to do this for three different breakpoints which is mobile, small tablet, tablet and desktop. In `_hero.njk` we need to change the image tag to use a picture element:

```html
<picture class="absolute top-0 left-0 right-0 bottom-0 z-10">
  <source srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1600&h=900&fit=crop" media="(min-width: 767px)" />
  <source srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1024&h=640&fit=crop" media="(min-width: 767px)" />
  <source srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=767&h=640&fit=crop" media="(min-width: 480px)" />
  <img
    src="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=480&h=800&fit=crop"
    alt="DJ playing at a festival"
    class="w-full object-cover h-full"
  />
</picture>
```

<!-- TODO: screen shot of the image weight -->

#### Image formats

Now we have smaller images loading in, we can now take it to the next step and start loading in different image formats.

```html
<picture class="absolute top-0 left-0 right-0 bottom-0 z-10">
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1600&h=900&fit=crop&fm=avif"
    type="image/avif"
    media="(min-width: 1024px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1600&h=900&fit=crop&fm=webp"
    type="image/webp"
    media="(min-width: 1024px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1600&h=900&fit=crop&fm=jpg"
    type="image/jpg"
    media="(min-width: 1024px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1024&h=640&fit=crop&fm=avif"
    type="image/avif"
    media="(min-width: 767px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1024&h=640&fit=crop&fm=webp"
    type="image/webp"
    media="(min-width: 767px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=1024&h=640&fit=crop&fm=jpg"
    type="image/jpg"
    media="(min-width: 767px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=767&h=640&fit=crop&fm=avif"
    type="image/avif"
    media="(min-width: 480px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=767&h=640&fit=crop&fm=webp"
    type="image/webp"
    media="(min-width: 480px)"
  />
  <source
    srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=767&h=640&fit=crop&fm=jpg"
    type="image/jpg"
    media="(min-width: 480px)"
  />
  <source srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=480&h=800&fit=crop&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=480&h=800&fit=crop&fm=webp" type="image/webp" />
  <img
    src="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=70&w=480&h=800&fit=crop"
    alt="DJ playing at a festival"
    class="w-full object-cover h-full"
  />
</picture>
```

<!-- TODO: screen shot of the image weight -->

#### Perceived loading

If we know the image might take a while to load we can use a background colour or an image behind the image to make the text more visible to the user. This is another way to make the perceived loading of the image a bit smoother.

```html
<picture
  class="absolute top-0 left-0 right-0 bottom-0 z-10"
  style="background: url('https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?blur=1550&q=70&fm=jpg&w=12&fit=clip')"
>
  ...
</picture>
```

<!-- TODO: screen shot of the background without the image -->

#### Lazy-loading

Now, lazy-loading is a good way to making images load faster however, when an image is in the top of the viewport we want that image to load as fast as possible, not delayed. So we can skip this step for now.

#### Fetch priority

Previous section we stated that lazy-loading a hero image can actually make the load of the image slower. So I guess the next thing we can do is look into another way to speed the load up. [fetchPriority](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority) is a way to tell the browser that we want to treat this image as a high priority image to load in the network. This will be loaded in the same priority as javascript and css files.

<!-- TODO: screen shot of the network order before and after -->

### Image and text block

Image and text block is another common pattern you see in most web pages where it is pretty much a static image that stacks above the text on mobile and then appears on either side on desktop. The work we are going to be doing will be in the `_block.njk` file.

#### Responsive images

Not much is needed to be done in this space because the image is roughly the same size in every breakpoint. What we can do here is just set a standard width, height and quality to both images.

```html
<picture class="lg:w-1/2 flex-1">
  <img
    src="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70"
    alt="image of people having a good time at a festival"
    class="block w-full"
  />
</picture>
```

<!-- Screen shot -->

#### Image formats

Now we have smaller images loading in, we can now take it to the next step and start loading in different image formats.

```html
<picture class="lg:w-1/2 flex-1">
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=webp" type="image/webp" />
  <img
    src="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70"
    alt="image of people having a good time at a festival"
    class="block w-full"
  />
</picture>
```

<!-- Screen shot -->

#### Lazy-loading

This is a prime example to where we can apply lazy-loading because it is further down the page and we can just simply add `loading="lazy"` to the img element.

```html
<picture class="lg:w-1/2 flex-1">
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=webp" type="image/webp" />
  <img
    src="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70"
    alt="image of people having a good time at a festival"
    class="block w-full"
    loading="lazy"
  />
</picture>
```

<!-- Screen shot -->

#### Perceived loading

If we know the image might take a while to load we can use a background colour or an image behind the image to make the text more visible to the user. This is another way to make the perceived loading of the image a bit smoother.

```html
<picture
  class="lg:w-1/2 flex-1"
  style="background: url('https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?blur=1550&q=70&fm=jpg&w=12&fit=clip')"
>
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=webp" type="image/webp" />
  <img
    src="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70"
    alt="image of people having a good time at a festival"
    class="block w-full"
    loading="lazy"
  />
</picture>
```

<!-- Screen shot -->

#### Layout shifting

One common thing that we should do one every image is define an aspect ratio so that the page does not jump around when it is loading in the images. Add the `block-image-aspect-ratio` to each of the image/picture elements in the block njk file and then in `04.css` we want to create that selector.

```html
<picture
  class="lg:w-1/2 flex-1 block-image-aspect-ratio"
  style="background: url('https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?blur=1550&q=70&fm=jpg&w=12&fit=clip')"
>
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70&fm=webp" type="image/webp" />
  <img
    src="https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=450&h=300&q=70"
    alt="image of people having a good time at a festival"
    class="block w-full block-image-aspect-ratio"
    loading="lazy"
  />
</picture>
```

```css
.block-image-aspect-ratio {
  aspect-ratio: 450 / 300;
}
```

<!-- Screen shot -->
<!-- Screen shot of browser support -->

### Carousel

Carousels are very similar to image and text blocks however, what problem this component has is that it has images that are hidden off screen that still load in the page.

#### Lazy-loading

So in the past, this would have been really difficult to prevent images from loading in the page based on their horizontal scroll position. Some JS libraries have solved this but a quick win for us can simply be just adding loading="lazy".

Apply this attribute to each slide:

```html
<picture id="slide-one">
  <img src="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439" alt="Festival one" class="block" loading="lazy" />
</picture>
```

#### Responsive images

The next thing we want to do now is make these images responsive so on mobile, when a user is swiping through the images the images feel almost instant when loading in.

```html
<picture id="slide-one">
  <source srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70" media="(min-width: 480px)" />
  <img src="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=300&h=200&q=70" alt="Festival one" class="block" loading="lazy" />
</picture>
```

#### Image formats

To make this even faster, let's now look into optimising the image format.

```html
<picture id="slide-one">
  <source
    srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70&fm=avif"
    media="(min-width: 480px)"
    type="image/avif"
  />
  <source
    srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70&fm=webp"
    media="(min-width: 480px)"
    type="image/webp"
  />
  <source srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70&fm=jpg" media="(min-width: 480px)" type="image/jpg" />
  <source srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70&fm=avif" type="image/avif" />
  <source srcset="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=450&h=300&q=70&fm=webp" type="image/webp" />
  <img src="https://images.unsplash.com/photo-1612443016610-00c5fa0ec439?w=300&h=200&q=70" alt="Festival one" class="block" loading="lazy" />
</picture>
```

### YouTube videos

Youtube videos can be an expensive download for a user especially when they never interacted with it. So this area is about how we can mitigate that download for them but also speed up our page load while doing so.

#### YouTube Image Pattern

If you have free reign on changing the markup of a YouTube component then I recommend a pattern where you add the YouTube thumbnail and mimic the youtube play button infront of it. What this will do is download an image version of the iframe and then on click of the button we can load the iframe in and set it to autoplay.

##### Setting up the markup

So instead of just planting the iframe right in the page, what we can do is setup our markup for the thumbnail and button and remove the iframe.

```html
<div class="relative w-full" data-youtube-component>
  <img
    src="https://i.ytimg.com/vi/q7SCZb4zacU/maxresdefault.jpg"
    class="block w-full object-cover h-full"
    alt="Image of Wh0 playing a DJ set from YouTube."
  />
  <button
    type="button"
    aria-label="Play Youtube Video"
    class="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center"
    data-youtube-button="q7SCZb4zacU"
  >
    <svg viewBox="0 0 48 48" width="90px" height="90px">
      <linearGradient id="PgB_UHa29h0TpFV_moJI9a" x1="9.816" x2="41.246" y1="9.871" y2="41.301" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#f44f5a" />
        <stop offset=".443" stop-color="#ee3d4a" />
        <stop offset="1" stop-color="#e52030" />
      </linearGradient>
      <path
        fill="url(#PgB_UHa29h0TpFV_moJI9a)"
        d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40	c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56	c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267	C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"
      />
      <path
        d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376	v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624	c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z"
        opacity=".05"
      />
      <path
        d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334	c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z"
        opacity=".07"
      />
      <path
        fill="#fff"
        d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549	l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"
      />
    </svg>
  </button>
</div>
```

##### Writing up the JavaScript

We now just need to setup the JavaScript for this YouTube component to work properly.

`/assets/js/global/youtube.js`

```javascript
(function () {
  'use strict';

  const youtubeElements = [...document.querySelectorAll('[data-youtube-component]')];

  const init = (element) => {
    const button = element.querySelector('[data-youtube-button]');
    const image = element.querySelector('[data-youtube-image]');

    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '480';
      iframe.src = `https://www.youtube.com/embed/${button.getAttribute('data-youtube-button')}`;
      iframe.title = 'YouTube video player';
      iframe.frameborder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;';
      iframe.allowfullscreen = 'true';
      iframe.classList.add('youtube-image');

      element.appendChild(iframe);
      element.removeChild(image);
    });
  };

  youtubeElements.forEach(init);
})();
```

and then we need to add this script in so in our `_scripts.njk` file we just add:

```html
<script src="{{ '/assets/js/global/youtube.js' | url }}" defer type="text/javascript"></script>
```

Let's see what we have got.

#### Layout shifting

Same as the image blocks, we want to define an aspect ratio so that the page does not jump around when it is loading in the youtube image. Add the `youtube-image` to the data-youtube-image element in the block njk file and then in `04.css` we want to create that selector.

```css
.youtube-image {
  aspect-ratio: 712 / 534;
}
```

#### Lazy-loading

Simple one for this, what we can do here is add the loading=lazy to the youtube thumbnail image.

```html
<img
  src="https://i.ytimg.com/vi/q7SCZb4zacU/maxresdefault.jpg"
  class="block w-full object-cover h-full"
  alt="Image of Wh0 playing a DJ set from YouTube."
  loading="loading"
/>
```

#### Perceived loading

The youtube thumbnail doesn't have a blurred version of itself so we can just set a generic background colour for this image.

```html
<div class="lg:w-1/2 flex-1 bg-slate-300" data-youtube-component>...</div>
```

#### If you have less control over the iframe...

You can also lazy load iframes like you do with images.

```html
<iframe
  width="100%"
  height="480"
  src="https://www.youtube.com/embed/q7SCZb4zacU"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  loading="lazy"
>
</iframe>
```

#### Resources

- [Medium Post](https://medium.com/@mattclaffey/lazy-loading-images-2020-87c96c224442)
- [Aspect Ratio CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
