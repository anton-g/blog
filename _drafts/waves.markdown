---
layout: post
title:  "waves."
#date:   2016-04-09 12:36:36 +0200
categories: gamedev
---
One of the most prominent features of *unnamed game* is the lava waves and the different beams. When i posted my beams on [reddit](hej) a lot of people asked me how i accomplished them and the fact is that both waves and beams are run by the same script, so in this post i'm going to walk you through making them yourself.

[![beams](https://giant.gfycat.com/FloweryVictoriousBoaconstrictor.gif)](https://gfycat.com/FloweryVictoriousBoaconstrictor)

When initially creating these i had a couple of goals for the implementation:

- **Customizable**: Able to modify speed, wave height, *smoothness*, scale etc on the go.
- **Editor friendly**: I wanted to be able to create them in the unity editor as i laid out my levels.
- **_Okay_ perfomance**: I don't want the game to walk on it's knees just because i **really** like to overuse my beams.
