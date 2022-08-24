const db = require('../database');
const fs = require("fs");






// Add message with sql 
function addMessage(data) {

  const sql = 'INSERT INTO messages (message, author, time, chat) VALUES ($1, $1, $1, $1)'

  const result = await db.query(sql, [data.message, data.author, data.time, data.area]);

  return result;


}




// const result = await db.query()

// return result.rows;




//send room data and creates room in database with sql.
function addRoom(data) {

  const sql = 'INSERT INTO rooms (name, creator) VALUES ($1, $1)'



  const result = await db.query(sql, [data.name, data.creator])

  return result;



}








// delete room without async so sync.
function deleteChatt(data) {


  const sql = `DELETE FROM rooms WHERE name = $1`




  const result = await db.query(sql, data)
  console.log(`room: ${data} was deleted!`);
  return result;


}









// delete messages without async so sync.
function delAllMsg(data) {


  const sql = `DELETE FROM messages WHERE chat = $1`


  return db.query(sql, data, function (error) {
    if (error) {
      console.log(error);
    }
    console.log(`all Messages in :${data}: are deleted!`);

    return;

  })


}







// gets all rooms from database to be able to load them into frontend.
async function allChatts() {

  const sql = `SELECT * FROM rooms`



  const result = await db.query(sql)

  return result.rows;



}







// get all rooms name to be able to load and validate in frontend.
function allNames() {

  const sql = `SELECT name FROM rooms`

  
  const result = await db.query(sql)

  return result.rows;



}



// validates if message is not empty and writes it into txt file

function logItAll(data) {

  const fsDat = JSON.stringify(data);
  if (data.message) {
    fs.appendFile('logs.txt', fsDat + "\n", (error) => {
      if (error) {
        return (console.log('EROR logs.txt ERROR'))
      }
    })
  }
  console.log('file logged successfully!');
}





// exporting my function so i can use them in server.js / backend.

module.exports = { addMessage, addRoom, deleteChatt, allChatts, delAllMsg, logItAll, allNames };