# DESI Library - Work Test

## Instructions

- You are expected to complete this work test by yourself, no help from anyone else is allowed. You are however, allowed to use the internet to search for existing technical advice and documentation.
- You will need to fork this repository and complete all the tasks required for this work test.
- To submit this work test you will have to send us the link for the forked repository that you pushed the commits to.
- This test needs to be completed before 11:59PM on Wednesday the 18th. Any commits submitted after this will NOT be assessed.
- Do not commit unncessary files to your repository.

## Work Test Scenario

As a developer you are required to implement some new features and update existing features based on the tasks below. The scenario for this test is a web app responsible for managing the DESI library.

The front-end is implemented in React 18 and the web API is implemented with ASP.NET Core 8.

## Tasks

- Some pages in the app aren't working, so it needs to be fixed.
- Implement a routing mechanism for the home and borrow pages.
- Add a button on the home page that will redirect users to the list of books.
- Display more information about each book on the books page.
  - Implement the `/book/getbook` API request.
- Implement a new feature on the borrow page to be able to borrow a book and return it.
  - Prevent books from being borrowed until they are returned.
- Show the users which books cannot be borrowed.
- Implement unit tests.
- The project should compile and run after the changes.

This work test code is not necessarily best practice code, if you think it can be improved we encourage you to do so and detail why at the bottom of this README.

### Optional Challenges

- Add authentication.
- Add a database.
- Implement e2e tests.
- Change the architecture to support a better design. Your ideal implementation for this problem.

You are welcome to add additional packages for these challenges as needed. Please detail why you have added a package at the bottom of the README.

## How to Run

### Tooling

- Download and install the [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download).
- Download and install [Node.js 20](https://nodejs.org/en/download).

### Frontend

The frontend was bootstrapped with [Vite](https://vitejs.dev/).

To install the Node dependencies, run `npm install`

To start the dev server, run `npm run dev` and it should be hosted at <http://localhost:5173/>

Unit tests are run with [Vitest](https://vitest.dev/). You can run tests by running `npm run test` and check code coverage with `npm run coverage`

### Backend

To start the backend API, run `dotnet run` in the API folder. It should be hosted at <http://localhost:5000/> 

## Your Comments

> Please leave any of your comments or docs below.

I took the fact that you wanted to display more information about books on the books page as if you didn't want a new page just for a book, I used the /book/getbook to allow the user to get more information about the book to showcase the the endpoint.

#### New packages:
@testing-library/user-event - for easier testing

TODO:
- Backend unit tests
- I would use a library like react-query for a larger project and do optimistic updating
