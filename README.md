# node-assignment3

#app1.js#

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
