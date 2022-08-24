const db = require('../database');
const fs = require("fs");






// Add message with sql 
async function addMessage(data) {

  const sql = 'INSERT INTO messages (message, author, time, chat) VALUES ($1, $2, $3, $4)'

  const result = await db.query(sql, [data.message, data.author, data.time, data.area]);

  return result;


}




// const result = await db.query()

// return result.rows;




//send room data and creates room in database with sql.
async function addRoom(data) {

  const sql = 'INSERT INTO rooms (name, creator) VALUES ($1, $2)'



  const result = await db.query(sql, [data.name, data.creator])

  return result;



}








// delete room without async so sync.
async function deleteChatt(data) {


  const sql = `DELETE FROM rooms WHERE name = $1`




  const result = await db.query(sql, data)
  console.log(`room: ${data} was deleted!`);
  return result;


}









// delete messages without async so sync.
async function delAllMsg(data) {


  const sql = `DELETE FROM messages WHERE chat = $1`


  const result = await db.query(sql, data)
  console.log(`all Messages in :${data}: are deleted!`);
  return result;


}







// gets all rooms from database to be able to load them into frontend.
async function allChatts() {

  const sql = `SELECT * FROM rooms`



  const result = await db.query(sql)

  return result.rows;



}







// get all rooms name to be able to load and validate in frontend.
async function allNames() {

  const sql = `SELECT name FROM rooms`


  const result = await db.query(sql)

  return result.rows;



}



// validates if message is not empty and writes it into txt file

async function logItAll(data) {

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