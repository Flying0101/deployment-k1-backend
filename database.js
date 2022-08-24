
const { Client } = require("pg");



// // vid fel.
// if (error) {
//     // Kunde inte öppna databasen
//     console.error(error.message);
//     throw error;
// }



console.log("Database in action");








// message tabell
const messages = `CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message TEXT,
    author TEXT,
    time TEXT,
    chat TEXT
    );
    `;

//room tabell
const rooms = `CREATE TABLE rooms (
        id SERIAL PRIMARY KEY,
        name TEXT,
        creator TEXT
        ); 
        `;


const db = new Client({

    ssl: {
        rejectUnauthorized: false,
        // Bör aldrig sättas till rejectUnauthorized i en riktig applikation
        // https://stackoverflow.com/questions/63863591/is-it-ok-to-be-setting-rejectunauthorized-to-false-in-production-postgresql-conn
    },
    connectionString: process.env.DATABASE_URL,


    // "postgres://fwmqdpixjfhxde:bf594a55557ad3580ga85cb8af44b2e8809a21903268697e61eb602d448da84c@ec2-14-253-119-24.eu-west-1.compute.amazonaws.com:5432/dnqk6u2hrj8d71",
});

db.connect();







// kör room statement.
db.query(rooms, (error) => {
    if (rooms) {
        // Om tabellen redan finns
        console.error(`${error}`);
    }
});



// kör message statement. 
db.query(messages, (error) => {
    if (error) {
        // Om tabellen redan finns
        console.error(error.message);
    }
});









module.exports = db;