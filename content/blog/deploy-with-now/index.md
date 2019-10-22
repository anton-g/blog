---
title: Deploying web applications with Now
date: "2018-10-29T21:05:00.000Z"
description: ""
---

Like many others I started learning web development by editing HTML files and then manually uploading them to a web host via FTP. Looking back at this process now it may look too simplistic, too bare-bones or too manual but recently I found myself in a situation where I wanted to host a relatively simple nodejs web application and didn't have the time or need to set up a CI/CD flow. After scouring the internet for candidates I eventually decided to try [Now](https://zeit.co/now).

## Now

> **Update**: Zeit has just released [Now 2.0](https://zeit.co/blog/now-2) and this article was written for Now 1. The deployment process have changed a lot with this release, so the information below is a bit outdated.

Now is a service for deploying static, Docker or NodeJS applications to The Cloud™ without caring about servers or infrastructure. In my opinion however it is the ease of use that makes Now take a step above its competitors. Getting started is as easy as downloading the Now client and logging in. When that is done, navigate to a project directory with a `package.json`, `Dockerfile` or a `index.html` file and run the deployment command in a terminal of your choice:

```shell
now
```

**That's it!** Running the command will upload your site and create a new deployment. By default every new deployment will receive a new URL looking something like this: [https://my-project-name-avvuiuuwto.now.sh](https://my-project-name-avvuiuuwto.now.sh)

At first this might sound a bit weird. Why would you want every new deployment to receive a new URL? This is where another fantastic feature of Now enters the picture. With `now alias` you can point a domain name to any specific deployment you've made before. The biggest benefits is the fact that you can a) test your deployment before releasing it into the _wild_ and b) if you discover something that isn't working you can easily roll back to a previous deployment.

You can either [use your own domain](https://zeit.co/docs/getting-started/assign-a-domain-name#2.-using-a-custom-domain,-managed-by-now) or you can use a `now.sh` subdomain. To do that you just run the following command:

```shell
now alias my-project-name
```

This will set up an alias from [https://my-project-name.now.sh](https://my-project-name.now.sh) to the latest deployment you made. To make this even easier you can set up a `now.json` config file in the root of your project:

```json
{
  "name": "my-project-name",
  "alias": ["my-project.com"]
}
```

With this config running `now alias` without any arguments will automatically alias the `my-project.com` URL to the latest deployment made. This is turn makes it possible to for example set up a npm script that runs `now && now alias` to automatically deploy and alias a new deployment.

And the best thing about Now? Their open source plan is totally free with the only catch being that your source code will be available to everyone if you go to `http://url.com/_src`. There is also a lot of features that I haven't talked about here like [scaling your application](https://zeit.co/docs/getting-started/scaling), [GitHub integration](https://zeit.co/docs/integrations/now-for-github), [a CDN](https://zeit.co/docs/features/cdn) and much more.

## This is not an ad, really

I realize this post sounds and reads like any random ad on the internet, but I pinky promise that it isn't. I'm just really really excited about how easy it's been to use Now. Go and try it for yourself and tell me what you think!
