import express from 'express';
import mysql from 'mysql';
import myconn from 'express-myconnection';
import cors from 'cors';
import routes from './routes.js';

import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
} from './config.js'

const app = express();
app.set('port', process.env.PORT || 9000);

const dbOptions = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

// routes ----------------------------------------
app.get('/', (req, res) => {
    res.send('welcome to my API');
})
app.use('/api', routes);

// server running -----------------------------------
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
});
