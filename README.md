# P6_Piiquante

## Development environement

### IDE

This project need to:

Clone front-end repositorie from : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Clone back-end repositorie from here: https://github.com/NicolasPerrin73/P6_Piiquante

Create a new folder for the project.

On this folder, create a folder "frontend" and copy and past the front-end repositorie inside.

Create a folder "backend" and copy and past the back-end repositorie inside.

Open the project.

### MongoDB database

This project need MongoDB Atlas database.

Go to https://www.mongodb.com/

Create a free account or login with your.

Create a free shared new cluster.

Click on "connect" button and choose "connect your application"

Copy and keep you connection string.

Go to "network access", click on "add IP adress" and "allow access from anywhere".

### FRONT END

$cd frontend

$ npm install

$ npm start

Angular Live development server should start on port 4200. Open your browser on http://localhost:4200/.

### BACK END

$ cd backend

$ npm install

$ mkdir images

$ touch .env

In ".env" files create 2 variables:

mongoDB="Your_Connection_String_Of_MongoDB"

tokenKey="Your_Secret_Token_Key"

$ nodemon server

Done!

