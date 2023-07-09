# connecting to the server
## frontend
- change your `webpack.config.js` so that it exports a function rather than an object. the function should return the object that you would otherwise export. (take a look at the `webpack.config.js` in this project to see an example)
- note the second argument of the function—typically called `argv`. you'll use it later.
- add a "plugins" key—with a value of an array–to your webpack config object that the exported function returns.
- add a `webpack.DefinePlugin` to the plugins array. (again check out the example in this repo... and for the next few steps too)
- use the `argv` parameter to conditionally set a value of a key in the argument to the `DefinePlugin` constructor. This key will become the environment variable in your frontend code. If the `argv.mode` is `production` set the value to the domain of your backend vercel app. Otherwise, set it to the localhost port you intend to use during development.
  - note: this is not, strictly speaking, an environment variable. its something called variable injection.
  - note: you MUST use `JSON.stringify` on the value that you are setting the value of the injected variable. This is a quirk of the webpack define plugin

## backend
(you also need to change some stuff in the backend (cors stuff))
- `npm i cors`
- add the cors middleware to your server with whatever configuration you need. For the `origin` key specifically set the value to an environment variable called `CORS_ALLOWED_ORIGIN`
- in your `.env` file add a `CORS_ALLOWED_ORIGIN` value set to the localhost port your webpack dev server is using
- in your settings of your vercel server app, add an environment variable, also called `CORS_ALLOWED_ORIGIN`. set its value to your vercel frontend apps domain

What you've just done (on the backend) demonstrates the value of environment variables. In your production environment your server now knows that requests from the production frontend are allowed, while your server running in the local development environment knows that requests from your webpack dev server are okay.

Test wether or not your frontend can successfully send requests and receive responses from your server both locally and in production.