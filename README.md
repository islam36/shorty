<style>
    #shorty{
        background-color: white;
        width: 100%;
        height: auto;
        padding: 10px;
        margin: 10px;
    }

    #shorty h1 {
        text-align: center;
        color: hsl(216, 100%, 50%);
        font-weight: 800;
    }
</style>
<div id="shorty">
    <h1>SHORTY</h1>
</div>

Shorty is another free and open source link shortener. The name 'shorty' stands for 'short' or 'turn a long link to a short one'. It's just a personal project to apply what I learned and having fun!

# features
- register new user
- user login
- show list of links assciated with the user account
- add new link
- edit an existing link
- delete an existing link

# Tech stack
- [React](https://www.reactjs.com) for front-end
- CSS (no frameworks) for styling.
- [Node.js](https://www.nodejs.org) and [Express](https://www.expressjs.com) for back-end
- [MongoDB](https://www.mongodb.com) for databse
- JWT for authentication and authorization

# install
- you can try the app from this demo link: [shorty](https://shorty-b.herokuapp.com/)
- otehrwise, you can run it locally by following the next steps:
    1. make sure [Node.js](https://www.nodejs.org) and [MongoDB](https://www.mongodb.com) are installed
    2. clone this repo by running `git clone https://github.com/islam36/shorty.git`
    3. change directory: `cd shorty`
    4. install dependencies: `npm install`
    5. make sure mongodb is running
    6. create a new database called `shorty` in mongodb
    7. build client: `npm run build`
    8. start server: `npm start`
    9. open your browser on `localhost:8000/` and you should see the web app running


# API reference
| method | route | request body | description |
|--------|-------|--------------|-------------|
|`POST` | `/api/users` | `username, password` | create a new user. The username must be unique and the password length must be at least 6 characters. |
| `GET` | `/api/users/:userId` | / | returns the the data of user whose 'id' is 'userId'. Requires authentication. Only return the data of the authenticated user |
| `PUT` | `/api/users/:userId` | `username, password` | Requires authentication. Edit the data of the user whose 'id' is 'userId' |
| `DELETE` | `/api/users/:userId` | / | Requires authentication. Delete the user whose 'id' is 'userId' |
| `POST` | `/api/auth/login` | `username, password` | authenticate a user. Returns the user data and a JWT token used to authorize the user to perform actions that require authentication on the app. |
| `GET` | `/api/links` | / | Requires authentication. Returns an array of links which are associated with the authenticated user. It also supports pagination using `page` and `limit` request queries. |
| `POST` | `/api/links` | `title, link` | Requires authentication. Create a new link. Returns the created link with the short link associated to it. |
| `GET` | `/api/links/:linkId` | / | Requires authentication. Returns the data of the link whose 'id' is 'linkId' |
| `POST` | `/api/links/:linkId` | `title, link` | Requires authentication. Edit the link whose 'id' is 'linkId'. |
| `DELETE` | `/api/links/:linkId` | / | Requires authentication. Delete the link whose 'id' is 'linkId' |


# contribution
any contribution with code, idea, review, feedback is welcome. Just make a pull request and we'll discuss about it.

