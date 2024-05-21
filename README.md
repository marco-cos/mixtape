# Mixtape
![Logo](https://raw.githubusercontent.com/marco-cos/mixtape/main/src/images/logo4readme.png)

Mixtape is an open-source client/server application allowing users to post and search for persistent reviews of music albums, dynamically displaying the information to website viewers. Music lovers can discover new music and share their thoughts on albums with the Mixtape community.

## Demo Video
https://youtu.be/ia_PHN2ttMM?si=Ppv_l-o7q6wWhzqg

## Installation Tutorial
### Set up
Clone the repo to your local folder, cd into the folder if necessary.
```
https://github.com/marco-cos/mixtape.git 
cd mixtape
```
### Run the application 
You will need to create a .env file in the root directory and create a MongoDB account.
The .env file should follow this format:
```
MONGO_URL=mongodb+srv://<username>:<password>@mixtapedb.xancxpj.mongodb.net/?retryWrites=true&w=majority&appName=mixtapeDB;
PORT = 8000;
JWT_SECRET=<jwtkey>;
```
Make sure to substitute username, password, and jwtkey into the appropriate fields. This information will be sent accordingly.
The backend is run locally under port 8000 and the frontend is run under port 3000.

Install the requirements (assuming npm is installed), use `npm start` to run the frontend and backend and start the application.
```
npm install
npm start
```

## Distinct Features
- Users can register an account and login
- Create a profile with their name, bio, profile picture
- Explore other user profiles and follow them
- Like other user's reviews. 
- Dynamic album pages that updates with new reviews
- Search for albums and users

## Technologies
This project uses the MERN stack.
- Frontend: React is used, handling client-side rendering and user interface interactions.

- Backend: Node.js and Express.js are used, handling server-side logic and routing. MongoDB is used for the database.
