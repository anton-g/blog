---
title: React renderers
date: '2020-08-22T20:17:00.000Z'
description: 'Live notes on creating a custom renderer in React'
dev: ''
state: 'budding'
---

Live notes on creating a custom renderer in React.

## Creating a renderer

To create a React `renderer` you implement the [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) package:

- <https://twitter.com/vadimdemedes/status/1277620575058505728>
- <https://blog.atulr.com/react-custom-renderer-1/>
- <https://github.com/doodlewind/react-ssd1306/blob/master/docs/tutorial.md>
- <https://github.com/nitin42/Making-a-custom-React-renderer>

## Renderer vs reconciler

Sometimes `renderers` are incorrectly called `reconcilers` but reconciliation and rendering are separate things. The reconciler (which is React internal) determines which part of a tree has changed, while renderers use the reconciled tree to render the app. ([1](https://github.com/acdlite/react-fiber-architecture#reconciliation-versus-rendering), [2](https://twitter.com/dan_abramov/status/1286008969429954560), [3](https://reactjs.org/docs/reconciliation.html))

## A few renderers

- [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom): renders components to the DOM.
- [react-native-renderer](https://github.com/facebook/react/tree/master/packages/react-native-renderer): renders components to native views.
- [ink](https://github.com/vadimdemedes/ink): renders components to the command-line.
- [react-three-fiber](https://github.com/react-spring/react-three-fiber): renders [three.js](https://threejs.org/) in a React environment.

More reading:

- <https://github.com/chentsulin/awesome-react-renderer>
- <https://reactjs.org/docs/codebase-overview.html#renderers>
