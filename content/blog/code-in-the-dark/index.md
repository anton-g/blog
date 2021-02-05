---
title: Code in the Dark
date: '2020-02-17T21:45:00.000Z'
description: 'Experience from hosting a Code in the Dark event'
state: 'growing'
---

Code in the Dark is a _programming_ competition where participants try to recreate a design with just HTML & CSS, **without previewing it**. Created by Tictail (now Shopify) back in 2013 there have now been similar events all over the world. I got to experience the excitement of just being in the audience at last year's NordicJS which inspired me to host my own Code in the Dark-evening at work. These are some notes to my future self and anyone else who'd like to host a similar event.

## Preparations

Before starting to prepare you need to set a goal for how many people do you want to participate. We ran four heats with four participants in each and a final with the winners from each heat. That was a total of 16 people, which also meant we had to prepare five different reference images that they were to recreate.

Talking of the reference images, I recommend keeping it simple and straight forward. One thing I found worked well was taking some well-known site, finding a component I liked and modding that with the DevTools to my liking. Here's one I made of the GitHub pull request page:

### Editor

When you've found images to use you need to decide if you want people to use their own editor or the [open-source Code in the Dark-editor](https://github.com/codeinthedark/editor). I really recommend the editor since it comes with some nifty stuff like an inline preview of the image, instructions for assets and a ✨*power mode*✨ when you get a combo.

There is more info about setting up the editor in the GitHub repository, but if you plan on running the editors locally on participants' computers and might end up reusing some computer I noticed one thing. The editor stores it state in local storage, and since that is shared between every html page you open from file it will also be shared between heats if you reuse a computer. It's not a big deal but just try to empty the local storage between heats to avoid confusion.

If the participants are expected to use their own computer, make sure you have a good way to transfer the editor to everyone. If you send it by email, do you have everyone's email? If you transfer it from a USB stick, does it work with both Mac and Windows?

### How to win

The recommended way to determine a winner is by audience vote. You could, of course, get a jury or similar but in my (relatively short) experience voting is what works best. It makes sure the audience is engaged and removes some prestige from the competition. We used the service [Mentimeter](https://www.mentimeter.com/) which has a good free tier and support for live voting. One thing we didn't do but that I will do next time is 1) show the reference image while the audience vote and 2) don't show the votes live, but rather reveal the winner when the votes are in.

#### Prize

Talking about winning, you should also decide if you want the winner to receive a prize or just win the honor. Personally, I'm not interested in dealing out cash prizes or similar because for me that would remove the _silliness_ of the competition. On the other hand, I'm really positive about having some sort of prize, so we ended up with a gift basket with _"retro"_ stuff. It had a single-use camera, some old CDs, a vinyl and some other stuff. I think it worked really well, and it was cheap to get everything second-hand :)

### Presentation

To simplify administration during the event I prepared a presentation that included some placeholder text for between the heats, a timer that counted down from 15 minutes and instructions for how to vote when the heat was over. I built the presentation with [mdx-deck](https://github.com/jxnblk/mdx-deck) which is a way to build presentations with Markdown and React. Doing that enabled me to have an interactive presentation that I never had to leave in between the heats.

Here's how some of the slides looked, but like said before I recommend having a slide for the reference image and not showing the voting live.

### Physical setup

To make sure that the audience can appreciate the competition as much as possible you **must** provide some way for the audience to follow allow with what the participants are doing. We ended up with one monitor for each participant where they mirrored their screen like you see on the image above. This made sure that everyone could see everything during the entire heat but also when it was finished and voting was taking place. I've seen some other setups where each heat had more participants and instead of doing monitors for each they opted for larger screens that cycled through all the different players. Regardless of which you choose make sure to proved power and monitor adapters for everyone, as well as _"normal"_ event stuff like food, snacks, drinks (non-alcoholic is always a good idea). We ended up buying about 100 cheeseburgers from the closest fast-food restaurant and that was a success 🎉

### Setting the mood

Code in the Dark is a competition just as much for the audience as for the participants. This makes it extra important to try and create an awesome _mood_ that encourages people to stay and watch. For me that means two major things, great music, and great lighting. I was lucky enough to have some RGB party lights that could react to sound at the office, which combined with some great music choices by my colleague Filip ([Mitch Murder](https://open.spotify.com/artist/7eOzCiTklgHxfpf6Mb3D2e?si=ZrwMCOX5SAqlaoeIJuKUMw), [FM 84](https://open.spotify.com/artist/1xvEo98zythSrgN69GQevk?si=Zv2bKdJ6SmKU5YSKQchd2A), [Kavinsky](https://open.spotify.com/artist/0UF7XLthtbSF2Eur7559oV?si=cD55U4iNTTWWeYh_HoB9rQ), etc) made for an [epic feeling](https://www.youtube.com/watch?v=fQGbXmkSArs). And if you want to take it to the next level, I can't recommend getting your hands on a smoke machine, some fancy light show lasers and some glowsticks enough. For us, it felt like it turned a great event into a fantastic event.

## Checklist

Finally, here's a checklist I used in the preparations in case it helps you in hosting your own Code in the Dark event.

- Create reference images
- Prepare editors with images and assets
- Power adapters
- Monitors
- Adapters for monitors (HDMI to X)
- Prepare a presentation with timer and voting instructions
- Monitor for the presentation (timer, voting etc)
- Prepare voting (ex Mentimeter)
- Food
- Drinks
- Snacks
- Prize
- Music
- Smoke machine
- Lights
- Glowsticks
- Light show lasers

If you've ever hosted a similar event I'd love to hear what you did differently, what worked and what didn't.
And please let me know if you host a similar event in the future, I'd love to see some pictures!

Thanks for reading!
