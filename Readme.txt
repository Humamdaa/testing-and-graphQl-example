##Project Overview
This project uses GraphQL along with Express and Apollo Server 
to handle server-side operations.
The main functionality includes querying user data and managing user creation.
The project structure is split into several modules to handle specific responsibilities like resolvers, 
controllers, and the main application.

__________________________________________________________________________________

###1. mainResolvers.ts
This file combines the resolvers for Query and Mutation operations into a central resolver object.

Imports:

helloResolver and UserResolvers are imported from their respective files.
Resolvers:

Query: Combines queries from helloResolver and UserResolvers.
hello: Fetches a message from the getMessage() controller in helloResolver.ts.
getUserById: Fetches a user by their ID from the getUserById() controller in userController.ts.
Mutation: Combines mutations from UserResolvers.
createUser: Handles the creation of a new user by calling the createUser() controller in userController.ts.
Export: The resolvers object is exported and later used in the Apollo Server initialization.

__________________________________________________________________________________

###2. userResolver.ts
This file defines the resolvers for the User related queries and mutations.

Query:

getUserById: Queries the database to fetch a user by their unique ID using the getUserById() function from the userController.ts.
Mutation:

createUser: Handles the creation of a new user with the provided username, email, and password. It uses the createUser() function from userController.ts.
Error Handling: Both query and mutation include error handling that throws detailed error messages in case something goes wrong.

Export: The UserResolvers object is exported to be used in mainResolvers.ts.

__________________________________________________________________________________

###3. helloResolver.ts
This file defines a simple query to fetch a greeting message.

Query:

hello: This query calls the getMessage() function from the messageController.ts and returns a greeting message.
Export: The helloResolver object is exported to be used in mainResolvers.ts

__________________________________________________________________________________

###4. userSchema.ts
This file contains the GraphQL schema definitions for the project, specifying the types, queries, and mutations available in the API.

User Type:

Represents a user object with three fields: id, username, and email, all of which are required.
Query Type:

hello: A simple query that returns a greeting message as a string.
getUserById: A query that takes an id argument (type ID!) and returns a User object.
Mutation Type:

createUser: A mutation that takes username, email, and password as arguments and returns the newly created User object.
The gql tag is used to define the schema in a template literal syntax, which is later parsed by Apollo Server to understand the structure of the API.

Export: The typeDefs object is exported for use in the Apollo Server initialization.

__________________________________________________________________________________

### note:
Avoid using special characters (like &, !, #, etc.) in directory names. For example, a directory named: Rest&Test
Error You May Encounter:'Test\node_modules\.bin\' is not recognized as an internal or external command,
operable program or batch file.
node:internal/modules/cjs/loader:1051
  throw err;
  ^ Cannot find module 'E:\codeMERN\ts-node\dist\bin.js 