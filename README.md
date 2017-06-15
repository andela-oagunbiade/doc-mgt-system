# doc-mgt-system

[![Build Status](https://travis-ci.org/andela-oagunbiade/doc-mgt-system.svg?branch=master)](https://travis-ci.org/andela-oagunbiade/doc-mgt-system)
[![Code Climate](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system/badges/gpa.svg)](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system)
[![Test Coverage](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system/badges/coverage.svg)](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system/coverage)
[![Issue Count](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system/badges/issue_count.svg)](https://codeclimate.com/github/andela-oagunbiade/doc-mgt-system)

The Document management system provides REST API enpoints for a document management system. It allows create, retrieve, update and delete actions to be carried out.
It also ensures that users are authorized.

## Development Tools

The front end web application is built with React & Redux while the Application Programming Interface (API) was developed using [NodeJs](https://nodejs.org) with express for routing. Postgres DB is used for persisting data with [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

## Installation

- Ensure that you have NodeJs and Postgres installed on your machine
- Clone the repository `$ git clone https://github.com/andela-oagunbiade/doc-mgt-system.git`
- Change into the directory `$ cd /doc-mgt-system`
- Install all required dependencies with `$ npm install`
- Create a `.env` file in your root directory as described in `.env.sample` file

## Testing

- Ensure you have correctly set the TEST_DATABASE_URL in your .env file.
- Run DB migrate commmand with `npm run test:db:migrate`.
- Run Test `npm test`

## Development

- Ensure you have correctly set the DEV_DATABASE_URL in your .env file.
- Run DB migrate commmand with `npm run db:migrate`.
- Run DB seed commmand with `npm run db:seed` to seed required Admin and Regular roles into your DB.
- Run Test `npm start`

## Usage

- Run DB migrate commmand with `npm run db:migrate`.
- Run DB seeder command with `npm run db:seed` to seed required Admin and Regular roles into your DB.
- Start the app with `$ npm start`
- Use [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47242a54bdfc7d55498f) to consume available endpoints

**Users**:
A created user will have a role, either an admin or a regular.

- A Regular User can:
    - Create an account
    - Login
    - Create a document
    - Limit access to a document by specifying an access group `i.e. public, private or role`.
    - View public documents created by other users.
    - View documents created by his access group with access level set as `role`.
    - Edit his profile.
    - Search a users public documents.
    - View `public` and `role` access level documents of other regular users.
    - Logout.
    - Delete his profile.

- In addition to the general user functions, an admin user can:
    - View all users.
    - View all created documents except documents with access set to private.
    - Delete any user.
    - Update any user's record.
    - Create a new role.
    - View all created roles.
    - Search for any user.

**Documents**:
Documents can be created and must have:

- Title
- Content
- Access; set by default to public but can be any of `private, public or role`

**Roles**:
Roles can also be created, the default roles are `admin` and `regular`

**Authentication**:
Users are authenticated and validated using JSON web token (JWT).
By generating a token on registration and login, API endpoints and documents are protected from unauthorised access.
Requests to protected routes are validated using the generated token.

## Endpoints

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47242a54bdfc7d55498f)

### Users

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/users](#create-users) | Create a new user
GET | [/api/v1/users](#get-users) | Get all users
GET | [/api/v1/users/:id](#get-a-user) | Get details of a specific user
PUT | [/api/v1/users/:id](#update-user) | Edit user details
DELETE | [/api/v1/users/:id](#delete-user) | Remove a user from storage
GET | [/api/v1/users/login](#login) | To log a user in
GET | [/api/v1/users/logout](#logout) | To log a user out

### Roles

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/role](#create-role) | Create a new role
GET | [/api/v1/role](#get-roles) | Get all created roles
GET | [/api/v1/role/:id](#get-a-role) | Get a specific role
PUT | [/api/v1/role/:id](#edit-a-role) | Edit a specific role
DELETE | [/api/v1/role/:id](#delete-a-role) | Delete a specific role

### Documents

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/document](#create-document) | Create a new document
GET | [/api/v1/document](#get-documents) | Retrieve all documents
GET | [/api/v1/document/?id=id](#get-a-document) | Retrieve a specific document
GET | [/api/v1/users/:id/document](#get-documents-by-user) | Retrieve all documents created by a user
GET | [/api/v1/document?order=desc&limit=10](#get-documents) | Retrieve maximum of first 10 documents ordered by date of creation
PUT | [/api/v1/document/:id](#update-document) | Update a specific document
DELETE | [/api/v1/documents/?id=id](#delete-document) | Remove a specific document from storage
