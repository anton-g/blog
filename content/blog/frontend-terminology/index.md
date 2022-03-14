---
title: Front-end terminology
date: '2020-09-25T17:33:00.000Z'
updated: '2020-09-25T17:33:00.000Z'
description: 'List of front-end terminology to improve your developer vocabulary.'
dev: ''
state: 'budding'
---

A very unsorted and incomplete list of terminology, phrases and products you might run into when working with front-end development. Don't use this as a list of things to study, but rather as list to skim through from time to time to try and pick up something. Again, you _don't_ have to know all of this.

- **DevTools**  
  Short for developer tools. Usually refers to the developer tools of browsers like [Firefox](https://developer.mozilla.org/sv-SE/docs/Tools) or [Chrome](https://developers.google.com/web/tools/chrome-devtools), but could also refer to devtool extensions for frameworks ([React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Vue](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)).
- **URL** _(Uniform Resource Locator)_
  Same thing as a web address, for example "_https://antongunnarsson.com_".
- **Copy**  
  The text on a web page. Originally from [copywriting](https://en.wikipedia.org/wiki/Copywriting) but now often used as a generic word for all texts.
- **White space**  
  The empty space between elements on a page, although not necessarily white.
- **Accessibility** _(a11y)_  
  Best practices for keeping a website accessible for people with any kind of disability. The acronym comes from the fact that there is 11 letters between _a_ and _y_ in accessibility.
- **Internationalization** _(i18n)_  
  Best practices for enabling a site to be adapted to any culture (language etc). The acronym comes from the fact that there is 18 letters between _i_ and _n_ in internationalization.
- **Localization** _(l10n)_  
  The act of adapting a site to a specific culture. For example translating texts, formatting numbers etc. The acronym comes from the fact that there is 10 letters between _l_ and _n_ in localization.
- **Client side**  
  Code run on the _client_, for example in a users browser.
- **Server side**  
  Code run on a _server_.
- **Environment variable**  
  Variables set on the enviroment in which the "app" is deployed.
- **CSS**  
  Language for controlling how web pages are _displayed_.
- **CSS preprocessor**  
  A way to write CSS but with more features, for example nesting, by utilizing a different syntax. Needs a build step to be transformed into CSS. Examples: [Sass](https://sass-lang.com/), [Less](http://lesscss.org/).
- **CSS-in-JS**  
  A category of tools that allow you to write CSS inside of your JavaScript. Benefits include easier ways to applying styling based on state and reducing scoping issues. Examples: [styled-components](https://styled-components.com/), [emotion](https://emotion.sh/).
- **CSS modules**  
  A way to write CSS where it's scoped locally by default. Solves similar issues as CSS-in-JS. [Read more](https://github.com/css-modules/css-modules).
- **HTML**  
  HyperText Markup Language. The standard way to specify a websites _structure_.
- **HTML Tag**  
  A tag specifies the start and end of an HTML element. For example `<tagstart>content</tagend>`.
- **Meta tag**  
  Meta tags are special HTML tags that are used to convey metadata information that is used by things like search engines, website embeds and other.
- **Wrapping**  
  The act of adding _something_ around _something_. For example, "You need to wrap the content variable in curly brackets" would mean to go from `content` to `{content}`.
- **Nesting**
- Semantics (eg semantic HTML)
- **User Agent**  
  A string indicating what web browser that is used.
- **JavaScript**  
  A programming language. Originally only used for building interactive websites but nowadays used in a myriad of different contexts, for example on desktops with [NodeJS](). Gets a lot of hate for being "bad" but is actually pretty great.
- **TypeScript**  
  A programming language that builds on top of [JavaScript]() by adding static type definitions which provide a way to tell the computer what _type_ of value a variable should be. Arguably makes the code more verbose but less prone to bugs.
- **CMS**  
  Content Management System. A system that helps users manage the content of a website, for example [Wordpress](https://wordpress.com/) or [Contentful](https://www.contentful.com/).
- **SEO**  
  Search Engine Optimization. Practices for optimizing a websites ranking in search engines such as Google. Mostly guess-work since Google et al won't describe how they work.
- **CRUD**  
  Short for **C**reate, **R**ead, **U**pdate, **D**elete. Used to describe the basic operations of persistent storage. Sometimes also refers to simple websites where all you can do is these actions.
- **DOM**  
  Short for Document Object Model. Interface that represents a document tree, for example an HTML document. Enables updating the document with a language such as [JavaScript]().
- **Virtual DOM**  
  An abstraction of the DOM that aims to solve performance issues of large amounts of DOM updates by keeping track of what elements (etc) is changed _outside of the DOM_. Popularized by [React]().
- **Shadow DOM**  
  Browser technology that tries to solve issues with scoping variables and CSS in the context of [Web Components]().
- **UI**  
  User Interface. All the things you see on a web page.
- **UX** _(User Experience)_  
  How users interact with a web site but also how the web site affects user. For example the color `red` might indicate a dangerous action while the color `green` could indicate something positive.
- **CTA** _(Call To Action)_  
  Part of a user interface that encourages the user to take some action, usually a button in a primary color.
- CI/CD _(Continuous Integration / Continuous Delivery)_
- **Version Control**  
  The act of saving multiple versions of things you work on. For example copying your school projects and naming then "project.docx", "project-v2.docx", "project-v2-final.docx". In programming you usually use a tool such as [Git](/#) to handle this for you.
- **Git**  
  The most popular version control system, despite it being very easy to screw up with it. My greatest tip: [Oh Shit, Git?!](https://ohshitgit.com).
- **GitHub.com**  
  The most popular platform for hosting [Git](/#) repositories and the de-facto standard for open source. Other popular platforms is [GitLab](https://gitlab.com/) and [Bitbucket](https://bitbucket.org/).
- Branch (version control)
- Repository (version control)
- Pull request
- **Merge request**  
  See [pull requeast]()
- **"Above the fold"**  
  Content shown on the screen when intially loading a webpage. The fold referencing the bottom of the screen. _The term originates from newspapers where content on the top half of a folded newspaper was used to grab peoples attention_.
- **"Hard coded"**  
  Values typed directly into the code, and hence not dynamic.
- Backend
- **Frontend**  
  What the user interacts with. In the context of web sites it's 99% of the time [HTML](/#), [CSS](/#) and [JavaScript](/#).
- **Full stack**  
  A very \_ term used to describe working with both the [Frontend](/#) and [Backend](/#).
- **404**  
  Error code for page not found
- **500**
  Error code for "internal server error", ie when something went wrong on the [server]().
- **Bug**  
  An error, a flaw, a fault. Something that doesn't work. The worlds first computer bug is reported to have been an [actual bug](https://www.nationalgeographic.org/thisday/sep9/worlds-first-computer-bug/).
- **Debugging**  
  Removing bugs from a program. Usually time is mostly spent investigating what the bug actually is, rather than writing code to fix it. Or as _someone_ once said: "Debugging is like being the detective in a crime story where you are also the murderer."
- **Cache**  
  Short term storage of data. Often used to store data that is heavy to calculate and doesn't need to be recalculated every time it's fetched.
- Cookies
- API
- REST
- GraphQL
- DevOps
- Responsive design
- **Sitemap**  
  A document used by search engine bots to find all the pages on your site.
- robots.txt
- **Wireframe**  
  A very rough design, usually just outlines and aproximated position of elements. Similar to mockup.
- Framework
- Library
- **React**  
  One of the largest and most popular JavaScript frameworks. Created by Facebook. Introduced the idea of declarative components to the masses. Uses [JSX](/#).
- JSX
- Vue
  - SFC
- Angular
- Svelte
- Web components
- State management
- Minification
- MVP
- IDE
- WebStorm
- Text editor
- **VS Code**  
  One of the most popular text editors used for code. Created by Microsoft.
- Atom
- Sublime
- Agile / Scrum
- The Cloud
- Azure
- AWS
- Google Cloud Platform
- CLI
- NodeJS
- StackOverflow
- EcmaScript _(ES5/ES6/ES7..)_
- Package manager
  - NPM
  - Yarn
- Package registry
- Webpack
- Linting
  - Prettier
  - ESLint
- Static site generators (SSG)
- Media query
- Recursion  
  See [recursion]()
- Native apps
