const mySql = require('mysql');
const connectionConfig = require('./config.json');

//-----------------------CONNECT----------------------------------------------

// this is a global var - so we can use it in all the functions in this file
let connection;


function connect() {
    //here we asiggn to the global var - the open connection that we created
    connection = mySql.createConnection(connectionConfig);

    return new Promise((resolve, reject) => {
        connection.connect((err) => { err ? reject(err) : resolve(); });
    });
}


//-----------------------DDL - Data Defenition Language -------------------------
function createDB() {
    let { host, user } = { ...connectionConfig }

    return new Promise(
        (resolve, reject) => {
            mySql.createConnection({ host, user }).query(`CREATE DATABASE ${connectionConfig.database};`,
                (err, res) => {
                    err ? reject(err) : resolve();
                }
            )

        })
        .then(connect);
}

//-----------------------DML - Data Manipulation Language-------------------------
function runQuery(queryParam) {
    return new Promise((resolve, reject) => {
        connection.query(queryParam,
            (err, res, extraParam) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve({ res, extraParam });
                }
            });
    })

}


function runQueryWithParam(queryParam, queryValues) {
    return new Promise((resolve, reject) => {
        connection.query(queryParam, [queryValues],
            (err, res, extraParam) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve({ res, extraParam });
                }
            });
    })

}


module.exports = {
    connect,
    createDB,
    runQuery,
    runQueryWithParam
}