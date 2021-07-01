# SITE: Week 4 - Jobly

## Description



This application will be built using the battle-tested PERN stack - **P**ostgreSQL, **E**xpress, **R**eact, and **N**ode.

## Goals

Building this application will ask interns to accomplish the following:
+ Boostrap a PostgreSQL, Node, and Express API with sample data
+ Use JWT tokens to allow users to make authenticated requests to the Express API
+ Store user-authenticated JWT tokens in the browser's local storage for persisted authentication
+ Create custom hooks on a React frontend to access and store values in localStorage and utilize `onKeyPress` handlers
+ Employ the `useContext` hook to store global application state
+ Create login and signup forms to manage user registration and authentication
+ Leverage React Router to construct dynamic routes and pages
+ Build search functionality into the frontend and backend of the application
+ Protect frontend routes from access by unauthenticated users


## User Stories 

This application should be built in stages. Here are the user stories for each stage:

+ Stage Zero: Setup
  + Clone the backend repo provided for jobly
  + Boostrap it by installing dependencies and adding the proper environment variables
  + Run the sql scripts to create the necessary database and tables, as well as seed the database with starter data
  + Explore the backend repo code and examine the created tables with `psql`.
+ Stage One: Design Component Hierarchy
  + Design a set of components (DONT BUILD THEM YET, JUST OUTLINE THE STRUCTURE AND CREATE THE FILES)
  + The component will need to satisfy these requirements:
    + A Navbar component that links to jobs and companies pages, as well as providing buttons for logging in, signing up, and signing out depending on authentication state of the user
    + It should have multiple routes powered by React Router
      + Some of these routes should be protected with a `ProtectedRoute` component
    + The Home Page: 
      + Should display a welcome message to logged in users and a tagline to anonymous users
    + A Login Page
      + It should have a form that allows users to login and redirects authenticated users to the profile page when authenticated
    + A Registration Page
      + It should have a form that allows users to signup and redirects authenticated users to the profile page when authenticated
    + The Profile Page
      + It should display user information and also have a nested route that allows users to update their profile
    + A Company List page:
      + It should have a search form at the top that queries the API with a search request for companies by handle
      + It should display all the companies in the database as some sort of list
      + Each item in the list should be a clickable card that displays information about the company and navigate the user to a Company Detail page when clicked on
    + The Company Detail page:
      + Displays company info as a Hero section at the top
      + Displays a list of jobs the company has open
      + Each job should be a card that displays information about the job and a button allowing the user to apply
    + The Jobs List Page:
      + It should have a search form at the top that queries the API with a search request for jobs
      + It should display a list of job cards that display information about the jobs and a button allowing the user to apply
+ Stage Two: Make an API Helper
  + Make a single `JoblyAPI` class, which will have helper methods for making requests to the Express API.
  + It should include the users JWT token in requests if they're authenticated
+ Stage Three: Create Routing
  + Build components add pages for the following routes:
    + `/` - Homepage — just a simple welcome message
    + `/companies` - List all companies
    + `/companies/apple` - View details of this company
    + `/jobs` - List all jobs
    + `/login` - Login
    + `/signup` - Signup form
    + `/profile` - View profile page
    + `/profile/edit` - Edit profile page
+ Stage Four: Companies & Company Detail
  + Flesh out your components for showing detail on a company, showing the list of all companies, and showing simple info about a company on the list.
  + The list of companies page have a search box, which filters companies to those matching the search (remember: there’s a backend endpoint for this!
  + Do this filtering in the backend — not by loading all companies and filtering in the front end!
+ Stage Five: Jobs
  + Flesh out the page that lists all jobs, and the “job card”, which shows info on a single job.
+ Stage Six: Current User
  + Add features where users can log in, sign up, and log out.
  + When the user logs in or registers, retrieve information about that user and keep track of it.
  + Make forms for logging in and signing up
  + In the Navbar, show links to the login and signup forms if a user is not currently logged in.
  + If someone is logged in, show their username in the Navbar, along with a way to log out.
  + Have the homepage show different messages if the user is logged in or out.
+ Stage Seven: Using localStorage and Protecting Routes
  + If the user refreshes their page or closes the browser window, they’ll lose their token.
  + Find a way to add localStorage to your application so instead of keeping the token in simple state, it can be stored in localStorage. This way, when the page is loaded, it can first look for it there.
  + Make sure that on the front-end, you need to be logged in if you want to access the profile page, companies page, the jobs page, or a company details page.
+ Stage Eight: Profile Page
  + Add a feature where the logged-in user can view and edit their profile. 
  + Make sure that when a user saves changes here, those are reflected elsewhere in the app.
+ Step Nine: Job Applications
  + A user should be able to apply for jobs (there’s already a backend endpoint for this!).
  + On the job info (both on the jobs page, as well as the company detail page), add a button to apply for a job. This should change if this is a job the user has already applied to.
+ Step Ten: Deploy your Application
  + Follow the instructions in the `DEPLOY_PROTOCOLS.md` file to deploy the backend to `Heroku` and the frontend to `Surge`


## Stretch Stories
+ Since there are so many companies and jobs, it’s unwieldy to see them all listed. Add “batched pagination”, so that users see 20 at a time, and can move among those batches (and make sure it works with the search!)
+ If you haven’t already done so, make it so that the links in the navigation bar appear differently when you’re already on that page.
+ It’s a little clumsy that the search boxes require you to hit “Submit” to apply that search. Much nicer is “live search”, where the search is updated without any kind of submit button.
+ Add a feature where, when you click on the “already applied” button for a job, you can unapply. This may require you to add an endpoint to your backend server — a nice chance to reacquaint yourself with Express!
+ It would be nice to see the companies a user has applied to, add a component and route to display this information.
+ Admin users should be able to edit a company.
  + The front end doesn’t give us a way to make admin users, but you can register an ordinary user and promote them to admin status via psql.
  + Then, add a form for editing companies that calls the correct backend route.


## Hints

This is a long assignment and there's a lot to accomplish. That's why the user stories are broken into stages. Take it slow and go step by step.

If you get stuck, don't be afraid to Google things - especially React! The hints and caveats below may also help you through some of the more challenging sections.

+ Hint #1

Use this token to make authenticated requests before you've implemented user login

```js
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"
```

Add a `setToken` method that attaches the token parameter to `this.token`.

Then call it with the token when the app starts up.

When you get a token from the login and register processes, store that token on the JoblyApi class, instead of always using the hardcoded test one. You should also store the token in state high up in your hierarchy - (think `Context`) - this will let use use an effect to watch for changes to that token to kick off a process of loading the information about the new user.

+ Hint #2

Create an effect triggered by authentication state change - this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.

+ Hint #3

You might want to write a generalized `useLocalStorage` hook, rather than spreading the local storage code out throughout the application. This will centralize logic specifically in charge of keeping track of the token.

+ Hint #4

The `ProtectedRoute` component should use a `useEffect` hook to check for auth state and either redirect the user or display a `login` page instead of the protected component.