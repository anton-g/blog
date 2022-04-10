---
title: A functional javascript sandwich
date: '2018-09-17T21:05:00.000Z'
description: 'Learn functional javascript by making a yummy sandwich with map and reduce!'
state: 'bloomed'
---

A while ago I held a lightning talk about functional programming in javascript, and demonstrated it by using the array functions `map`, `filter` and `reduce` to create a _tasty sandwich_. This post is the written version of that talk, but with a little more background about functional programming. But what is functional programming more exactly? My first hit on Google for _"what is functional programming"_ is [this post](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) by Eric Elliot. In it he says this:

> **Functional programming** (often abbreviated FP) is the process of building software by composing **pure functions**, avoiding **shared state**, **mutable** data and **side-effects**.

Let's take some time to explain these terms before we start making our sandwich.

### Pure functions

A pure function is a function that given the same input always returns the same output, and has no side effects.
A very basic example of a pure function:

```javascript
const add = (x, y) => x + y
```

This function has two parameters that are added together with the plus operator. No matter how many times we call this function with the same arguments, it will always return the same output.

An unpure function could look like this:

```javascript
const z = 5
const add = (x, y) => x + y + z
```

This function depends on state that is shared between scopes, which means that if we change the variable `z` but not the arguments we pass to the function the output will change and hence the function is unpure.

### Side effects

Side effects are when a function interacts with something outside it's scope. This could be anything from printing something to the console to modifying a variable outside the function.

Some examples of side effects are:

- Modifying any external variable
- console.log()
- Making a HTTP request
- Updating the DOM
- Calling any other function with side effects

This also makes it obvious that not every function can be pure, and **that is fine**. The benefit of writing pure functions is that they are very easily testable and makes it safer to refactor code since you know that this function won't have any unintended side effects.

### Mutable data

A mutable variable is a variable which value can be changed after it's been created. Mutable variables can make it hard to reason about our code since we can't be sure what the variables value is when we use it. On the other hand, an **immutable** variable is a variable that can't be changed after creating it.

In my opinion the biggest benefit of striving for immutability is that it increases the predictability of our code since [mutation hides change](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd). This means we can reason about our code easier, debug it faster and keep the mental overhead small.

It's important to remember that, in javascript, variables declared with `const` are **not immutable**. It only prevents you from reassigning and redeclaring the variable. This would work:

```javascript
const person = {
  name: 'Anton',
}
person.name = 'Alfredo'
```

To prevent this from working we could use [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) to freeze the object which will prevent setting the value of name (and throw an error if running in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)).

### Shared state

Shared state is variables or other state that is shared between between different scopes. For example a functions local scope and the global scope. In functional programming we try to avoid shared state and instead rely on our immutable data structures and the possibility to obtain new data from the existing data.

We've already seen an example of shared state in the unpure function example above. Let's revisit it:

```javascript
const z = 5
const add = (x, y) => x + y + z
```

In this example `z` is shared by the global scope and the local scope of the function `add`. If we change the value of `z` it will affect both the global scope and the value inside of `add`s scope.

There is a lot more nitty gritty details to each of these terms and you could easily stumble down a rabbit hole of mathematical definitions, but if you want to read more the [previously mentioned article](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) is an excellent starting point.

## Making a sandwich

Phew! With that out of the way, let's make a sandwich! To get started we need some ingredients, and in the name of this tutorial it will only be the toppings, and only toppings that we can slice.

```javascript
const ingredients = ['cucumber', 'tomato', 'sallad']
```

The first step in making our sandwich is to slice our ingredients, which in other words mean we _transform_ the ingredients to sliced ingredients. To transform the elements of our ingredients-array we will use a function called `map`.

`map` takes one single argument which is a callback function that will be called on every element of the array. The return value of the callback function will be the new value of the element if the new array. We start by creating a function `slice` that takes a single ingredient and transforms it to a sliced ingredient. We then pass this function as the callback to `map`:

```javascript
const ingredients = ['cucumber', 'tomato', 'sallad']

const slice = (ingredient) => {
  return `sliced ${ingredient}`
}

const result = ingredients.map(slice)

console.log(result)
// output: ['sliced cucumber', 'sliced tomato', 'sliced sallad']
```

In this case we only use the arrays element in the callback function passed to `map`, but the function also has two optional parameters. The first one is the current index of the element and the second is the array. Remember that since `map` is a pure function it doesn't mutate the initial array but instead creates a new one, so the array parameter will never change when you run map.

### Assembling the sandwich

Let's continue by assembling the sandwich with `reduce`.  
It is arguably the most powerful of the sandwich making functions. It can be used to accomplish anything from [summing some values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Examples#Sum_all_the_values_of_an_array) to [running promises in sequence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Examples#Running_Promises_in_Sequence).

The function has two parameters: A _callback_ function (called _reducer_) and an _initial value_. When calling `reduce` it will enumerate (_"loop"_) through the elements in the array and apply the callback function to each of the elements, finally resulting in a single return value. Let's walk through the _callback_ function arguments:

- **accumulator**: The first parameter is named _accumulator_ because it _"accumulates the callback's return values"_. This never made much sense to me as a non native english speaker until I started to think about it as the **total** or **sum** of the `reduce` call. This will contain the return value from when the previous element was processed by our callback function (or _initialValue_, see below).
- **currentValue**: This is the current element that is being processed by our callback.
- **currentIndex** (optional): The current elements index in the source array.
- **array** (optional): The source array. _(Remember that since_ `reduce` _is a pure function it doesn't change the source array, so this will not change in any way during the execution of reduce)._

The second parameter of the _callback_ function is the _initialValue_. The _accumulator_ is initiated with whatever value we pass to this parameter.

Alright, now that we know about `reduce` we can assemble our sandwich and since `map` returns an array we can _chain_ the call to `reduce`, making our code more compact and legible:

```javascript{7-9,13}
const ingredients = ['cucumber', 'tomato', 'sallad']

const slice = ingredient => {
  return `sliced ${ingredient}`
}

const reducer = (total, current) => {
  return `${total}, ${current}`
}

const result = ingredients.map(slice).reduce(reducer, 'A tasty sandwich with')

console.log(result)
// output: 'A tasty sandwich with, sliced cucumber, sliced tomato, sliced sallad
```

Above we call the `reduce` function with out callback function `reducer` which returns the `total` (the _accumulator_) concatenated with the `current` value. This will give us a string representing our sandwich containing the _intialValue_ (_"A tasty sandwich with"_) and each of our sliced ingredients. The output looks a little malformated and we could fix this by utilizing the _index_ and _array_ parameters of the callback function to remove unneccesary commas etc, but for the case of simplicity let's leave it like this for now.

### I'm allergic to tomatoes :(

But what if we are allergic to tomatoes? Let's remove it with `filter`.

`filter` takes a single argument that is a callback function (just like `map`), and the callback function has three parameters (the element, the index and the array). The return value of the callback must be a bool indicating whether or not the current element should be included in the new array. In our case this means that we check if the current ingredient isn't tomato and in this case we return true.

```javascript{12-14}
const ingredients = ['cucumber', 'tomato', 'sallad']

const slice = (ingredient) => {
  return `sliced ${ingredient}`
}

const reducer = (total, current) => {
  return `${total}, ${current}`
}

const result = ingredients
                    .filter(ingredient => {
                      return ingredient !== 'tomato')
                    }
                    .map(slice)
                    .reduce(reducer, 'A tasty sandwich with')

console.log(result)
// output: 'A tasty sandwich with, sliced cucumber, sliced sallad
```

In this case I also chose to inline the callback function in the `filter` call but this is mostly a matter of preference.

And **that's it**! We've made a _"sandwich"_ with functional javascript!

### 🎉

This is a really contrived example that doesn't really demonstrate the power of these functions, but hopefully it gave you some insight into the world of functional javascript. Just remember that you don't have to care about **pure functions**, **immutability** or any other confusing term to start benefiting from `map`, `reduce` and `filter`.

You just have to use them.
