const sqlite3 =require('sqlite3')
const path =require('path')
const db =new sqlite3.Database(path.resolve(__dirname,'db','testdb.db'),(err)=>{
  if (err) {
    console.log(err)
    console.log(path.resolve(__dirname,'db','testdb.db'))
  } else {
    console.log('succes sql')
  }
});
db.run('PRAGMA foreign_keys = ON');
module.exports= db

