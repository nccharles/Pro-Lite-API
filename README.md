[![Build Status](https://travis-ci.org/nccharles/Pro-Lite-API.svg?branch=develop)](https://travis-ci.org/nccharles/Pro-Lite-API)
[![Maintainability](https://api.codeclimate.com/v1/badges/5daa11aac53bf04a7ffa/maintainability)](https://codeclimate.com/github/nccharles/Pro-Lite-API/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/nccharles/Pro-Lite-API/badge.png?branch=develop)](https://coveralls.io/github/nccharles/Pro-Lite-API?branch=develop)
# PropertyPro-lite
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

#### Technologies
This Project was created with:
- HTML - A markup language
- Cascading Stylesheet(CSS)
- JavaScript - Development Language
- NodeJS - A javascript server-side engine
- Express Library - A library built on Node JS
- Cloudinary - A file storage platform
- Pivotal Tracker - A project management platform
- Travis CI - A continuous integration and testing platform
- Coveralls - A continuous integration and testing platform
- Code Climate - A continuous integration and testing platform

#### Tools and Modules
The tools and modules employed in this project are:
- Git
- yarn
- A test suite e.g Mocha and Chai
- JSON Web Token
- express-fileupload
- swaggerUI
- bcryptjs
- JOI validation module

#### Development Setup
To start this project, install the required modules and dependencies locally using yarn:
##### Usage Example
##### git Clone this [Repository](https://github.com/nccharles/Pro-Lite-API.git)
```
yarn
yarn run db:create
yarn run db:migrate
yarn run start-dev
```

#### API URL
- https://pro-lite-api.herokuapp.com/

#### API Documentation
-  https://pro-lite-api.herokuapp.com/api-docs

#### User Access
Signing into the property-pro-lite platform will require a login details as:
- email: charles@example.com
- password: Passmein!

#### How to get a local copy and Use
**Clone repository**
- copy the link to the project from github website
- create a folder on local machine
- cd in to the folder and call a git init
- git clone repository
- yarn to install development dependencies


#### Endpoints
|Verb    | Endpoint                                                         | Description            |
|--------|------------------------------------------------------------------|------------------------|
|GET     |https://pro-lite-api.herokuapp.com/                               | Welcome Endpoint       |
|GET     |https://pro-lite-api.herokuapp.com/api-docs                       | API Documentation page |
|POST    |https://pro-lite-api.herokuapp.com/api/v3/property                | add property           |
| GET    |https://pro-lite-api.herokuapp.com/api/v3/property                | Get all properties     |
| DELETE |https://pro-lite-api.herokuapp.com/api/v3/property/2              |  Deletes a property    |
| GET    |https://pro-lite-api.herokuapp.com/api/v3/property?type=2-bedroom |Get Specific Properties |
| GET    |https://pro-lite-api.herokuapp.com/api/v3/property/2              | Get one Property       |
| PATCH  | https://pro-lite-api.herokuapp.com/api/v3/property/2             | Update property        |
| PATCH  | https://pro-lite-api.herokuapp.com/api/v3/property/2/Sold        |Mark as sold            |
| POST   | https://pro-lite-api.herokuapp.com/api/v3/auth/signup            | Endpoint of Signup.    |
| POST   | https://pro-lite-api.herokuapp.com/api/v3/auth/signin            | Endpoint of Sign in    |


#### Running Tests
Tests are run by calling 
```
yarn
yarn run test:db:migrate
yarn run test
```
 after installing and setting up testing suites:
- Mocha
- Chai
- Chai HTTP
##### Usage Example
```
  Testing welcome endpoints
    ✓ should accept status 200
    ✓ should insert user data to the memory (122ms)
    ✓ should allow user to login if exist
```
#### Contributor(s)
- Charles NDAYISABA

#### Author(s)
- Charles NDAYISABA
