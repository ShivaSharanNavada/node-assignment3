# node-assignment3

**#app1.js**

This code is a Node.js server that connects to a MongoDB database and exposes a RESTful API to interact with the database. Here is a breakdown of what the code does:

1. Import necessary modules and packages: 
   a. The `MongoClient` module from the `mongodb` package is used to connect to the MongoDB database. 
   b. The `express` package is used to create an Express.js application. 
   c. The `body-parser` package is used to parse incoming request bodies. 
   d. The `path` module is used to resolve file paths. 
   e. The `ObjectId` module from the `mongodb` package is used to create ObjectIds for MongoDB documents.

2. Create an instance of the Express.js application.

3. Define the MongoDB connection URI to connect to the database, using the `MongoClient` module.

4. Define the name of the MongoDB database and collection to be used.

5. Connect to the MongoDB database using the `MongoClient` module.

6. Define routes for the API:

   a. A GET route that takes a name parameter and returns all documents in the `friends` collection with that name.

   b. A GET route that returns all documents in the `friends` collection.

   c. A POST route that inserts a new document into the `friends` collection.

   d. A PUT route that updates an existing document in the `friends` collection.

   e. A DELETE route that deletes a document from the `friends` collection.

7. Serve a basic HTML file when the root URL is accessed.

8. Start the server and listen on port 8000.

9. Export the `app` object to be used in other files.

Note that Bootstrap is also being used to serve the CSS and JS files for the HTML page.

Overall, this code demonstrates how to connect to a MongoDB database and define routes for a RESTful API using Express.js.


**#test.js**

This code is a test suite for API endpoints using the `supertest` library to simulate HTTP requests. The API is built with Express and uses MongoDB as the database.

The code begins by importing necessary modules including `MongoClient` and `ObjectId` from the `mongodb` package, `expect` from the `chai` package, and `request` from `supertest`. It also imports the `app1.js` file, which contains the API endpoints.

The `MONGODB_URI` variable contains the connection string to the MongoDB database.

The `describe` function is used to group related test cases. The `before` hook is run before all the tests in the suite and establishes a connection to the MongoDB database. The `after` hook is run after all tests are complete and closes the database connection.

The first test case is for the GET `/users` API endpoint. It sends a request to the endpoint and checks that the response has a status code of 200 and that the response body is an array.

The second test case is for the POST `/users` API endpoint. It sends a request to the endpoint with a new user object and checks that the response has a status code of 200.

The third test case is for the PUT `/users` API endpoint. It inserts a new user into the database, sends a request to the endpoint to update the user, and checks that the response has a status code of 200 and that the response body has a `status` property set to `true`.

The fourth test case is for the DELETE `/users` API endpoint. It inserts a new user into the database, sends a request to the endpoint to delete the user, and checks that the response has a status code of 200 and that the response body has a `status` property set to `true`. It also checks that the user was successfully deleted from the database.

Overall, this code tests the basic functionality of the API endpoints for creating, reading, updating, and deleting users in a MongoDB database.
