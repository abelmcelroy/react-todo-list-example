# Bundling & React #

You've learned about the DOM and interacted with it a bit. One thing you may have noticed is that it can be tough to stay organized. Between writing all your code in one file, and keeping track of the various DOM elements you want to manipulate, it's easy to get scattered. Hopefully you didn't struggle too much, but you can imagine how these would be big issues for a larger application.

From a very high level [Webpack](https://webpack.js.org/) and [React](https://reactjs.org/) are designed to solve these problems, respectively. In actuality they are both quite powerful tools that do a lot more than that, but you won't need to dig deep into them just yet, so for now just think of them as potential solutions to these problems.

You can always go read more about them from their websites and the nearly inexhaustable collection online of tutorials for either of them, but rather than sending you off on an open-ended scavengar hunt for knowledge, here is a slightly more specific description of what they each do.

## Webpack ##

Webpack is what is called a **bundler**. There are other bundlers but at the moment webpack is the most popular.

There is a way to write your javascript so that one file can ask another file for its contents. This is done using the `import` and `export` keywords. Note that this is only how you do it in the browser; later when we do the analog of this on a server there will be a slightly different syntax. For now let's see an example of import/export:
```
// FILE #1 - file1.js

export function add(num1, num2) {
  return num1 + num2;
}
```
```
// FILE #2 - file2.js

import file1 from './file1.js';

const sum = file1.add(2,2);
```

When we import a file into another file the imported file is treated like an object—sometimes called a **module**. In this example we want the `add` function from the imported file, and we access it on the last line of the example using dot notation, like we would for any other method on any other object.

You can export as many functions or variables from a file using `export`, then import them in as many other files as you'd like using `import`. Thinking of your files as objects, you can conceptualize using import/export as constructing a tree out of your modules. This tree is sometimes referred to as a **dependancy tree**.

So where is Webpack in this picture? Well, Webpack is what bundles your modules together. It does this by traversing your dependancy tree and building a single all-encompassing script that includes all the code from all of your modules, connected in just the way you specified with import/export. Technically you could manage this on your own, but bundlers help, A LOT! So rather than learning to do it on your own—which will be easy for you later and harder for you now—let's focus on using Webpack.

Take a look at the `webpack.config.js` file in this directory. Ignoring some of the notation in that file, notice there are two important keys in the exported object starting on line 2: `entry` and `output`. Webpack needs to know what the root of your dependancy tree is, and that's the "entry" point. Webpack also needs to know where to dump your bundled code, that's the "output."

Let's test it!
- Make sure you have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager) installed. Verify if you have it by opening up a shell and running the command `npm --version`. If you get a version number you're good to go, otherwise use the link and follow the instructions.
- Once you know you have NPM, navigate to this very directory in your shell and run the command `npm install`. This shouldn't take longer than a few seconds. What's happening is that all of this project's external dependancies (namely Webpack and React) are being downloaded.
- If it worked, you'll now have a new file in this project's directory called `package-lock.json` as well as a new directory called `node_modules`. The first is just a more specific list of all your packages than the one you'll find in `package.json` and the second is a collection of all the external dependancies you just installed. Ignore them both for now, but know that they were created by running `npm install`.
- Now run `npm run build`. This is a custom command designated for this project that prompts Webpack to create a bundle using the configuration settings you saw in `webpack.config.js` earlier.
- If it worked you should have a new file in your `dist` directory called `main.js`. Take a look at this file to get a sense of what Webpack's output looks like. Don't worry about taking it all in.

You bundled using Webpack! Unless you changed something in `src/index.js`, you've bundled an empty module, but that's all there is to bundling. If you want to see what happens when the module isn't empty, try adding some code to `src/index.js` -> run `npm run build` again -> then check to see what changed in the new version of `dist/main.js`.

There is a little bit more configuration you'll need to do to get Webpack to bundle your React code, but you'll cross that bridge when you get to it. For now let's move on.

## React ##

Time to take care of the issue of keeping all your variables for your various DOM element organized. Organization is actually only part of the issue. Recall that each element needs to be appended to the DOM if you want it rendered. What if you want an element un-rendered? What if you want a whole set of elements rendered (or un-rendered) conditionally, like in a modal or dialog box?

To achieve this desired behavior you'd probably want to write a function that appends your collection of elements to the DOM. Then imagine you want to reuse that modal. Now that function you wrote needs to be generalized so that you can attach the collection of elements to any part of the DOM. Then imagine you have some dynamic text or styles you want applied to that modal. Now you'll need some event listeners and methods that enable the modal's elements to update as certain variables are reassigned. And that's only the beginning!

It would be a huge headache to implement all this yourself, let alone having to do all this anew for each of your projects. This is why React exists, and more generally why **front end frameworks** exist. React is the most popular framework, and familiarity with it will help you acclimate to other frameworks down the line.

Unlike webpack, React requires a greater degree of familiarity to use it. The beauty of webpack is you get to set it and forget it, with only occasional exceptions. But when you're building a web application with React you will be writing thousands of lines of code that take advantage of React's tool kit. You'll need to understand it. So here is some context.

### React's abridged history ###

- Back in 2010 Facebook was having issuing maintaining its rapidly expanding codebase. In particular, their front end code was difficult to maintain. This sparked the genesis of React.

- In 2013 React went opensource and began getting traction.

- By 2016 React was mainstream, adopted by major companies like AirBnB.

- In 2019 React's largest paradigm shift was released, called React **hooks**.

- Today (2022) React hooks are basically ubiquitous and can replace almost all legacy features of React 1-to-1.

### Thinking in React ###

You're jumping in after over a decade of React's evolution. You don't need to understand React as it was in 2013, but understanding a few key facts about what React was before hooks were introduced will help you. The primary aspects of React haven't changed, and this brief foundation will help you eventually get started using modern React.

#### Original React ####

- React originally leaned heavily on [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and class inheritance. This is not a widely favored design paradigm in Javascript, which contributed to the software engineering community's unanimously positive reaction to the introduction of hooks.
- React also used to rely on something called [lifecycles](https://reactjs.org/docs/state-and-lifecycle.html). Lifecycles were a system for managing state throughout the rendering and re-rendering cycle.

#### Enduring React ####

- React code is organized into **components**. Each component used to be its own class, now most of them are simply functions.
- React components all receive a **props** object as input. The props object will differ from component to component (it can be literally anything you want it to be), but all component's receive props.
- in order for a component to be recognized by React as a component (and to function correctly) you must always include `import React from 'react';` in the module's imports, and your component names must begin with a capital letter.
- React components can have **state**, which like props is completely customizable.
- React components re-render when one of the following occurs:
  - its state is updated
  - its props change
  - it's forcibly re-rendered
- Styling components can be done in numerous ways, but a common method is actually using vanilla CSS. Many people have tried to supplant CSS with libraries that build ontop of React, though each one of these libraries does have drawbacks.
- React manages something called the **virtual DOM** ([VDOM](https://reactjs.org/docs/faq-internals.html)). You won't be able to inspect it directly—not without a lot of digging at least—but you wont need to. Just know that React's performance is based on how it manages the VDOM with a process called reconciliation to ensure that the DOM properly reflects changes made to the VDOM.

#### Hooks ####

- With hooks, components (functions) must return **JSX**. JSX is a hybrid format between Javascript and HTML. Note: your React component files will use the `.jsx` file extention rather than `.js`.
- Custom hook functions and state can be programmed to update based on specific state or props, thus re-rendering the component.

## Putting this into practice ##

Enough exposition. To start dabbling in React you need to create a root for the VDOM and connect it to the DOM so that React can perform reconsoliation correctly. Here's some set-and-forget code you should paste into `src/index.js`:
```
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```
It's standard practice to reserve your `index.js` solely for this code and to write your components in other files. Another, important standard practice is not to write more than one component per file.

Now notice that in line 4 of your `src/index.js` you're importing a module that doesn't exist yet. Create a new file matching the name of the module being imported in `src/index.js` (don't forget the .jsx file extention), then add this code:
```
import React from "react";

export default function App(props) {
  return (
    <div>
      Hello World!
    </div>
  );
}

```
Note: When you import a module that contains the `default` keyword, the default behavior of importing the entire module is substituted by importing only the specific `export` that is designated `default`. The `default` keyword can be used only once per file.

In order to see your code changes, re-run `npm run build` and open `dist/index.html` with your browser.

### A brief digression about Webpack ###

Now it's time to cross that metaphorical 'bridge' that was mentioned earlier about needing to configure Webpack to bundle React.

You'll notice Webpack is now failing, with an error that mentions something about "loaders." As previously mentioned, Webpack is powerful. There are many ways to bundle a project. Different projects require different configuration.

Right now you've just added JSX code to a previously vanilla Javascript app. In order for Webpack to bundle JSX correctly the `webpack.config.js` file will need to include the following configuration:
```
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
    },
  ],
},
```
This should be added to the exisiing `module.exports` object. The `modules` settings determine how your project's modules are treated. In this case you're specifying that they are allowed to end with `.js` or `.jsx` file extentions, and that you want to use a specific **loader** (a special resource that enables webpack to read new file formats or syntax).

Here you are using a very common loader called **Babel**. Babel didn't come out of thin air, you actually also downloaded it when you ran `npm install` earlier. This aptly named loader is what allows webpack to read JSX, and in order for it to work you need a `.babelrc` file—which is why that file exists in this project. Don't worry about its contents, just know that Babel, and the `.babelrc` file are necessary for webpack to handle JSX correctly, which a prerequisite for React.

NOTE: If you decide to add CSS files to your project you'll need [this loader](https://webpack.js.org/loaders/css-loader/) as well. I recommend doing this as you near the end of the exercise. Use the link for instructions, and when you're asked to `install` the loader, use the `npm` command, not `yarn` or `pnpm`. Also, you'll need to figure out how to adjust your `webpack.config.js` file to accomidate the module rules they specify. Specifically you'll need to append the settings they give you to the ones you already have, it won't too complicated but it also won't be a simple copy-paste job.

## Back to writing your own components ##

### JSX ###

In order to delve deeper into React you need to learn the basic rules about JSX.

Rule #1, in the return statement of the component you copied into `src/App.jsx` notice that there are parentheses surrounding some JSX which looks a lot like HTML. You can think of JSX as a format for flipping from JS-land to HTML-land and vice versa.

In order to hop from JS-land to HTML-land you use parentheses. Inside those perentheses you can write HTML freely. The only restriction is that you must have one root-level HTML element surrounding anything inside those parentheses.

In order to hop from HTML-land to JS-land you use curly braces. Inside those curly braces the JS you write must evaluate to a single data structure.

Here are some examples of valid and invalid JSX:
```
...
return (
  <div>
    Hello World!
  </div>
);
// Valid

...
return (
  <div>Hello<div>
  <div>World!</div>
);
// Invalid - This returns two sibling divs

...
return (
  <div>
    <div>Hello<div>
    <div>World!</div>
  </div>
);
// Valid! - This returns two sibling divs CONTAINED in a single parent div

...
const firstWord = "Hello";
const secondWord = "World!";

return (
  <div>
    <div>{firstWord}<div>
    <div>{secondWord}</div>
  </div>
);
// Valid

...
const firstWord = "Hello";
const secondWord = "World!";

return (
  <div>
    <div>{
      firstWord;
      secondWord;
    }<div>
  </div>
);
// Invalid - the JS contained in the curly braces has two full lines of code, and does not evaluate to a single value.

...
const words = ["Hello", "World!"];

return (
  <div>
    {
      words.map(word => (
        <div>
          {word}
        </div>
      )
    )}
  </div>
);
// Valid - take a look at this one carefully:
```
- In the first div we hop from HTML to JS, then map over the words array.
- When we use Array.prototype.map the resulting value is an array, that is a single data structure, even though it contains a collection of other data structures, so this still works.
- As we map over the words array we hop back into HTML land to return a div for each word.
- Finally we hop back into JS land to capture the individual words in the divs we're creating

Try adding this array to the `App.jsx` file and doing a similar map to render its contents in a similar way:
```
const products = [
  { name: "teddy bear", price: 9.99 },
  { name: "super soaker", price: 39.99 },
  { name: "silly string", price: 6.00 },
]
```
Try to render the name and price in separate divs.

### Props ###

Instead of hardcoding the products array in the component directly, move the products array into `src/index.js`. Then pass it down into the `App` component as a prop. Check out [this page](https://reactjs.org/docs/components-and-props.html) for info. I'll warn you that much of that page demonstrates using class components, but it's good practice to learn directly from docs. Look for the example code near the string "`For example, this code`".

### State ###

**State** is the final key ingredient you'll need. This will be your first use of a hook.

Taking a step back, state is fundamentally different from a normal variable, in that it can instigate changes in the VDOM. React isn't magic, and it's also not native code, meaning it cannot change the fundamental nature of Javascript. Now think about reassigning a variable like:
```
let x = 0;
x = 1;
```
Imagining that x is state, something special would need to happen in the line `x = 1;` in order for the VDOM to change. React would need to change what's happening under the hood in Javascript and inject some additional instructions. But React can't intercept this reassignment and update the VDOM. So how can changing state instigate re-renders?

Enter the `useState` hook. This is a method available to you from the React import e.x.
```
const [counter, updateCounter] = React.useState(0);
```
`useState` is a function takes a single value (the default value for the state variable you're defining) and returns an array with two values.

NOTE: this notation where the array brackets are to the left of the equal sign is called destructuring, here are [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) for it.

In the above piece of state, `counter` is a number which starts with the value `0`. `updateCounter` is a function. It takes one argument and when it is called it updates `counter` to whatever that argument was, which triggers a re-render of the component.

Now change your `App` component to include a button and a counter. When the button is [clicked](https://reactjs.org/docs/handling-events.html) it should increment the counter. (That link is to the docs for how to add an onclick event handler in React).

Once you have it working add a second button that updates the counter state incorrectly using regular Javascript reassignment. Notice the difference in behavior when the two buttons are clicked.

This difference in behavior is why you *NEVER* update state with reassignment. Always, always, always use the updater the hook returns.

### Cobbling this all together ###

As practice for all this new information, create a to-do list using React. Your app should be able to:
- add a new item to the list
- check an item off, removing it from the list
- assign points to items based on their priority, and maintain higher priority items at the top

In order to do this you may find it is helpful to pass either state, or the state updating functions that you generate using `useState` from one component to another as props (yep that's allowed!)