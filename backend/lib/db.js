const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "myportfolio.cluster-chumaky4mcgw.ap-northeast-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "ubuntu1!",
  database: "myportfolio",
  dateStrings: "date",
});

conn.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to the database");
});

module.exports = conn;
