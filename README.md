[![Build Status](https://travis-ci.org/nccharles/PropertyPro-lite.svg?branch=develop)](https://travis-ci.org/nccharles/PropertyPro-lite)
[![Maintainability](https://api.codeclimate.com/v1/badges/3877d4edcb80503f7479/maintainability)](https://codeclimate.com/github/nccharles/PropertyPro-lite/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/nccharles/PropertyPro-lite/badge.svg?branch=develop)](https://coveralls.io/github/nccharles/PropertyPro-lite?branch=develop)
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
###### Clone a repository
```
yarn
yarn run start-dev
```

#### Template URL
- https://nccharles.github.io/PropertyPro-lite/

#### API URL
- https://propertypro-lite-api.herokuapp.com/

#### API Documentation
-  https://propertypro-lite-api.herokuapp.com/api-docs

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
- GET https://propertypro-lite-api.herokuapp.com/ - Welcome Endpoint
- GET https://propertypro-lite-api.herokuapp.com/api-docs - A visit to the API Documentation page

- POST https://propertypro-lite-api.herokuapp.com/api/v1/property - Endpoint that allows for posting a property

- GET https://propertypro-lite-api.herokuapp.com/api/v1/property - Endpoint returns all posted properties

- DELETE https://propertypro-lite-api.herokuapp.com/api/v1/property/2 - Endpoint deletes a property
- GET https://propertypro-lite-api.herokuapp.com/api/v1/property?type=2-bedroom - Endpoint returns an array of all property adverts of property type 1-bedroom,Minflat etc.

- GET https://propertypro-lite-api.herokuapp.com/api/v1/property/2 - Endpoint returns the property advert with id number 2.

- PATCH https://propertypro-lite-api.herokuapp.com/api/v1/property/2 - Endpoint enables for updating property with id number 2.

- PATCH https://propertypro-lite-api.herokuapp.com/api/v1/property/2/Sold - Endpoint marking of property as sold

- POST https://propertypro-lite-api.herokuapp.com/api/v1/auth/signup - Endpoint creates a new user and returns a signup token.

- POST https://propertypro-lite-api.herokuapp.com/api/v1/auth/signin - Endpoint allows an already registered user to login on providing matching credientials.


#### Running Tests
Tests are run by calling ```yarn test``` after installing and setting up testing suites:
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
