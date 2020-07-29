# Liferary
A backend for library application system

## DEMO ( https://liferary-backend.herokuapp.com/ )

## Installation
1. Install depedencies
2. Setup ENV

## Stacks
- NodeJS
- ExpressJS
- MySQL

## Dependencies
- [ExpressJs](#ExpressJs) - The server for handling and routing HTTP requests
- [dotenv ](#dotenv) - A zero-dependency module that loads environment variables from a ```.env``` file into ```process.env```
- [Mysql](#Mysql) - NodeJs driver for MySQL
- [body-parser ](#body-parser) - Node.js body parsing middleware
- [JWT](#JWT) - Are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- [Nodemon](#Nodemon) - A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [Multer](#Multer) - A node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
- [CORS](#CORS) - A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Moment](#Moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

## Features
- User management
- Book management
- User review
- JWT token
- Upload image
- Data sorting (search, sort, limit, page)

## Installation
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Setup .env file
4. Create a database with the name liferary, and Import file [liferary.sql](liferary.sql)
5. Run the project with `nodemon` command in your terminal

## End Point
**1. GET**

* `/users` (Get all users)

* `/users/1` (Get user by id)

* `/books/` (Get all books)

* `/employes` (Get all employes)

* `/employes/1` (Get employes by id)

* `/genres/` (Get all genres)

* `/genres/1` (Get genres by id)

* `/transactions/` (Get all transactions)

* `/transactions/user/2` (Get transactions by user)

* `/histories/` (Get all histories)

* `/reviews/` (Get user review)

* `/reviews/2` (Get review by user)

**2. POST**

* `/users` (Register user)
    * ``` { "name": "david", "email": "david@mail.com", "password": "secret123"} ```



* `/users/login` (Login user)
    * ``` { "email": "david@mail.com", "password": "secret123" } ```
    
    
    
* `/books` (Create book)
    
    * `{"title" : "Dilan 1990", "description" : "lorem ipsum", "genre" : 1, "author" : "Pidi Baiq", "picture" : "D:/picture.jpg"}`
    
    
    
* `/employes` (Register employee)
    * ``` { "name": "robert", "email": "robert@mail.com", "password": "secret123" } ```
    
    
    
* `/employes/login` (Login employee)
    * ``` { "email": "robert@mail.com", "password": "secret123" } ```
    
    
    
* `/genres` (Create genre)
    * ``` { "name": "comedy" } ```
    
    
    
* `/transactions` (Create transaction)
    * ``` { "book_id": 43, "employee_id": 7, "user_id": 3 } ```
    
    
    
* `/histories` (Create history)
   * `{"title" : "Dilan 1990", "user" : "david", "employee" : "robert", "date" : "9 June 2020" }`
    
    
    
* `/reviews` (Create review)
   * `{"book_id" : 39, "user_id" : 11, "comment" : "Highly recommended" }`

**3. PATCH**

* `/users/1` 
    * ``` { "name": "david", "picture": "D:/picture.jpg", "address": "Jakarta", "age": 19} ```
    
    
    
* `/books/43`
    
    * `{"title" : "Dilan 1990", "description" : "lorem ipsum", "genre" : 1, "author" : "Pidi Baiq", "picture" : "D:/picture.jpg"}`
    
    
    
* `/employes/1` 
    * ``` { "name": "robert", "email": "robert@mail.com", "password": "secret123" } ```
    
    
    
* `/genres/1` 
    * ``` { "name": "horror" } ```
    
    
    
* `/transactions/1` 
    * ``` { "book_id": 43, "employee_id": 7, "user_id": 3, "status": 2 } ```
    
    
    
* `/reviews/2` (Create review)
   * `{ "comment" : "I would recommend this one!" }`
   
**4. DELETE**

* `/users/1` 

* `/books/43` 

* `/employes/17`

* `/genres/1`

* `/transactions/12`

* `/histories/`

* `/reviews/3`



## Screenshots
[![p1.png](https://i.postimg.cc/9Fn0N1r2/p1.png)](https://postimg.cc/BX2JjTT7)

[![p2.png](https://i.postimg.cc/c1TrfdWr/p2.png)](https://postimg.cc/pyhWHbpH)

[![p3.png](https://i.postimg.cc/kX4DcLMw/p3.png)](https://postimg.cc/MXCWZPQj)



Crafted with love by [Ilham Bagas Saputra](https://instagram.com/ilhambagasaputra)
