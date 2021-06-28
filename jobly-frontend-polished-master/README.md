# Jobly React UI 

The frontend application with tweaks to fix bug issues and code improvements.

## Setting up a dev environment

Clone this repo locally and copy the `.env.template` into a `.env` file.

```bash
cp .env.template .env
```

If your backend is not up and running on `localhost:3001` then update the `.env` file with the proper value.

Install the dependencies with `yarn install` or `npm install`.

Once that's handled, run the application with `yarn start` or `npm start`. It's also possible to prepend the proper environment variable to start command like so:

```bash
# for yarn
REACT_APP_BASE_URL=http://localhost:3001 yarn start
# for npm
REACT_APP_BASE_URL=http://localhost:3001 npm start
```

## Bugs and optimizations addressed

+ Code for handling state updates resulting from api requests in `auth` and `applications` context were very repetitve. Abstracted away code into `apiRequest` function that manages dispatching the proper action in each situation.
+ Fixed `fetchUserFromToken` action types to not use the `signUp` action types.
+ Set auth error to null at each new auth request so that the flash of unathenticated errors doesn't appear on initial login.
+ Updated auth context state to only set `hasAttemptedAuthentication` after a failed attempt or at the completion of successful token authentication, so that there is no flash of unauthenticated content before auth state has been resolved.
+ Fixed the user context state to not have the nested `authState?.user?.user` and instead locate user data at `authState?.user`.
+ Used `selector` methods to fetch user from auth context state so that a default empty user object can be provided on logout and no errors will occur.
+ Added `handleOnSubmit` handlers to `useOnKeyPress` hooks so that hitting enter will trigger the search requests.
+ Fixed the problem with passing the correct job fetching onSubmit handler from the `JobList` component to the `JobCardList` component
+ Added a new results found message to both the company list and job list components.
+ Added additional form validation to registration/login form to prevent backend validation errors from being displayed on front end.
+ Refactored Ui context to check for existence of toast with the provided id in state before adding another one
+ Refactored Home page so that stylistic errors are fixed for authenticated user messages. Also used auth selectors here to prevent unauthenticated user from throwing an error on logout.
+ Prepended company logos with proper route to backend `/static/` path for accessing static assets served from node/express backend.
+ Modified the registration system so that the `isAdmin` is not sent from the frontend and is handled on the backend only.

## Extra

+ Some additional optimizations were not handled such as in the job and card list components, all of those cards are rerendered every time the input changes since the `SearchForm` component and the lists of companies/jobs are sibling components that depend on state being received from a parent. There might be a noticable lag when typing into the input that can be fixed with memoization.
+ Context consumers should be memoize to prevent unneccessary rerenders for context state updates.