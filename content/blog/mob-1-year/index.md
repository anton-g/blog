---
title: Mob programming for a year
date: '2020-03-02T21:30:00.000Z'
# dev: ''
---

Last week marked the day when I've been mob programming full time for a whole year. In case you don't know what mob programming is, _Woody Zuill_, who is credited for discovering the method describes it like this:

> "All the brilliant people working on the same thing, at the same time, in the same place, and on the same computer."

In short, it means that you sit together with 2 or more developers and work together on one computer, in a similar fashion to pair programming but with more people. This might sound counterproductive but in reality, it's a very effective way of working. If you want to learn more about the why and the how of mob programming I recommend watching Woody's [talk from GOTO conf 2017](https://www.youtube.com/watch?v=SHOVVnRB4h0).

I've really enjoyed discovering mob programming this past year so I wanted to write down some of my key takeaways.

## Processes

When you work as closely with your team as you do when you mob program, it turns out that lots of processes are unnecessary.

- No pull requests or code reviews since that is done _"live"_ during the day.
- We very rarely work in feature branches since the mobs most often don't work in the same part of the application at the same time.
- The daily sync meeting is mostly for the benefit of product owners who wants to know how we're doing since everyone in the team is on the same page already.

When mob programming, all of these feel more like bloat and obstacles in the way of delivering value. I dread the day I'll have to go back to attending unnecessary meetings just because someone needs to _"talk something through"_.

## My best code

I'm quite certain that I've written my best code ever this past year and I attribute a lot of that to the fact that my code has been constantly code-reviewed, that I've learned so so much from my colleagues and that we (almost) never get stuck.

Most of my time nowadays isn't even spent at the keyboard, but rather in a chair to the side discussing the problem we're trying to solve. In the same way as [learning by teaching](https://en.wikipedia.org/wiki/Learning_by_teaching) is a great way to learn, constantly discussing the code I write is a great way for me to improve.

And while it might be rewarding to be stuck on a problem and struggle with it for some time before finally solving it, not getting stuck in the first place beats it. There is always someone in the mob who has an idea of how to solve the issue and since everyone is in the loop already, you don't have to explain the context when discussing it.

Hopefully, I've also helped my colleagues write the best possible code and taught them something along the way.

## Interpersonal issues

Working this close to other people all day every day isn't just hunky-dory though. It also means that interpersonal issues rise to the surface quicker than they might otherwise do. While I do see this as a net win, it also requires that everyone dares to be vulnerable, open up and discuss their feelings.

This is something you have to continuously work on if you do mob programming. It is extremely important to build a team where everyone feels safe since so much work is done closely together.

However, regardless of how your way of working looks, your team [will perform better](https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/) if they dare to open up to each other and be vulnerable. There are a lot of resources out there about this but I recommend everyone to read the book [Dare to Lead](https://www.amazon.com/Dare-Lead-Brave-Conversations-Hearts/dp/0399592520) by Brené Brown.

> “Leaders must either invest a reasonable amount of time attending to fears and feelings, or squander an unreasonable amount of time trying to manage ineffective and unproductive behavior.” － Dare to Lead

## Scaling is hard

I joined the project as my current team grew to six developers, and today we've grown to a total of nine. In my opinion, this has been one of our biggest challenges and is something we still struggle with.

When we were six people we usually split into one or two mobs depending on if someone was sick or working from home. This worked great. We didn't have to spend time syncing what the others did since we sat so close together and almost always worked on the same thing. Now that we're nine and have added just one more mob station so that we usually split into three groups, some of the benefits of mob programming are suffering.

We immediately get some knowledge silos since some people end up working on certain parts of the application for a longer time than others, and hence learns more about it. There is also more overhead communicating between us. It's surprising how much of a difference just one more mob does to the ability to keep track of what everyone is doing.

If you have any experience scaling a mob programming team I'd love to hear your thoughts.

## In the end

Mob programming might not fit everyone but I do think that it is an excellent tool to use as a developer. I've had an extremely fun, rewarding and developing year. Let's hope the next one is just as good :)
