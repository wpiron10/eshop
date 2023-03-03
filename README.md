## Introduction

This project aims to build an example of a ecommerce ordering platform.

The frontend is built in React / Typescript and SCSS.

The backend is built with Node JS and MongoDB. It uses a server made with Express.

## Installations

Before Starting, the project requires several installations :

- [Node JS](https://nodejs.org/)

- [MongoDB Compass](https://www.mongodb.com/products/compass)

After MongoDB Compass installed, make sure to import the data from the related file. TBF

## How to :

- Launch the backend :

```sh

// import product.json from db file in mongodb after being logged

cd kfc_backend

npm i

npx nodemon

```

- Launch the frontend (npm) :

``sh

cd kfc_frontend

npm i

npm start

````



## Routes (TBF)



| Page | Route |

| ------ | ------ |

| Home | ```/``` |

| Display all products | ``products (eg: menu, sides)`` |

| Product Categories | ```/products/:types (eg: menu, sides))`` |

| Product Sheet | ```product/:types/:id`` |





## Functionnalities (TBF)

- Ordering a menu and/or a side dish

- Registration / Login / Logout (cookie)

- Product filtering

- Personalization of a product

- Cart management (LocalStorage)

- Payment via Stripe

- Optional receipt of order summary by email




````
