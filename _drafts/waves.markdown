---
layout: post
title:  "waves."
#date:   2016-04-09 12:36:36 +0200
categories: gamedev
---
One of the most prominent features of *unnamed game* is the lava waves and the different beams. When i posted my beams on [reddit](https://www.reddit.com/r/Unity2D/comments/47eevb/beams_for_my_wip_platformer/) a lot of people asked me how i accomplished them and the fact is that both waves and beams are run by the same script, so in this post i'm going to walk you through making this yourself.<!--more-->

[![beams](https://giant.gfycat.com/FloweryVictoriousBoaconstrictor.gif)](https://gfycat.com/FloweryVictoriousBoaconstrictor)

When initially creating these i had a couple of goals for the implementation:

- **Customizable**: Able to modify speed, wave height, *smoothness*, scale etc on the go.
- **Editor friendly**: I wanted to be able to create them in the unity editor as i laid out my levels.
- **_Okay_ perfomance**: I don't want the game to walk on it's knees just because i **really** like to overuse my beams.

### theory.
*Let's begin with the boring part; the theory behind the magic.*

The script works by modifying the vertices of a mesh, and later animating them by using a sine curve. Breaking this down we get that we need to:

- How do make sure the vertices are where we want them?
- How do we modify the vertices?
- How do we animate the vertices?

great post: http://catlikecoding.com/unity/tutorials/procedural-grid/
