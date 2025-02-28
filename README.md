# Express + Mongo Example
This project is a basic example of a working node.js server accepting RESTful API requests and connecting to a mongo database for persistence.

## To install and run:
For Unix based systems (be sure you have node 18+ installed):
```sh
npm install
npm run dev
```

## Troubleshooting
### Localhost Server Location
If you get a connection error similar to the following:
```sh
error connection to MongoDB: The `uri` parameter to `openUri()` must be a string, got "undefined"
```
It indicates you have not setup the .env strings correctly. Make a copy of SAMPLE.env, enter your connection string for mongo, and rename it to .env to connect to the database.

### Backend Application Required
By default, mongoDB will use a 'test' collection to store your records. If you want to override this location, you can specify a collection name in the URI string in the .env file you provide:
```sh
mongodb+srv://<user_name>:<pass_word>@cluster0.qucux.mongodb.net/<your_collection_name>?retryWrites=true&w=majority&appName=Cluster0